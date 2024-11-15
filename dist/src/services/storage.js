class StorageService {
  // Stores the current player's username in sessionStorage for session-based access
  savePlayerName(username) {
    sessionStorage.setItem("currentPlayer", username);
  }

  // Retrieves the current player's username from sessionStorage
  getPlayerName() {
    return sessionStorage.getItem("currentPlayer");
  }

  // Saves the player's score and updates `maxScore` if the new score is higher
  savePlayerScore(username, score) {
    const existingData = this.getPlayerData(username);

    const playerData = {
      username: username,
      score: score,
      maxScore: existingData ? Math.max(existingData.maxScore, score) : score,
    };

    localStorage.setItem(username, JSON.stringify(playerData));
  }

  // Retrieves a player's data from localStorage
  getPlayerData(username) {
    const data = localStorage.getItem(username);
    return data ? JSON.parse(data) : null;
  }

  // Retrieves all saved usernames from localStorage
  getAllPlayerNames() {
    const keys = Object.keys(localStorage);
    return keys.filter((key) => {
      const data = localStorage.getItem(key);
      try {
        const parsedData = JSON.parse(data);
        return parsedData && parsedData.username;
      } catch {
        return false;
      }
    });
  }

  // Initializes a player with default values if they don't exist in localStorage
  initializePlayer(username) {
    if (!this.getPlayerData(username)) {
      const playerData = {
        username: username,
        score: 0,
        maxScore: 0,
      };
      localStorage.setItem(username, JSON.stringify(playerData));
    }
  }

  // Retrieves the top three players based on `maxScore`
  getRanking() {
    const players = this.getAllPlayerNames().map((username) =>
      this.getPlayerData(username)
    );

    const topPlayers = players
      .filter((player) => player && player.maxScore !== 0)
      .sort((a, b) => b.maxScore - a.maxScore)
      .slice(0, 3);

    return topPlayers;
  }
}

// Export a single instance of StorageService for global use
export default new StorageService();
