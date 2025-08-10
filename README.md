# Next.js Static Export Project

This project is built with **Next.js** and configured for **static export** using `output: "export"`.

## 🚀 Features
- Static HTML export (works on any static hosting)
- App Router support
- Optimized for GitHub Pages, Netlify, Vercel (Static mode), etc.
- Unoptimized images enabled for `next/image` in static mode

---

## 📦 Installation
```bash
npm install
```

---

## 🛠 Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Build for Production (Static)
Since `next export` is deprecated in Next.js 13+, static export is handled by setting `output: "export"` in `next.config.ts`.

To build:
```bash
npm run build
```

The static site will be output to the **`out/`** directory.

---

## 🖥 Local Preview
You can serve the exported site locally:
```bash
npx serve out
```

---

## 📤 Deployment
You can deploy the `out/` folder to any static hosting provider such as:
- **GitHub Pages**
- **Netlify**
- **Vercel** (Static Mode)
- **Cloudflare Pages**
- **Firebase Hosting**

---

## ⚙ Configuration
`next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```
