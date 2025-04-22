# 📦 UNI Enterprise CW2 — RandomBrit

A coursework project for CM4025, built with Node.js and other full-stack tools. This repo contains the server and client setup required to run the project locally.

---

## 🚀 Features

- Full-stack web application setup
- Easy install via `setup.sh` and `Astart.sh`
- Handles memory and version edge cases for smooth onboarding

---

## 🛠️ Setup

To set up and run this project, follow these instructions carefully.

### 📦 Initial Setup

From inside the `installBlob` directory, run:

```bash
chmod +x setup.sh
./setup.sh
./Astart.sh
```

These scripts will install all necessary dependencies and start the project.
⚠️ Node.js Version Warning

    This project requires Node.js v18 or higher.

If your Node.js version is too low, install or switch to the correct version using NVM:

# Install NVM (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal or source your profile
source ~/.bashrc  # or ~/.zshrc depending on your shell

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

Verify with:

node -v

You should see something like v18.x.x.

#🧠 Low Memory Fix (Optional)

If the client install crashes due to memory issues (e.g. during npm install), you can increase Node's memory limit with:

NODE_OPTIONS="--max-old-space-size=2048" npm install

This allocates 2GB of memory to the install process, which helps on systems with less RAM.
📁 Project Structure

installBlob/
├── setup.sh         # Installs dependencies
├── Astart.sh        # Starts the app
├── site/            # Contains client/server code
└── README.md        # This file

✍️ Author

randomBrit
GitHub: @randomBrit
