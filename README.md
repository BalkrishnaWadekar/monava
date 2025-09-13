# Monova

Monova is a React Native / Expo application showing a curated layout of collections, outfits, items etc., filterable and with a bottom sheet UI.

This project is hosted as an **Expo Snack** at:  
👉 https://snack.expo.dev/@balkrishna9921/monova-

---

## 🚀 How to Run / Preview the App

You can run this app in several ways — via Snack online, or locally with Expo.

### Option 1: Using Expo Snack (Online)

1. Click the Snack link: [Monova on Snack](https://snack.expo.dev/@balkrishna9921/monova-).
2. On the Snack page, you’ll see the code editor and preview panel.
3. You can preview on:
   - **Web** (in your browser)
   - **Expo Go** on your mobile device (scan the QR code, after installing Expo Go app)
   - **Android / iOS simulators** (if configured via Snack)
4. If using your phone:
   - Open the Expo Go app.
   - Scan the QR code shown on Snack.
   - The project will load on your device.

### Option 2: Local Development (with Expo CLI)

If you want to run the project locally on your machine:

1. **Clone or Download** the repo/codebase to your machine.  
   If you don’t yet have it in a Git repo, just copy all the files from Snack.

2. **Install dependencies**  
    Make sure you have `node` and `npm` or `yarn` installed. Then in the project root directory run:

   ```bash
   npm install
   or
   ```

bash
Copy code
yarn install
Install Expo CLI (if you don’t already have it globally):

bash
Copy code
npm install -g expo-cli
Start the Expo server:

bash
Copy code
expo start
This will show the QR code / options to open in simulator / device.

Run on device or simulator:

On physical phone: install Expo Go (Android or iOS) and scan the QR from the expo start screen.

On simulator/emulator: choose to open in iOS Simulator (macOS) or Android Emulator.

🛠 Prerequisites
Node.js (≥ 14 recommended)

npm or yarn

Expo Go app on mobile if running on device

(Optional) Android Studio / Xcode for emulators

📁 Project Structure (only notable parts)
App.js — entry point

src/ — directory containing screens, components, hooks, styles etc.

src/constants — static data (tabs, filter options etc.)

src/components — UI pieces: ItemCard, SelectSheet, AnimatedBookmark, etc.

src/screens — HomeScreen.jsx (main screen)

src/styles — centralized stylesheet

✅ Usage
Tap the bottom navigation buttons to switch between Home / Square / Saved modes.

Use the top tabs (Collections, Outfits, Items) to change the current view.

Use chips (“Work”, “Leisure”, “Designer”) to filter visually.

Use the dropdown filter chips (Type, Style, Mood, Color) to open up the bottom sheet, select options.

Bookmark icons can be toggled. Plus buttons on certain cards perform dummy “add to collection” behavior (alert).
