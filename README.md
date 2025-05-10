# RemWaste Skip Rental Redesign

A modern, responsive web application for booking skip rentals with an intuitive user interface. This project is built with React, TypeScript, and Tailwind CSS using Vite as the build tool.

## Features

- **Modern UI Design**: Clean and responsive interface optimized for both mobile and desktop users
- **Dark Mode Support**: Toggle between light and dark themes for better user experience
- **Progressive Booking Flow**: Multi-step process with clear progress indicators
- **Responsive Skip Cards**: Visual representations of different skip sizes with relevant details
- **Skip Selection**: Interactive skip selection with real-time feedback
- **Persistent Selection**: Remembers user's skip selection using local storage

## Getting Started

### Prerequisites

- Node.js (version 16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmadalasiri/REM-Waste-Skip-Page-UI-Redesign.git
   cd remwaste-skip-redesign
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/src` - Source code for the application
  - `/components` - Reusable UI components
  - `/context` - React context providers
  - `/hooks` - Custom React hooks
  - `/pages` - Page components
  - `/types` - TypeScript type definitions

## Key Components

- **SkipSelectionPage**: Main page for selecting skip sizes
- **SkipCard**: Component for displaying skip information
- **ProgressBar**: Shows the current step in the booking process
- **StatusBadge**: Displays status information (e.g., "Road Placement OK")

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production

## API Integration

The application fetches skip data from the RemWaste API. The endpoint used is:

```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode={postcode}&area={area}
```
