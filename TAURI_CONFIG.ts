/**
 * FROM BIRTH Tauri Configuration (Stub)
 * 
 * This is a placeholder for Tauri integration.
 * To fully set up Tauri:
 * 
 * 1. Install Tauri: `npm install -g @tauri-apps/cli`
 * 2. Initialize: `cargo install tauri-cli`
 * 3. Create Tauri project: `npm run tauri init`
 * 4. Update src-tauri/tauri.conf.json with settings below
 * 
 * Tauri will wrap the Next.js build and provide:
 * - Desktop application (Windows, macOS, Linux)
 * - Mobile support (iOS, Android)
 * - Native system tray integration
 * - Local file access for document storage
 * - System notifications for consultation reminders
 */

export const TAURI_CONFIG = {
  build: {
    beforeBuildCommand: "pnpm build",
    beforeDevCommand: "pnpm dev",
    devPath: "http://localhost:3000",
    frontendDist: "../apps/web/out",
  },
  app: {
    windows: [
      {
        title: "FROM BIRTH",
        width: 1200,
        height: 800,
        resizable: true,
        fullscreen: false,
        decorations: true,
      },
    ],
    security: {
      csp: null,
    },
  },
  tauri: {
    cli: {
      description: "FROM BIRTH - Luxury Skincare & Regenerative Therapies",
      longDescription: "A sophisticated platform for luxury skincare e-commerce and medical consultations.",
    },
  },
};
