#!/bin/bash

# London Unlocked - Complete Setup Script
# Run this script after cloning the repository

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 London Unlocked - Complete Setup"
echo "===================================="
echo ""

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi
print_success "Node.js found: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi
print_success "npm found: $(npm -v)"

# Check adb
if ! command -v adb &> /dev/null; then
    print_error "adb is not found. Please install Android SDK and set ANDROID_HOME."
    exit 1
fi
print_success "adb found"

# Check Appium
if ! command -v appium &> /dev/null; then
    print_warning "Appium is not installed globally."
    echo "Installing Appium globally..."
    npm install -g appium
    appium driver install uiautomator2
fi
print_success "Appium found: $(appium -v)"

echo ""
echo "📦 Installing dependencies..."

# Install app dependencies
if [ ! -d "london-unlocked/node_modules" ]; then
    echo "Installing app dependencies..."
    cd london-unlocked
    npm install --legacy-peer-deps
    cd ..
    print_success "App dependencies installed"
else
    print_success "App dependencies already installed"
fi

# Install test dependencies
if [ ! -d "london-unlocked-tests/node_modules" ]; then
    echo "Installing test dependencies..."
    cd london-unlocked-tests
    npm install
    cd ..
    print_success "Test dependencies installed"
else
    print_success "Test dependencies already installed"
fi

echo ""
echo "📱 Checking Android device/emulator..."

# Check if emulator is running
DEVICE_COUNT=$(adb devices 2>/dev/null | grep -v "List of devices" | grep "device" | wc -l | xargs)

if [ "$DEVICE_COUNT" -eq 0 ]; then
    print_warning "No Android emulator/device detected"
    echo ""
    echo "Please start an Android emulator:"
    echo "  1. List available emulators:"
    echo "     \$ANDROID_HOME/emulator/emulator -list-avds"
    echo ""
    echo "  2. Start an emulator:"
    echo "     \$ANDROID_HOME/emulator/emulator -avd <avd_name> &"
    echo ""
    echo "After starting the emulator, run this script again."
    exit 1
fi

print_success "Android device/emulator connected"
adb devices

echo ""
echo "🔨 Building and installing app..."

# Check if APK exists, if not build it
APK_PATH="london-unlocked/android/app/build/outputs/apk/debug/app-debug.apk"

if [ ! -f "$APK_PATH" ]; then
    echo "Building APK..."
    cd london-unlocked/android
    ./gradlew assembleDebug
    cd ../..
    print_success "APK built successfully"
else
    print_success "APK already exists"
fi

# Install APK
echo "Installing app on device..."
adb install -r "$APK_PATH" 2>/dev/null || {
    print_warning "App already installed, reinstalling..."
    adb uninstall com.anonymous.londonunlocked 2>/dev/null || true
    adb install "$APK_PATH"
}
print_success "App installed successfully"

echo ""
echo "🔧 Starting Appium server..."

# Kill existing Appium process if any
pkill -f appium 2>/dev/null || true
sleep 2

# Start Appium in background
cd london-unlocked-tests
nohup appium --address 127.0.0.1 --port 4723 --log /tmp/appium.log > /dev/null 2>&1 &
APPIUM_PID=$!
cd ..

sleep 3

# Check if Appium started successfully
if ps -p $APPIUM_PID > /dev/null; then
    print_success "Appium server started (PID: $APPIUM_PID)"
else
    print_error "Failed to start Appium server"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════"
print_success "Setup Complete!"
echo "════════════════════════════════════════════════"
echo ""
echo "📱 App Package: com.anonymous.londonunlocked"
echo "🔧 Appium Server: http://127.0.0.1:4723"
echo "📋 Appium Logs: /tmp/appium.log"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "WHAT YOU CAN DO NOW:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  RUN TESTS"
echo "   cd london-unlocked-tests"
echo "   npm run test:sanity          # Run sanity tests"
echo "   npm test                     # Run all tests"
echo "   npm run allure:report        # View test report"
echo ""
echo "2️⃣  USE APPIUM INSPECTOR"
echo "   - Open Appium Inspector app"
echo "   - Connection: 127.0.0.1:4723"
echo "   - Copy capabilities from: inspector-capabilities.json"
echo "   - Click 'Start Session'"
echo ""
echo "3️⃣  VIEW LOGS"
echo "   tail -f /tmp/appium.log      # Watch Appium logs"
echo ""
echo "4️⃣  STOP APPIUM"
echo "   pkill -f appium              # Stop Appium server"
echo ""
echo "════════════════════════════════════════════════"

