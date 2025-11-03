# BloomingReport

A React Native mobile application for collecting and managing farmer data related to land, crops, flowers, and beekeeping activities.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 18) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **React Native CLI** - Install globally with `npm install -g react-native-cli`
- **Xcode** (for iOS development) - [Download Xcode](https://developer.apple.com/xcode/)
- **Android Studio** (for Android development) - [Download Android Studio](https://developer.android.com/studio)
- **Ruby** (>= 2.6.10) - For iOS CocoaPods
- **Java Development Kit (JDK)** - Required for Android development

## Installation

### 1. Clone the repository

```sh
git clone <repository-url>
cd BloomingReport
```

### 2. Install dependencies

```sh
# Install Node.js dependencies
npm install

# OR using Yarn
yarn install
```

### 3. iOS Setup (macOS only)

If you're developing for iOS, install CocoaPods dependencies:

```sh
# Install Ruby gems (first time only)
bundle install

# Install CocoaPods dependencies
cd ios
bundle exec pod install
cd ..
```

> **Note**: Make sure you have CocoaPods installed. If not, install it with `sudo gem install cocoapods`.

### 4. Android Setup

For Android development, ensure you have:
- Android Studio installed
- Android SDK configured
- Android emulator set up or a physical device connected

## Running the Project

### Start Metro Bundler

First, start the Metro JavaScript bundler in one terminal:

```sh
npm start

# OR using Yarn
yarn start
```

### Run on iOS

In a new terminal window, run:

```sh
npm run ios

# OR using Yarn
yarn ios
```

This will:
- Build the iOS app
- Launch the iOS Simulator (or use a connected device)
- Install and run the app

### Run on Android

In a new terminal window, run:

```sh
npm run android

# OR using Yarn
yarn android
```

This will:
- Build the Android app
- Launch the Android emulator (or use a connected device)
- Install and run the app

> **Note**: Make sure you have an Android emulator running or a device connected via USB with debugging enabled.

## Additional Commands

```sh
# Clean Android build
npm run clean

# Run linting
npm run lint

# Build Android release APK
npm run build_android
```

## App Flow

BloomingReport follows a multi-step form flow to collect comprehensive farmer data:

### 1. **Farmer Profile** (FarmerHome)
- Enter farmer's full name
- Contact number
- Gender selection
- House location (automatic GPS or manual entry)
  - State, Village, Block Name, Street Name, Plot Number

### 2. **Land Details**
- Select unit of area (Acre, Hectare, Katha, Bigha, Guntha)
- Enter area of plantation
- Geotag location (optional)
- Select land holding type (Owned, Co-owned, Shared)

### 3. **Crop Details**
- Select flower type
- Enter hybrid crop variety
- Current area of flowering
- Blooming duration (start and end dates)
- Upload photos of crops

### 4. **Flower Details**
- Interest in bee pollination
- Previous bee usage experience
- Willingness to pay for bee pollination services

### 5. **Beekeeping Details**
- Chemical fertilizer usage and types
- Chemical pesticide usage and types
- Risk factors
- Upload bee box photos
- Consent form preferences

### 6. **Details Added** (Review Screen)
- Display all collected information in organized sections
- Review all entered data
- Option to return to home screen

### Key Features

- **Offline Support**: Manual location entry when offline
- **Data Persistence**: Uses Realm database for local storage
- **Form Validation**: Comprehensive validation for all input fields
- **Step Indicator**: Visual progress indicator throughout the flow
- **Photo Upload**: Support for multiple photo uploads
- **Location Services**: GPS-based location selection with fallback to manual entry

## License

This project is private and proprietary.
