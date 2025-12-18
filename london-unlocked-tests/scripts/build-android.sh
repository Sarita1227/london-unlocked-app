#!/bin/bash

# Build Android APK Script
# This script builds the Android APK and copies it to the test framework
# Works on any OS: macOS, Linux, Windows (Git Bash), Jenkins, GitHub Actions

set -e  # Exit on error
set -o pipefail  # Exit on pipe failure

# Error handling function
error_exit() {
    echo ""
    echo "❌ ERROR: $1" >&2
    echo "📍 Failed at: ${BASH_SOURCE[1]}:${BASH_LINENO[0]}" >&2
    echo ""
    exit 1
}

# Cleanup function
cleanup() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        echo ""
        echo "⚠️  Build failed with exit code: $exit_code"
        echo "💡 Check the error message above for details"
    fi
}

# Set trap for cleanup on exit
trap cleanup EXIT

echo "🔨 Building Android APK for London Unlocked..."

# Auto-detect directories (works from anywhere)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" || error_exit "Failed to determine script directory"
TEST_DIR="$(dirname "$SCRIPT_DIR")" || error_exit "Failed to determine test directory"
APP_DIR="$(dirname "$TEST_DIR")/london-unlocked"

echo "📍 Test framework: $TEST_DIR"
echo "📍 App directory: $APP_DIR"

# Validate directories exist
[ -d "$TEST_DIR" ] || error_exit "Test directory not found: $TEST_DIR"
[ -d "$APP_DIR" ] || error_exit "App directory not found: $APP_DIR. Is london-unlocked in the right location?"
[ -d "$APP_DIR/android" ] || error_exit "Android directory not found: $APP_DIR/android"

cd "$APP_DIR" || error_exit "Failed to change to app directory: $APP_DIR"

# Check if Android SDK is configured
if [ ! -f "android/local.properties" ]; then
    echo "⚙️  Configuring Android SDK..."

    # Auto-detect Android SDK location (works on macOS, Linux, Windows)
    if [ -d "$HOME/Library/Android/sdk" ]; then
        # macOS
        SDK_DIR="$HOME/Library/Android/sdk"
    elif [ -d "$HOME/Android/Sdk" ]; then
        # Linux
        SDK_DIR="$HOME/Android/Sdk"
    elif [ -d "$ANDROID_HOME" ]; then
        # From environment variable
        SDK_DIR="$ANDROID_HOME"
    elif [ -d "$ANDROID_SDK_ROOT" ]; then
        # Alternative environment variable
        SDK_DIR="$ANDROID_SDK_ROOT"
    else
        echo "❌ Android SDK not found!"
        echo "Please set ANDROID_HOME or ANDROID_SDK_ROOT environment variable"
        exit 1
    fi

    echo "sdk.dir=$SDK_DIR" > android/local.properties
    echo "✅ Android SDK configured: $SDK_DIR"
fi

# Build debug APK
echo "📦 Building debug APK..."
cd android || error_exit "Failed to change to android directory"

# Check if gradlew exists
[ -f "./gradlew" ] || error_exit "gradlew script not found. Run 'npx expo prebuild --platform android' first"

# Make gradlew executable
chmod +x ./gradlew || error_exit "Failed to make gradlew executable"

# Build with error handling
if ! ./gradlew assembleDebug; then
    error_exit "Gradle build failed. Check build logs above for details"
fi

# Find the built APK
echo "🔍 Searching for built APK..."
APK_PATH=$(find . -name "app-debug.apk" -type f 2>/dev/null | head -1)

if [ -z "$APK_PATH" ]; then
    error_exit "APK not found after build! Expected location: app/build/outputs/apk/debug/app-debug.apk"
fi

echo "✅ APK built successfully: $APK_PATH"

# Copy APK to test framework
echo "📋 Copying APK to test framework..."
mkdir -p "$TEST_DIR/apps/android" || error_exit "Failed to create apps/android directory"

if ! cp "$APK_PATH" "$TEST_DIR/apps/android/app-debug.apk"; then
    error_exit "Failed to copy APK to test framework"
fi

# Verify APK was copied
if [ ! -f "$TEST_DIR/apps/android/app-debug.apk" ]; then
    error_exit "APK copy verification failed"
fi

echo "✅ APK copied to: $TEST_DIR/apps/android/app-debug.apk"
echo ""
echo "🎉 Build complete! Ready for testing."
echo ""
echo "To run tests:"
echo "  cd $TEST_DIR"
echo "  npm run test:android"

