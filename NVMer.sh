#!/bin/bash

# Install NVM
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Check for the shell profile file and add NVM lines
PROFILE_FILE="$HOME/.bashrc"

if [ -f "$HOME/.zshrc" ]; then
    PROFILE_FILE="$HOME/.zshrc"
elif [ -f "$HOME/.bash_profile" ]; then
    PROFILE_FILE="$HOME/.bash_profile"
elif [ -f "$HOME/.profile" ]; then
    PROFILE_FILE="$HOME/.profile"
fi

if ! grep -q "NVM_DIR" "$PROFILE_FILE"; then
    echo "Setting up NVM in the profile file..."
    echo 'export NVM_DIR="$HOME/.nvm"' >> "$PROFILE_FILE"
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> "$PROFILE_FILE"
fi

# Source the profile file to apply changes immediately
source "$PROFILE_FILE"

# Install Node.js version 18 using NVM
echo "Installing Node.js version 18..."
nvm install 18

# Set Node.js 18 as the default version
nvm use 18
nvm alias default 18

echo "Node.js version 18 is installed and set as default."