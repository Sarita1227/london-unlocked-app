# London Unlocked 🏰

A React Native mobile app for exploring London's best attractions, restaurants, shopping destinations, and cultural sites.

## 📱 About

**London Unlocked** is a comprehensive guide to discovering London's hidden gems. From free attractions to premium dining experiences, this app helps users explore the best of London with an elegant, user-friendly interface.

### Key Features

- 🏛️ **Free Places to Visit** - Explore London without spending a penny
- 🍛 **Indian Restaurants** - Authentic cuisine from curry houses to fine dining
- 🛍️ **Shopping Malls** - Premier shopping destinations
- 🕉️ **Temples & Places of Worship** - Spiritual centers near London
- 🎄 **Seasonal Features** - Christmas markets and festive locations
- 👤 **User Accounts** - Personalized experience with favorites and history
- 🎨 **Beautiful UI** - Sky blue and gold color scheme inspired by London

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

```bash
# Navigate to project directory
cd london-unlocked

# Install dependencies
npm install

# Start the app
npx expo start

# Or use the convenient scripts
bash start-android.sh  # For Android
bash run-app.sh        # For general use
```

### Running on Emulator

**Android:**
```bash
npx expo start --android
```

**iOS:**
```bash
npx expo start --ios
```

**Web:**
```bash
npx expo start --web
```

## 📂 Project Structure

```
london-unlocked/
├── src/
│   ├── components/        # Reusable UI components
│   ├── constants/         # Colors, themes, config
│   ├── context/          # React Context (Auth, etc.)
│   ├── data/             # Static data files
│   │   ├── places.ts     # Free attractions
│   │   ├── restaurants.ts # Dining locations
│   │   ├── malls.ts      # Shopping centers
│   │   ├── temples.ts    # Places of worship
│   │   └── christmas.ts  # Seasonal content
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   │   ├── LandingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── CategoryListScreen.tsx
│   │   ├── PlaceDetailsScreen.tsx
│   │   └── ProfileSettingsScreen.tsx
│   └── types/            # TypeScript type definitions
├── assets/               # Images, icons, fonts
├── App.tsx              # Root component
└── app.json             # Expo configuration
```

## 🎨 Design System

### Color Palette

**Primary Colors (Sky Blue)**
- Primary: `#5DADE2` - Main brand color
- Primary Light: `#AED6F1` - Highlights
- Primary Dark: `#3498DB` - Depth

**Accent Colors (London Gold)**
- Accent: `#F4D03F` - Call-to-action
- Accent Light: `#F9E79F` - Highlights
- Accent Dark: `#F39C12` - Depth

**Neutral Colors**
- Background: `#F8F9FA` - App background
- Card Background: `#FFFFFF` - Cards/containers
- Text Primary: `#2C3E50` - Main text
- Text Secondary: `#7F8C8D` - Supporting text

### Design Philosophy

The app's design is inspired by:
- 🌤️ **Sky Blue** → London's beautiful skyline
- 👑 **Gold** → Royal heritage and historic landmarks  
- ☁️ **Light Backgrounds** → Modern, clean, approachable

## 🔐 Authentication

The app includes a complete authentication flow:

- **Sign Up** - Create new account with email validation
- **Log In** - Secure login with form validation
- **Guest Mode** - Limited access without registration
- **Profile Management** - View and edit account details
- **Account Deletion** - Permanent account removal option

### Guest vs Authenticated Access

| Feature | Guest | Authenticated |
|---------|-------|---------------|
| Free Places | ✅ Full Access | ✅ Full Access |
| Restaurants | ❌ Limited | ✅ Full Access |
| Shopping | ❌ Limited | ✅ Full Access |
| Temples | ❌ Limited | ✅ Full Access |
| Christmas Places | ✅ Full Access | ✅ Full Access |
| Save Favorites | ❌ No | ✅ Yes |
| Profile | ❌ No | ✅ Yes |

## 📱 Screens Overview

