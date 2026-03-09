#!/bin/bash

# UX Competency Survey - GitHub Pages Deployment Script
# This script automatically deploys changes to GitHub Pages

set -e  # Exit on error

echo "🚀 Deploying UX Competency Survey to GitHub Pages..."
echo ""

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    git status -s
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

echo "📦 Current branch: $CURRENT_BRANCH"
echo ""

# Switch to gh-pages branch
echo "🔄 Switching to gh-pages branch..."
git checkout gh-pages

# Merge main into gh-pages
echo "🔀 Merging main into gh-pages..."
git merge main --no-edit

# Push to GitHub
echo "⬆️  Pushing to GitHub Pages..."
git push origin gh-pages

# Switch back to original branch
echo "🔙 Switching back to $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your survey will be live at:"
echo "   https://bryanjbishop.github.io/ux-competency-survey/"
echo ""
echo "⏱️  Note: It may take 1-2 minutes for changes to appear."
