import AVFoundation
import SwiftUI
import WebKit

/// Bird Pal Buddies, made by Phoebie.
/// The whole app is the bundled Bird Pal page (index.html), shown offline in a web view.
@main
struct BirdPalApp: App {
    init() {
        // "Playback" lets the morning lesson keep playing with the screen off,
        // and plays sound even when the side switch is on silent.
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
        try? AVAudioSession.sharedInstance().setActive(true)
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
            guard let body = message.body as? [String: Any], let on = body["keepAwake"] as? Bool else { return }
            DispatchQueue.main.async { UIApplication.shared.isIdleTimerDisabled = on }
        }
    }
}
