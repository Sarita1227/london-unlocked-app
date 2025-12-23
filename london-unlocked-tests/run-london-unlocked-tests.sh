#!/bin/bash

# London Unlocked - APK Test Runner
# Installs the APK and runs tests

echo "London Unlocked Test Automation Setup"
echo "======================================"

# Clean previous Allure results
ALLURE_RESULTS_DIR="./reports/allure-results"
if [ -d "$ALLURE_RESULTS_DIR" ]; then
    echo "Cleaning previous test results: $ALLURE_RESULTS_DIR"
    rm -rf "$ALLURE_RESULTS_DIR"
fi

# Check if emulator is running
if ! adb devices | grep -q "emulator"; then
    echo "ERROR: No Android emulator detected"
    echo "Please start your Android emulator first"
    exit 1
fi

echo "Android emulator detected"

# Check if APK exists
APK_PATH="./apps/android/app-debug.apk"
if [ ! -f "$APK_PATH" ]; then
    echo "ERROR: APK not found at $APK_PATH"
    echo "Build the APK first: npm run build:android"
    exit 1
fi

echo "APK found: $APK_PATH"

# Install APK on emulator
echo "Installing APK on emulator..."
if adb install -r "$APK_PATH"; then
    echo "APK installed successfully"
else
    echo "Warning: APK installation failed, attempting to use installed app"
    export USE_INSTALLED_APP=true
fi

# Run tests
echo "Running test automation..."
export USE_EXPO_GO=false
export PLATFORM=android

npm run test:sanity

echo "Test execution completed"
echo "View results: npm run report:open"
