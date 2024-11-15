# Red Light - Green Light Game

Welcome to the **Red Light - Green Light** game! This is a browser-based game where players take careful steps forward by alternating clicks on two buttons, all while trying not to get caught walking at the wrong time.

## Table of Contents

- [Game Overview](#game-overview)
- [Features](#features)
- [How to Play](#how-to-play)
- [Local Storage](#local-storage)
- [Leaderboard](#leaderboard)
- [Mute Button](#mute-button)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)

## Game Overview

In this game, your objective is to take steps forward by clicking two buttons in alternating order. While the character on the screen has their back turned, you can click to move forward. However, if you click when the character faces forward, your score will reset to zero. The game tracks your best scores and saves them in the browser’s local storage.

## Features

- **Home Screen**: Enter your username on the home screen to start playing. Your username will also be used to store your high scores.
- **Step Counter**: Your score increases as you successfully alternate clicks between the right and left buttons.
- **Penalty for Mistakes**:
  - If you click the same button twice in a row, you lose a point.
  - If you click while the character faces forward, your score resets to zero.
- **Persistent Score**: High scores are stored locally in the browser, and a leaderboard on the home screen shows the top scores.
- **Mute Button**: A button to mute the background music that plays while you are free to move.

## How to Play

1. **Enter Username**: Start by entering a username on the home screen. This will allow you to save scores.
2. **Start Walking**:
   - **Alternate Clicks**: Use the left and right buttons on the screen to take steps forward.
   - **Watch the Character**: The character will periodically turn around. You can only walk while their back is turned.
   - **Avoid Mistakes**:
     - If you click when the character is facing forward, your score will reset to zero.
     - If you click the same button consecutively, you lose a point.
3. **Scoring**: Your score is displayed on the screen as you progress. Try to beat your best score each time!
4. **Mute the Music**: Click the mute button to stop the background music, which plays while you’re allowed to walk.

## Local Storage

- The game uses **local storage** to save scores. Your highest score is recorded for future sessions and displayed on the leaderboard.

## Leaderboard

- On the home screen, there is a leaderboard showing the top scores. Your highest score will appear here alongside the scores of other players.

## Mute Button

- A **mute button** allows you to toggle background music on and off. The music plays when the character has their back turned, indicating that it’s safe to move.

## Getting Started

1. Visit the game on Netlify: [Red Light - Green Light Game](https://stalwart-kheer-5c857f.netlify.app/)
2. Alternatively, clone the repository to your local machine:
   ```bash
   git clone https://github.com/pepealacid/redlight-greenlight.git
   ```

## Technologies Used

- HTML5 and CSS for layout and styling
- JavaScript for game logic
- Local Storage for saving high scores
- Service Worker for PWA capabilities (optional)

Enjoy playing and see how far you can go without getting caught! 🎮
