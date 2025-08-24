name: Node.js Auto-Restart CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Install FFmpeg
      run: sudo apt-get update && sudo apt-get install -y ffmpeg

    - name: Start application with timeout
      run: |
        echo "🚀 Starting bot (will run max 6 hours)..."
        timeout 21600s npm start || echo "⏹ Bot stopped or timed out"

    - name: Auto-commit to trigger restart
      run: |
        git config --global user.email "autorestart@bot.com"
        git config --global user.name "Auto Restart Bot"
        git commit --allow-empty -m "⏱️ Automatic bot restart"
        git push
