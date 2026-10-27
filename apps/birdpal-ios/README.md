# Bird Pal Buddies — iPhone/iPad app

Made by Phoebie. The app shows the same Bird Pal page as
www.phoebiewang.com/birdpal, bundled inside the app so it works offline.

- Page: `BirdPal/index.html` is generated from `birdpal/index.html` by
  `python3 apps/birdpal-ios/make_web.py` (fonts embedded, web-only parts removed).
- App shell: `BirdPal/BirdPalApp.swift` (a web view, microphone permission,
  background audio for screen-off lessons, keeps the screen awake during lessons).
- Project: `project.yml` (XcodeGen). Bundle ID `com.sabrina9988.birdpal`,
  team `U9KHHZ49L6`.

## Build

GitHub → Actions → **Bird Pal iOS**.

- Every push that changes the app runs a test build (no signing, nothing uploaded).
- **Run workflow** with "Sign and upload to TestFlight" ticked uploads a build.

## One-time setup before the first upload

1. App Store Connect → Apps → **+** → New App: platform iOS, name
   "Bird Pal Buddies", language English (U.S.), bundle ID
   `com.sabrina9988.birdpal` (register it under Certificates, Identifiers &
   Profiles → Identifiers if it is not in the list), SKU `birdpal`.
2. Add the same three secrets used by TogetherBook to **this** repository
   (Settings → Secrets and variables → Actions): `ASC_KEY_ID`,
   `ASC_ISSUER_ID`, `ASC_KEY_P8`.

## App Store answers

- Privacy: Data Not Collected (no accounts, no analytics, recordings stay on the device).
- Category: Lifestyle. Age rating: 4+.
- Microphone: used only for "Hold to record my voice".
