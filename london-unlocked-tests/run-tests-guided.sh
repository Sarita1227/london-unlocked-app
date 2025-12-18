#!/bin/bash

# ============================================
# London Unlocked - Test Execution Guide
# ============================================

echo "🚀 London Unlocked Test Automation"
echo "===================================="
echo ""

# Step 1: Start Appium Server (Terminal 1)
echo "📋 STEP 1: Start Appium Server"
echo "-------------------------------"
echo "Open Terminal 1 and run:"
echo ""
echo "  appium --address 127.0.0.1 --port 4723 --relaxed-security --allow-insecure adb_shell"
echo ""
echo "Keep this terminal open!"
echo ""
echo "Press Enter when Appium is running..."
read

# Step 2: Verify Emulator
echo ""
echo "📋 STEP 2: Verify Emulator is Running"
echo "--------------------------------------"
adb devices
echo ""
echo "You should see an emulator/device listed above."
echo "If not, start the emulator from Android Studio."
echo ""
echo "Press Enter to continue..."
read

# Step 3: Run Tests
echo ""
echo "📋 STEP 3: Run Tests"
echo "--------------------"
echo ""
echo "Choose test suite to run:"
echo "  1) All tests (@test tag)"
echo "  2) Sanity tests (@sanity tag)"
echo "  3) Auth tests only"
echo "  4) Guest user tests only"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🧪 Running ALL tests with @test tag..."
        npm run test:all
        ;;
    2)
        echo ""
        echo "🧪 Running SANITY tests with @sanity tag..."
        npm run test:sanity
        ;;
    3)
        echo ""
        echo "🧪 Running AUTH tests..."
        npm run test:auth
        ;;
    4)
        echo ""
        echo "🧪 Running GUEST USER tests..."
        npm run test:guest
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

TEST_EXIT_CODE=$?

# Step 4: Generate Report
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Tests completed successfully!"
    echo ""
    echo "📊 Generating Allure HTML Report..."
    npm run allure:generate
    echo ""
    echo "📁 Report saved to: reports/allure-report/index.html"
    echo ""
    read -p "Open report in browser? (y/n): " open_report
    if [ "$open_report" = "y" ]; then
        npm run allure:open
    fi
else
    echo ""
    echo "❌ Tests failed!"
    echo "   Check the logs above for error details"
fi

echo ""
echo "🏁 Done!"

