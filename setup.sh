#!/bin/bash

# ----------------------------
# Load environment variables
# ----------------------------
ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
    echo "Loading environment variables from $ENV_FILE..."
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    echo "No .env file found. Proceeding with current environment variables..."
fi

# ----------------------------
# Check required variables
# ----------------------------
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN is not set."
    exit 1
fi

if [ -z "$REPO_URL" ]; then
    echo "Error: REPO_URL is not set."
    exit 1
fi

BRANCH="${BRANCH:-main}"  # Use 'main' as default branch if not set

# ----------------------------
# Setup
# ----------------------------
SITE_DIR="$(pwd)/site"

echo "Starting deployment..."

if [ ! -d "$SITE_DIR" ]; then
    echo "Creating site directory..."
    mkdir -p "$SITE_DIR"
fi

cd "$SITE_DIR" || exit

# ----------------------------
# Clone or Pull Repository
# ----------------------------
if [ -d ".git" ]; then
    echo "Pulling latest changes from $BRANCH..."
    git pull origin "$BRANCH"
else
    echo "Cloning repository from $REPO_URL..."
    git clone -b "$BRANCH" "$REPO_URL" .
fi

# ----------------------------
# Install Dependencies
# ----------------------------
if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    npm install

    if [ -f "package-lock.json" ]; then
        echo "Running npm ci for a clean install..."
        npm ci
    fi
else
    echo "Error: package.json not found!"
    exit 1
fi

# ----------------------------
# Start or Restart App
# ----------------------------
if command -v pm2 &> /dev/null; then
    echo "Restarting application with PM2..."
    pm2 restart site || pm2 start index.js --name site
else
    echo "PM2 not found, starting with Node.js..."
    nohup node index.js > output.log 2>&1 &
fi

echo "Deployment completed successfully!"
