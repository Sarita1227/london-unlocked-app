#!/bin/bash

# Install London Unlocked APK on connected Android device/emulator

echo "📱 Installing London Unlocked APK..."
echo ""

# Set Android SDK paths
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/emulator:$PATH"

# Check if device is connected
DEVICE_COUNT=$(adb devices | grep -v "List of devices" | grep "device" | wc -l | xargs)

if [ "$DEVICE_COUNT" -eq 0 ]; then
    echo "❌ No Android device/emulator connected"
    echo ""
    echo "Please start an emulator or connect a device and try again"
    exit 1
fi

echo "✅ Found $DEVICE_COUNT connected device(s)"
echo ""

# Find APK
APK_PATH="$(dirname "$0")/android/app/build/outputs/apk/debug/app-debug.apk"

if [ ! -f "$APK_PATH" ]; then
    echo "❌ APK not found at: $APK_PATH"
    echo ""
    echo "Please build the APK first:"
    echo "   ./build-apk.sh"
    exit 1
fi

# Uninstall previous version
echo "🗑️  Uninstalling previous version (if exists)..."
adb uninstall com.anonymous.londonunlocked 2>/dev/null

# Install APK
echo "📥 Installing APK..."
adb install "$APK_PATH"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ App installed successfully!"
    echo ""
    echo "📱 Package: com.anonymous.londonunlocked"
    echo "🎯 Activity: .MainActivity"
    echo ""
    echo "🚀 To launch the app manually:"
    echo "   adb shell am start -n com.anonymous.londonunlocked/.MainActivity"
    echo ""
    echo "🔍 To inspect with Appium Inspector, use these capabilities:"
    echo '{'
    echo '  "platformName": "Android",'
    echo '  "appium:automationName": "UiAutomator2",'
    echo '  "appium:deviceName": "emulator-5554",'
    echo '  "appium:appPackage": "com.anonymous.londonunlocked",'
    echo '  "appium:appActivity": ".MainActivity",'
    echo '  "appium:noReset": true'
    echo '}'
    echo ""
else
    echo ""
    echo "❌ Installation failed!"
    exit 1
fi

