import request from "supertest";
import { app, server } from "../../src/index"; 
import mongoose from "mongoose"; // If using MongoDB
import { createGameService, getGameSummaryService, moveInGameService } from "../../src/services/game.service";
import HttpStatusCodes from "http-status-codes";

jest.mock("../../src/services/game.service");

describe("Game Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
    server.close();
  });

  it("should create a game successfully", async () => {
    const mockGame = {
      id: "1",
      theme: "themeId123",
      score: 0,
      startTime: Date.now(),
      endTime: 0,
      moves: 0,
      cardMatches: 0,
    };

    (createGameService as jest.Mock).mockResolvedValue({
      ...mockGame,
      save: jest.fn().mockResolvedValue(mockGame),
    });

    const response = await request(app)
      .post("/api/v1/game/")
      .send({ themeId: "themeId123" });

    expect(response.status).toBe(HttpStatusCodes.CREATED);
    expect(response.body).toEqual(mockGame);
  });

  it("should handle error when creating a game", async () => {
    const errorMessage = "Error creating game";
    (createGameService as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const response = await request(app)
      .post("/api/v1/game/")
      .send({ themeId: "themeId123" });

    expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).toBe(errorMessage);
  });

  // game summary
  it("Should get game summary successfully", async () => {
    const mockSummary = {
      score: 212,
      time: "00h:00m:30s",
      moves: 30,
     
    };

    (getGameSummaryService as jest.Mock).mockResolvedValue(mockSummary);

    const response = await request(app).get("/api/v1/game/summary/67e814292bc8282778caf1ae");

    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.body).toEqual(mockSummary);
  }); 

  
  it("Should get bad request because gameId in params is not Object Id", async () => {
    const mockSummary = {
      score: 212,
      time: "00h:00m:30s",
      moves: 30,
     
    };

    (getGameSummaryService as jest.Mock).mockResolvedValue(mockSummary);

    const response = await request(app).get("/api/v1/game/summary/1");

    expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe("Invalid data");
  }); 

  it("Should get not found if game does not exist", async () => {
   

    (getGameSummaryService as jest.Mock).mockRejectedValue(new Error("Game not found"));

    const response = await request(app).get("/api/v1/game/summary/67e814292bc8282778caf1ae");

    expect(response.status).toBe(HttpStatusCodes.NOT_FOUND);
    expect(response.body.message).toBe("Game not found");
  }); 

  it("should successfully process a move", async () => {
    const mockResponse = {
      gameId: "1",
      moves: 1,
      matched: true,
      score: 10,
      status: "in_progress",
    };

    (moveInGameService as jest.Mock).mockResolvedValue(mockResponse);

    const response = await request(app)
      .post("/api/v1/game/move")
      .send({ gameId: "67e814292bc8282778caf1ae", selectedCardIds: ["67e806046daacbef13311d8c", "67e806046daacbef13311d8d"] });

    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.body).toEqual(mockResponse);
  });


  it("should get bad request beause selectedCardIds are not valid", async () => {
    
    const response = await request(app)
      .post("/api/v1/game/move")
      .send({ gameId: "67e814292bc8282778caf1ae", selectedCardIds: ["67e806046daacbef13311d8c"] });

    expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
     
  });

  it("should get bad request beause gameId is empty", async () => {
    
    const response = await request(app)
      .post("/api/v1/game/move")
      .send({ gameId: "", selectedCardIds: ["67e806046daacbef13311d8c", "67e814292bc8282778caf1ae"] });

    expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
     
  });

  it("Should get 500 server error when moveInGameService throws an error", async () => {

    (moveInGameService as jest.Mock).mockRejectedValueOnce(new Error("Error processing move"));
    const response = await request(app)
      .post("/api/v1/game/move")
      .send({ gameId: "67e814292bc8282778caf1ae", selectedCardIds: ["67e806046daacbef13311d8c", "67e806046daacbef13311d8d"] });

    expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    
  });

});

