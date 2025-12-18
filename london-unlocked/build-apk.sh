#!/bin/bash

# Build Android APK for London Unlocked App
# This APK can be checked into git and used for testing

echo "🏗️  Building London Unlocked Android APK..."
echo ""

# Set Android SDK paths
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/emulator:$PATH"

# Navigate to android directory
cd "$(dirname "$0")/android"

# Clean previous build
echo "🧹 Cleaning previous build..."
./gradlew clean

# Build debug APK
echo "🔨 Building debug APK..."
./gradlew assembleDebug --no-daemon

# Check if build succeeded
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo ""
    echo "✅ APK built successfully!"
    echo ""
    echo "📦 APK Location:"
    echo "   android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📱 To install on device/emulator:"
    echo "   ./install-apk.sh"
    echo ""
    echo "🧪 To run tests:"
    echo "   cd ../london-unlocked-tests && npm test"
    echo ""
else
    echo ""
    echo "❌ Build failed!"
    echo "Check the error messages above"
    exit 1
fi

