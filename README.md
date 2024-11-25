# MyCanvasApp

This is a web-based drawing application built with React, Redux, Firebase, and Konva.js. The app allows users to create, view, and save interactive canvases, with real-time scaling for optimal viewing on different screen sizes. Users can also download their canvases as images.

## Features

- **Authentication:** Secure user authentication using Firebase.
- **Drag-and-Drop:** Users can drag shapes (stars) on the canvas to reposition them.
- **Save to Firebase:** Save canvas configurations to Firestore under user-specific collections.
- **View Canvases:** Display saved canvases and download them as PNG images.
- **Responsive Canvas:** The canvas scales dynamically to fit the browser window while maintaining the aspect ratio.
- **State Management:** Redux is used to manage the app's state, including active views, selected canvas, and more.

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, Konva.js
- **Backend:** Firebase Firestore, Firebase Authentication
- **Other Libraries:** Next.js (for SSR), dynamic imports for component loading

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Firebase account
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/alta-max/canvas_app.git
   cd canvas_app
   ```

2. Install dependencies:
   ```
   npm install
   ```
docs: Update README.md with running instructions

## Usage

To run the canvas app:

```
npm run dev
```
