# Nexus — Sample Website

A modern, responsive product showcase website built with HTML5, CSS3, and modern JavaScript.

## Features
- **Responsive Navigation**: Sticky header with blur, brand logo, desktop menu, mobile drawer, and Dark / Light theme switcher.
- **Hero Section**: Modern typography, glowing radial gradients, animated badge, CTA buttons, metrics counters, and a dashboard preview card.
- **Features Grid**: 6 cards highlighting key product features with custom hover animations.
- **Interactive Live Demo**: Tabbed preview switcher (Performance, Security, Automation, CLI) with dynamic views.
- **Pricing Calculator**: Interactive toggle between monthly and annual billing with automatic 20% discount calculations.
- **Testimonials**: Clean feedback cards with star ratings and user initials.
- **Contact & Feedback**: Form validation with toast notifications.
- **Modal Component**: "Get Started" modal dialog with keyboard accessibility (`Esc` to close).

## How to Run

### Option 1: Direct File Opening
Double-click `index.html` or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Local HTTP Server (Python)
Run the following in PowerShell inside this directory:
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000` in your web browser.

### Option 3: Local HTTP Server (Node.js)
```bash
npx serve .
```

## Structure
- `index.html` - Page structure and semantic markup
- `style.css` - Theme variables, responsive layouts, glassmorphism, animations
- `script.js` - Interactive functionality (theme toggle, pricing switcher, modal, tabs, form validation)
