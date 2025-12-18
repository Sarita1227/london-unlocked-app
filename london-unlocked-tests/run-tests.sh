#!/bin/bash

# London Unlocked - Simple Test Runner
# Usage: ./run-tests.sh [command]
# Commands: all, sanity, auth, guest, inspector, report, help

set -e

COMMAND=${1:-help}

case "$COMMAND" in
    all)
        echo "🚀 Running All Tests (@test tag)..."
        npm run test:all
        echo ""
        echo "📊 Generating Report..."
        npm run allure:generate
        echo "✅ Done! Open reports/allure-report/index.html"
        ;;

    sanity)
        echo "🚀 Running Sanity Tests (@sanity tag)..."
        npm run test:sanity
        echo ""
        echo "📊 Generating Report..."
        npm run allure:generate
        echo "✅ Done! Open reports/allure-report/index.html"
        ;;

    auth)
        echo "🚀 Running Auth Tests..."
        npm run test:auth
        echo ""
        echo "📊 Generating Report..."
        npm run allure:generate
        echo "✅ Done! Open reports/allure-report/index.html"
        ;;

    guest)
        echo "🚀 Running Guest User Tests..."
        npm run test:guest
        echo ""
        echo "📊 Generating Report..."
        npm run allure:generate
        echo "✅ Done! Open reports/allure-report/index.html"
        ;;

    inspector)
        echo "🔍 Starting Appium Inspector..."
        echo "Configure inspector to connect to: http://localhost:4723"
        npx appium-inspector
        ;;

    report)
        echo "📊 Generating Allure Report..."
        npm run allure:generate
        echo "✅ Done! Open reports/allure-report/index.html"
        ;;

    help|*)
        echo "London Unlocked - Test Runner"
        echo "=============================="
        echo ""
        echo "Usage: ./run-tests.sh [command]"
        echo ""
        echo "Commands:"
        echo "  all       - Run all tests (@test tag)"
        echo "  sanity    - Run sanity tests (@sanity tag)"
        echo "  auth      - Run authentication tests only"
        echo "  guest     - Run guest user tests only"
        echo "  inspector - Start Appium Inspector"
        echo "  report    - Generate Allure HTML report"
        echo "  help      - Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./run-tests.sh all"
        echo "  ./run-tests.sh sanity"
        echo "  ./run-tests.sh auth"
        echo ""
        ;;
esac

