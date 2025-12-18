#!/bin/bash

# Set Android SDK path
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Kill any existing Metro bundlers
pkill -9 -f "expo" 2>/dev/null
pkill -9 -f "metro" 2>/dev/null

# Wait a bit
sleep 2

# Start Expo with Android
echo "Starting Expo with Android emulator..."
cd "$(dirname "$0")"
npx expo start --android --clear