### 1. Landing Screen
- Big Ben background image
- App branding and tagline
- "Get Started" and "Continue as Guest" options

### 2. Login/Sign Up Screens
- Email and password validation
- Error handling and user feedback
- Seamless authentication flow

### 3. Explore Screen (Home)
- Category cards for different attractions
- Account button in header (for authenticated users)
- Seasonal features highlighted
- Guest prompts for unauthenticated users

### 4. Category List Screen
- Grid/list view of places in selected category
- Place images (or elegant placeholders)
- Quick access to details

### 5. Place Details Screen
- Comprehensive information about each location
- Address, description, pricing
- Reviews and ratings
- Opening hours and contact info

### 6. Profile Settings Screen
- User account information
- App preferences and settings
- Logout and account deletion options

## 🎄 Seasonal Features

The app includes special seasonal content:

- **Christmas Places** - Festive markets, light displays, winter wonderlands
- **Highlighted Cards** - Special visual treatment for seasonal content
- **NEW Badges** - Mark newly added features

## 🧪 Testing

For comprehensive testing guidelines, see [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Quick Test Commands

```bash
# Run tests (if configured)
npm test

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Manual Testing Checklist

- [ ] Landing screen displays correctly
- [ ] Login/Sign up forms validate input
- [ ] Guest mode provides limited access
- [ ] All categories load data
- [ ] Place details show complete information
- [ ] Profile settings update correctly
- [ ] Account deletion works as expected
- [ ] Navigation flows smoothly
- [ ] App works on both Android and iOS

## 🎯 Testing for Automation Engineers

This app is designed with testability in mind. 

- Test IDs for all interactive elements
- Screen object patterns
- API integration points
- Edge cases to test
- Performance benchmarks

Key Test IDs:
- `get-started-button`
- `continue-as-guest-button`
- `account-button`
- `category-*` (category cards)
- `logout-button`
- `delete-account-button`

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Start on specific platform
npx expo start --android
npx expo start --ios
npx expo start --web

# Build for production
npx expo build:android
npx expo build:ios
```

### Technology Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build tooling
- **TypeScript** - Type safety and better DX
- **React Navigation** - Screen navigation
- **React Context API** - State management

### Code Style

- TypeScript strict mode enabled
- Functional components with hooks
- Centralized styling with StyleSheet
- Component-based architecture
- Context for global state

## 🚧 Troubleshooting

### Common Issues

**Metro Bundler Errors:**
```bash
# Clear cache and restart
npx expo start --clear
```

**Module Not Found:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Android Build Issues:**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
npx expo start --clear
```

**Colors Not Loading:**
- Ensure all screen files import Colors: `import { Colors } from '../constants/colors'`
- Clear Metro cache: `npx expo start --clear`

## 🔄 Version History

### v2.0.0 (December 18, 2025)
- ✨ Complete redesign with sky blue and gold color scheme
- 🏰 Big Ben background on landing screen
- 🔄 Rebranded to "London Unlocked"
- 👤 Added account management features
- 🎄 Added Christmas seasonal features
- 🎨 Centralized color system
- 📱 Improved UI/UX throughout

### v1.0.0 (Initial Release)
- ✅ Basic app structure
- 🏛️ Free places to visit
- 🍛 Restaurant listings
- 🛍️ Shopping mall directory
- 🔐 User authentication

## 📄 License

This is a demo/test application created for educational purposes.

## 👥 Contributing

This is a test application. For contributions or questions, please refer to the project documentation.

## 🎯 Future Enhancements

- [ ] Real-time location-based recommendations
- [ ] Offline mode with cached data
- [ ] Social features (share places, reviews)
- [ ] Multi-language support
- [ ] Integration with transport APIs
- [ ] User-generated content
- [ ] Push notifications for events
- [ ] Favorites and bookmarking
- [ ] Interactive maps integration

---

**Made with ❤️ for London explorers**

*Discover London's hidden gems with elegance and ease*

