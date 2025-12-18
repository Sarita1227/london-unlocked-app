# 🧪 London Unlocked - Test Automation Framework

**Mocha BDD | TypeScript | WebDriverIO | Appium | Allure Reports**

Production-ready mobile test automation framework for London Unlocked React Native app.

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+)
- Android Studio with emulator OR physical device
- Appium installed globally: `npm install -g appium`

### Setup (3 steps)
```bash
# 1. Install dependencies
npm install

# 2. Start Android emulator

# 3. Run tests
./run-tests.sh sanity
```

---

## 🚀 Running Tests

### Simple Command (Recommended)
```bash
./run-tests.sh [command]
```

**Available Commands:**
- `./run-tests.sh all` - Run all tests
- `./run-tests.sh sanity` - Run sanity tests (quick smoke)
- `./run-tests.sh auth` - Run authentication tests only
- `./run-tests.sh guest` - Run guest user tests only
- `./run-tests.sh inspector` - Start Appium Inspector
- `./run-tests.sh report` - Generate HTML report
- `./run-tests.sh help` - Show help

### Using NPM Scripts
```bash
npm run test:all       # Run all tests
npm run test:sanity    # Run sanity tests
npm run test:auth      # Run auth tests only
npm run test:guest     # Run guest user tests only
```

---

## ✨ Key Features

✅ **Mocha BDD** - Industry-standard testing framework  
✅ **TypeScript** - Type-safe tests  
✅ **Page Object Model** - Clean, maintainable architecture  
✅ **Auto-start Appium** - No manual server start needed  
✅ **Tagged Tests** - Run specific test suites (@test, @sanity)  
✅ **Allure Reports** - Beautiful HTML test reports  
✅ **Multi-Platform** - Android, iOS support  
✅ **Data-Driven** - External test data in JSON  
✅ **CI/CD Ready** - Works in any pipeline  

---

**Key Features**:
- ✅ **Login once** in `before()` hook - saves time!
- ✅ **Multiple tests** use same session - efficient!
- ✅ **Logout once** in `after()` hook
- ✅ Proper logging with `logger.step()`
- ✅ Clean, readable structure
- ✅ Full TypeScript power

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Appium 2.x
- Android SDK (for Android tests)
- Xcode (for iOS tests)

### Installation

```bash
# Clone and navigate
cd london-unlocked-tests

# Install dependencies
npm install

# Build APK (auto-detects everything)
npm run build:android

# Run tests (choose your framework)
npm run test:android              # Mocha BDD
npm run test:bdd:android          # Cucumber/Gherkin

# View reports
npm run allure:serve
```

---

## 📁 Project Structure

```
london-unlocked-tests/
├── src/
│   ├── pages/              # Page Object Model
│   ├── tests/              # Test specifications
│   ├── helpers/            # Test utilities
│   └── config/             # Platform capabilities
├── scripts/
│   ├── build-android.sh    # Build APK (auto-detects paths)
│   └── run-tests.sh        # Run tests (auto-detects paths)
├── apps/                   # Built APKs/IPAs
├── test-data/              # JSON test data
├── .env.platform           # Platform configuration
└── package.json            # NPM scripts
```

---

## 🎯 NPM Scripts

### Build

```bash
npm run build:android         # Build Android APK
npm run build:ios             # Build iOS app
```

### Test - Mocha BDD

```bash
# Platform-specific
npm run test:android          # Android emulator
npm run test:ios              # iOS simulator
npm run test:android:cloud    # BrowserStack Android
npm run test:ios:cloud        # BrowserStack iOS

# Suite-specific
npm run test:smoke            # Smoke tests
npm run test:auth             # Auth tests
npm run test:explore          # Explore tests
npm run test:e2e              # E2E tests
npm run test:regression       # Full regression
```


### Reports

```bash
npm run allure:serve          # Generate & open report
npm run allure:generate       # Generate only
npm run allure:open           # Open existing
```

### Cleanup

```bash
npm run clean                 # Clean reports
npm run clean:all             # Clean everything
```

---

## ⚙️ Configuration

### Environment Variables (CI/CD)

```bash
export PLATFORM=android       # android | ios
export TEST_ENV=local         # local | browserstack
export ANDROID_APP_PATH=./apps/android/app-debug.apk
export APPIUM_HOST=localhost
export APPIUM_PORT=4723
```

### .env.platform File (Local)

```bash
PLATFORM=android
TEST_ENV=local
ANDROID_VERSION=13
ANDROID_DEVICE=Android Emulator
```

