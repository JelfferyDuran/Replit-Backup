# Replit-Backup

This repository contains the source for **SpatialDrip**, a small static web app built with Tailwind CSS. The project is configured for deployment on Firebase Hosting.

## Development

All client files are located in the `public` directory. The main entry point is `public/index.html` and custom logic lives in `public/script.js`. The landing page showcases trending products, a VIP portal and a newsletter signup form.

`script.js` includes Firebase initialization with helpers for verifying VIP codes, sending questions, and capturing newsletter signups. Replace the placeholder configuration in that file with your Firebase project details.

## Deploying

To serve locally with Firebase or deploy to your project, install the Firebase CLI and run:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting  # if not already initialized
firebase deploy
```

This will upload the contents of the `public` folder to Firebase Hosting.
