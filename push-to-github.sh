#!/bin/bash

echo "=========================================="
echo "  Push London Unlocked App to GitHub"
echo "=========================================="
echo ""

# Check if repository exists on GitHub
echo "Step 1: Creating repository on GitHub (if it doesn't exist)"
echo ""
echo "Please follow these steps:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: london-unlocked-app"
echo "3. Description: Mobile test automation for React Native app with WebDriverIO + Appium"
echo "4. Keep it Public (or Private if you prefer)"
echo "5. DO NOT initialize with README (we already have one)"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter once you've created the repository on GitHub..."

echo ""
echo "Step 2: Authentication"
echo ""
echo "You need a Personal Access Token to push code."
echo "If you don't have one, create it here: https://github.com/settings/tokens"
echo ""
echo "Instructions:"
echo "  1. Click 'Generate new token (classic)'"
echo "  2. Name: london-unlocked-app"
echo "  3. Expiration: 90 days (or as needed)"
echo "  4. Select scope: ✓ repo (check all repo permissions)"
echo "  5. Click 'Generate token'"
echo "  6. COPY the token (starts with ghp_...)"
echo ""
read -p "Enter your GitHub Personal Access Token: " GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: Token cannot be empty"
    exit 1
fi

echo ""
echo "Step 3: Updating remote URL with token..."
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/Sarita1227/london-unlocked-app.git"

echo ""
echo "Step 4: Pushing code to GitHub..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ SUCCESS! Code pushed to GitHub"
    echo "=========================================="
    echo ""
    echo "🔗 View your repository at:"
    echo "   https://github.com/Sarita1227/london-unlocked-app"
    echo ""
    echo "📊 GitHub Actions will run automatically!"
    echo ""

    # Clean up the token from remote URL for security
    echo "🔐 Cleaning up token from git config for security..."
    git remote set-url origin "https://github.com/Sarita1227/london-unlocked-app.git"
    echo "✅ Token removed from git config"
    echo ""
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. Repository exists on GitHub"
    echo "   2. Token is valid and has 'repo' permissions"
    echo "   3. Token hasn't expired"
    echo ""
fi

echo "=========================================="