---

## 🔄 Platform Switching

### Switch to iOS

```bash
export PLATFORM=ios
npm test
```

Or:

```bash
npm run test:ios
```

### Switch to BrowserStack

```bash
export TEST_ENV=browserstack
export BROWSERSTACK_USERNAME=your_user
export BROWSERSTACK_ACCESS_KEY=your_key
npm run test:android:cloud
```

---

## 🏗️ CI/CD Integration

### GitHub Actions

```yaml
- name: Run Tests
  env:
    PLATFORM: android
  run: |
    cd london-unlocked-tests
    npm run build:android
    npm test
```

### Jenkins

```groovy
environment {
    PLATFORM = 'android'
}
steps {
    dir('london-unlocked-tests') {
        sh 'npm run build:android'
        sh 'npm test'
    }
}
```

---


## 🐛 Troubleshooting

### Android SDK Not Found

```bash
# Set environment variable
export ANDROID_HOME=/path/to/android-sdk
```

### APK Not Found

```bash
# Build APK
npm run build:android

# Or set custom path
export ANDROID_APP_PATH=./custom/path/app.apk
```

### Script Permission Denied

```bash
chmod +x scripts/*.sh
```

---

## 🎯 Best Practices

✅ **Use environment variables** for CI/CD  
✅ **Keep test data in JSON** files  
✅ **Use Page Object Model** for maintainability  
✅ **Run smoke tests** before full regression  
✅ **Generate reports** after each run  
✅ **Clean reports** regularly  

---

## 🤝 Contributing

The framework is designed to be:
- Platform-agnostic (no hardcoded paths)
- CI/CD friendly (environment variable driven)
- Scalable (Page Object Model)
- Maintainable (clean separation of concerns)

---

## 🚀 Improvements & Next Steps

### Completed ✅
- [x] Page Object Model architecture
- [x] Cross-platform support (Android/iOS)
- [x] BDD-style test cases with Mocha
- [x] Smart locator strategies
- [x] Allure HTML reporting with timestamps
- [x] Test tagging (@sanity, @test)
- [x] CI/CD integration (Jenkins + GitHub Actions)
- [x] Screenshot capture on failure
- [x] External test data (JSON)
- [x] Comprehensive logging

### Short-term Improvements (Next Sprint)
- [ ] **Parallel Test Execution** - Run tests concurrently using WebDriverIO workers
- [ ] **Visual Regression Testing** - Add Percy or Applitools integration
- [ ] **API Integration** - Backend API tests alongside UI tests
- [ ] **Test Data Factory** - Generate dynamic test data with Faker.js
- [ ] **Retry Logic** - Auto-retry flaky tests (max 2 retries)
- [ ] **iOS Support** - Extend locators and tests for iOS platform

### Medium-term Improvements (1-2 Months)
- [ ] **Cloud Testing** - BrowserStack/Sauce Labs integration
- [ ] **Performance Metrics** - Track app response times
- [ ] **Accessibility Testing** - Add a11y checks
- [ ] **Video Recording** - Record test execution
- [ ] **Test Data Reset** - Auto-cleanup after test runs
- [ ] **Mock Services** - Stub backend APIs for faster tests
- [ ] **Advanced Reporting** - Trend analysis, failure patterns

### Long-term Vision (3-6 Months)
- [ ] **AI-Powered Healing** - Self-healing locators on element changes
- [ ] **Cross-browser Testing** - Extend to web version of app
- [ ] **Security Testing** - OWASP mobile security checks
- [ ] **Load Testing** - Backend API load tests
- [ ] **A/B Testing** - Validate feature toggles
- [ ] **Continuous Testing** - Run on every commit (fast suite)


---

## 📊 Technology Stack

- **TypeScript 5.3** - Type-safe tests
- **WebDriverIO 8.27** - Modern test automation
- **Appium 2.4** - Mobile driver
- **Mocha 10.0** - BDD test framework
- **Chai 4.3** - Assertions
- **Allure 2.25** - HTML reports
- **ESLint + Prettier** - Code quality

---


## 📄 License

This framework is built for London Unlocked mobile app testing.

---

## 🎉 Quick Commands

```bash
# Build APK
npm run build:android

# Run tests
npm run test:android      # Run Mocha tests on Android
npm run test:ios          # Run Mocha tests on iOS
npm run test:smoke        # Run smoke tests

# View reports
npm run allure:serve
```

---
