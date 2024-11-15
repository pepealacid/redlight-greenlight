import StorageService from "../public/src/services/storage";

describe("StorageService", () => {
  // Clear storage before each test to prevent data interference
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("saves and retrieves player name", () => {
    // Save a player name and verify it is stored correctly
    StorageService.savePlayerName("TestUser");
    expect(StorageService.getPlayerName()).toBe("TestUser");
  });

  it("updates maxScore if the new score is higher", () => {
    // Save initial score, then save a higher score, and verify maxScore is updated
    StorageService.savePlayerScore("TestUser", 10);
    StorageService.savePlayerScore("TestUser", 20);
    const playerData = StorageService.getPlayerData("TestUser");
    expect(playerData.maxScore).toBe(20);
  });

  it("retrieves the top 3 players by maxScore", () => {
    // Add multiple players with different scores
    StorageService.savePlayerScore("Player1", 50);
    StorageService.savePlayerScore("Player2", 100);
    StorageService.savePlayerScore("Player3", 75);
    StorageService.savePlayerScore("Player4", 90);
    StorageService.savePlayerScore("Player5", 60);

    // Retrieve the top 3 players by maxScore
    const topPlayers = StorageService.getRanking();

    // Verify that only 3 players are returned in the ranking
    expect(topPlayers.length).toBe(3);

    // Verify the order and scores of players in the ranking
    expect(topPlayers[0].username).toBe("Player2"); // Highest score
    expect(topPlayers[0].maxScore).toBe(100);

    expect(topPlayers[1].username).toBe("Player4");
    expect(topPlayers[1].maxScore).toBe(90);

    expect(topPlayers[2].username).toBe("Player3");
    expect(topPlayers[2].maxScore).toBe(75);
  });
});
