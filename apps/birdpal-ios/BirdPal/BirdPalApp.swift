import AVFoundation
import SwiftUI
import WebKit

/// Bird Pal Buddies, made by Phoebie.
/// The whole app is the bundled Bird Pal page (index.html), shown offline in a web view.
@main
struct BirdPalApp: App {
    init() {
        // Normal sound: "playback" lets the morning lesson keep playing with the screen off and
        // plays sound even when the side switch is on silent. The page switches to the
        // microphone mode only while "Hold to record my voice" is held (see setAudio below).
        BirdPalApp.setAudio(record: false)
    }

    /// record: true while the microphone is in use ("play and record"), false for steady playback.
    /// Staying in "play and record" all the time made iOS lower and shift the playback volume.
    static func setAudio(record: Bool) {
        let session = AVAudioSession.sharedInstance()
        if record {
            try? session.setCategory(.playAndRecord, mode: .default,
                                     options: [.defaultToSpeaker, .allowBluetoothA2DP])
        } else {
            try? session.setCategory(.playback, mode: .default)
        }
        try? session.setActive(true)
    }

    var body: some Scene {
        WindowGroup {
            BirdPalView()
                .background(Color(red: 1.0, green: 0.984, blue: 0.945))
                .ignoresSafeArea(.container, edges: .bottom)
        }
    }
}

struct BirdPalView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.websiteDataStore = .default()
        config.userContentController.add(context.coordinator, name: "birdpal")

        let webView = WKWebView(frame: .zero, configuration: config)
        context.coordinator.webView = webView
        webView.uiDelegate = context.coordinator
        webView.navigationDelegate = context.coordinator
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 1.0, green: 0.984, blue: 0.945, alpha: 1)
        webView.scrollView.backgroundColor = webView.backgroundColor
        webView.allowsBackForwardNavigationGestures = false

        if let url = Bundle.main.url(forResource: "index", withExtension: "html"),
           let html = try? String(contentsOf: url, encoding: .utf8) {
            // A fixed https origin keeps saved words, recordings and the streak between launches.
            webView.loadHTMLString(html, baseURL: URL(string: "https://app.birdpal.local/"))
        }
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        private var recorder: AVAudioRecorder?
        private var recordURL: URL { FileManager.default.temporaryDirectory.appendingPathComponent("birdpal-rec.wav") }

        /// "Hold to record my voice" records with the iPhone's own recorder (steadier than the
        /// web page's microphone). The finished WAV goes back to the page, which saves it as before.
        private func startRecording() {
            AVAudioSession.sharedInstance().requestRecordPermission { granted in
                DispatchQueue.main.async {
                    guard granted else { self.finish(nil, error: "denied"); return }
                    BirdPalApp.setAudio(record: true)
                    let settings: [String: Any] = [
                        AVFormatIDKey: kAudioFormatLinearPCM, AVSampleRateKey: 44100.0,
                        AVNumberOfChannelsKey: 1, AVLinearPCMBitDepthKey: 16,
                        AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false]
                    try? FileManager.default.removeItem(at: self.recordURL)
                    guard let rec = try? AVAudioRecorder(url: self.recordURL, settings: settings),
                          rec.record() else {
                        BirdPalApp.setAudio(record: false)
                        self.finish(nil, error: "start")
                        return
                    }
                    self.recorder = rec
                }
            }
        }

        private func stopRecording() {
            guard let rec = recorder else { return }
            rec.stop()
            recorder = nil
            BirdPalApp.setAudio(record: false)
            let data = try? Data(contentsOf: recordURL)
            try? FileManager.default.removeItem(at: recordURL)
            finish(data, error: data == nil ? "empty" : nil)
        }

        private func finish(_ data: Data?, error: String?) {
            let arg = data.map { "\"" + $0.base64EncodedString() + "\"" } ?? "null"
            let err = error.map { "\"" + $0 + "\"" } ?? "null"
            webView?.evaluateJavaScript("window.birdpalRecDone && window.birdpalRecDone(\(arg), \(err))")
        }

        // The microphone is only used for "Hold to record my voice"; iOS asks the user first.
        func webView(_ webView: WKWebView,
                     requestMediaCapturePermissionFor origin: WKSecurityOrigin,
                     initiatedByFrame frame: WKFrameInfo,
                     type: WKMediaCaptureType,
                     decisionHandler: @escaping (WKPermissionDecision) -> Void) {
            decisionHandler(type == .microphone ? .grant : .deny)
        }

        // Links to other websites open in Safari instead of inside the app.
        func webView(_ webView: WKWebView,
                     decidePolicyFor navigationAction: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if navigationAction.navigationType == .linkActivated,
               let url = navigationAction.request.url,
               url.host != "app.birdpal.local" {
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }

        // The page asks to keep the screen awake while a lesson runs.
        func userContentController(_ userContentController: WKUserContentController,
                                   didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any] else { return }
            if let on = body["keepAwake"] as? Bool {
                DispatchQueue.main.async { UIApplication.shared.isIdleTimerDisabled = on }
            }
            // The page asks for the microphone mode while recording, and normal playback after.
            if let rec = body["rec"] as? String {
                DispatchQueue.main.async { rec == "start" ? self.startRecording() : self.stopRecording() }
            }
        }
    }
}
