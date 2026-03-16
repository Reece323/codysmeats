# Firebase Setup Guide for Cody's Meats

## Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Create a project"** (or "Add project")
3. Name it something like `codys-meats`
4. Disable Google Analytics (not needed) → Click **Create Project**

## Step 2: Add a Web App

1. In your Firebase project dashboard, click the **web icon** (`</>`) to add a web app
2. Name it `codys-meats-web`
3. **Don't** check "Firebase Hosting" (you're using GitHub Pages)
4. Click **Register App**
5. You'll see a config block like this — **copy these values**:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "codys-meats.firebaseapp.com",
  projectId: "codys-meats",
  storageBucket: "codys-meats.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Paste Config into index.html

Open `index.html` and find this section near the bottom:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
```

Replace it with your actual config from Step 2.

## Step 4: Enable Authentication

1. In Firebase Console → **Authentication** → **Get Started**
2. Click **Sign-in method** tab
3. Enable **Google** provider:
   - Click Google → Toggle Enable → Set a support email → Save
4. Enable **Email/Password** provider:
   - Click Email/Password → Toggle Enable → Save

### Important: Add Your GitHub Pages Domain

1. Still in Authentication → **Settings** tab
2. Under **Authorized domains**, click **Add domain**
3. Add: `reece323.github.io`

## Step 5: Set Up Firestore Database

1. In Firebase Console → **Firestore Database** → **Create Database**
2. Select **Start in production mode**
3. Pick a location close to you (e.g., `us-central1`)
4. Click **Enable**

### Set Security Rules

Go to **Firestore → Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
      
      match /favorites/{favId} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Click **Publish**.

> These rules let anyone read favorites (needed for sharing) but only the owner can write.

## Step 6: Push to GitHub

```powershell
git add .
git commit -m "Add Firebase auth, favorites, recommendations, sharing"
git push origin main:gh-pages
```

## That's It!

Your site now has:
- **Google & Email login** — synced across all devices
- **Heart favorites** — click the heart on any recipe card or in the recipe detail
- **Smart recommendations** — based on your favorite meat types, styles, and spice preferences
- **Shareable lists** — copy a link to share your favorites with friends
- **Favorites page** — see all your saved recipes in one place

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Google sign-in popup blocked | Allow popups for your GitHub Pages domain |
| "auth/unauthorized-domain" | Add `reece323.github.io` to Firebase Auth → Authorized domains |
| Favorites not saving | Check Firestore rules are published correctly |
| Blank page | Open browser console (F12) and check for errors — likely a config typo |

## Firebase Free Tier Limits

The Spark (free) plan includes:
- **50,000** daily auth operations
- **1 GiB** Firestore storage
- **50,000** daily Firestore reads
- **20,000** daily Firestore writes

This is more than enough for a personal/small community site.
