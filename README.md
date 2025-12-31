
# ORLE - Premium Men's Skincare E-commerce

A modern, responsive single-page e-commerce application built with React.js.

## Features

- 🛒 Full shopping cart functionality
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- 🎨 Premium UI with smooth animations
- 🔍 Product quick view modal
- ✅ Form validation
- 🎯 SEO-friendly structure
- ♿ WCAG 2.1 AA accessibility compliant

## Tech Stack

- React 18.2+ (Functional Components & Hooks)
- CSS Modules for scoped styling
- Con API for state management
- Custom hooks for reusable logic

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm 8+

### Installation

1. Clone the repository
2. Install dependencies:
npm install



3. Start development server:
npm start


The app will open at [http://localhost:3000](http://localhost:3000)

4. Build for production:
npm run build


Creates optimized production build in the `build/` folder

## Project Structure

orle.tn/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── con/ # React Con providers
│ ├── data/ # Site content and product data
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Helper functions
│ ├── App.jsx # Main application component
│ └── index.js # Application entry point



## Updating Content

All site content is centralized in `/src/data/`:

- **products.js** - Product catalog (prices, descriptions, images)
- **siteContent.js** - Brand info, hero content, trust badges
- **navigation.js** - Menu items and links

Simply edit these files to update website content without touching component code.

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2025 ORLE. All rights reserved.