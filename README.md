# Posts App

A React Native application that displays posts from JSONPlaceholder API with support for multiple languages and RTL layouts.

![Posts App Screenshot](https://via.placeholder.com/300x600?text=Posts+App)

## Features

- View a list of posts from JSONPlaceholder API
- View detailed information about each post including author details
- Support for both English and Arabic languages
- Right-to-Left (RTL) layout support for Arabic
- Pull-to-refresh functionality
- Error handling with retry options
- Responsive design

## Tech Stack

- React Native with Expo
- Redux Toolkit for state management
- RTK Query for API calls
- i18next for internationalization
- Expo Router for navigation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohmaedsallam/postsApp.git
   cd postsApp
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Run on a device or simulator:
   - Press `i` to open in iOS simulator
   - Press `a` to open in Android emulator
   - Scan the QR code with the Expo Go app on your physical device

## Usage

### Viewing Posts

- The home screen displays a list of posts from the JSONPlaceholder API
- Tap on any post to view its details
- Pull down on the posts list to refresh the data

### Switching Languages

1. On the posts list screen, tap the language switcher button at the top of the screen
2. The app will switch between English and Arabic
3. The UI will automatically adjust for RTL layout when using Arabic

### Navigation

- Use the back button in the header to return to the previous screen
- The navigation animations will automatically adjust based on the selected language

## Development Decisions and Assumptions

### Architecture

- **SOLID Principles**: The application follows SOLID principles with clear separation of concerns
- **Component Structure**: Components are designed to be reusable and have single responsibilities
- **State Management**: Redux is used for global state, while component state is used for local UI state

### Data Fetching

- RTK Query is used for data fetching with automatic caching
- Data is cached after the first fetch to minimize network requests
- Conditional fetching is implemented to prevent unnecessary API calls

### Internationalization

- The app supports English (LTR) and Arabic (RTL) languages
- Text direction is automatically adjusted based on the selected language
- Translations are managed through i18next

### UI/UX Decisions

- Loading states are clearly indicated with loading spinners
- Error states provide clear messages and retry options
- The UI is designed to work well in both LTR and RTL layouts
- Performance optimizations are implemented for list rendering

### Assumptions

- The JSONPlaceholder API is assumed to be available and return data in the expected format
- The app is designed primarily for mobile devices in portrait orientation
- Internet connectivity is required for the initial data fetch, after which some data may be available offline through caching

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the API
- [Expo](https://expo.dev/) for the React Native development platform
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [i18next](https://www.i18next.com/) for internationalization
