#!/bin/bash

echo "================================================"
echo "  Starting Explore London App with Christmas"
echo "================================================"
echo ""

# Navigate to project directory
cd /Users/saritadash/Documents/london-unlocked-app/london-unlocked

# Set up Android environment
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Kill any existing processes
echo "🧹 Cleaning up old processes..."
pkill -9 -f "expo" 2>/dev/null
pkill -9 -f "metro" 2>/dev/null
sleep 3

# Check for Android emulator
echo ""
echo "📱 Checking for Android emulator..."
$ANDROID_HOME/platform-tools/adb devices

echo ""
echo "🚀 Starting Expo..."
echo ""
echo "Once the QR code appears, press 'a' to launch on Android"
echo "Or scan the QR code with Expo Go app on your phone"
echo ""
echo "================================================"
echo ""

# Start Expo
npx expo start

