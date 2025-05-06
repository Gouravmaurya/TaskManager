#!/bin/bash

# Exit on error
set -e

# === Config ===
APP_NAME="my-frontend-js"

# === Step 1: Create a Next.js 14 App using JavaScript ===
npx create-next-app@latest $APP_NAME --app --no-typescript --eslint --tailwind --src-dir --import-alias "@/*" --no-experimental-app --no-git

cd $APP_NAME

# === Step 2: Tailwind already initialized, just override config if needed ===
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# === Step 3: Update global styles ===
mkdir -p styles
cat > styles/globals.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# === Step 4: Clean boilerplate and create folders ===
rm -rf app/page.js

mkdir -p \
  app/\(auth\)/login \
  app/\(auth\)/register \
  app/dashboard \
  components/auth \
  components/dashboard \
  lib

touch \
  app/layout.js \
  app/page.js \
  app/\(auth\)/layout.js \
  app/\(auth\)/login/page.js \
  app/\(auth\)/register/page.js \
  app/dashboard/layout.js \
  app/dashboard/page.js \
  components/auth/LoginForm.jsx \
  components/auth/RegisterForm.jsx \
  components/dashboard/Sidebar.jsx \
  components/dashboard/Navbar.jsx \
  components/dashboard/StatsCard.jsx \
  lib/api.js \
  lib/auth.js \
  middleware.js

echo "✅ JavaScript-based Next.js frontend project set up at '$APP_NAME'"
