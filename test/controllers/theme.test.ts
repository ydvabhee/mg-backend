import request from "supertest";
import { app, server } from "../../src/index"; 
import { createThemeService, getThemeByIdService, getThemesService } from "../../src/services/theme.service";
import mongoose from "mongoose"; // If using MongoDB

jest.mock("../../src/services/theme.service");

describe("Theme Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
    server.close(); // Close the Express app.
  });


  // Create a theme test
  it("should create a theme successfully", async () => {
    const mockTheme = { id: "1", name: "Animal", description: "Animal theme" };
    (createThemeService as jest.Mock).mockResolvedValue(mockTheme);

    const response = await request(app)
      .post("/api/v1/theme/")
      .send({ name: "Animal", description: "Animal theme" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockTheme);
  });

  

  it("should handle error when creating a theme", async () => {
    const errorMessage = "Error creating theme";
    (createThemeService as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post("/api/v1/theme/")
      .send({ name: "Dark Mode", description: "A dark theme" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });

  // Get themes 
  it("should return themes successfully", async () => {
    const mockThemes = [
      { id: "1", name: "Animal", description: "Animal theme" },
      { id: "2", name: "Fruit", description: "Fruit theme" },
    ];

    (getThemesService as jest.Mock).mockResolvedValue(mockThemes);

    const response = await request(app).get("/api/v1/theme/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockThemes);
  });

  it("should return an empty array when no themes exist", async () => {
    (getThemesService as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get("/api/v1/theme/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should handle errors when fetching themes", async () => {
    (getThemesService as jest.Mock).mockRejectedValue(new Error("Error fetching themes"));

    const response = await request(app).get("/api/v1/theme/");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error fetching themes");
  });

  // Get theme by id
  it("should return a theme by ID", async () => {
    const mockTheme = { id: "1", name: "Animal", description: "Animal theme" };

    (getThemeByIdService as jest.Mock).mockResolvedValue(mockTheme);

    const response = await request(app).get("/api/v1/theme/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTheme);
  });

  it("should handle errors when fetching a theme by ID", async () => {
    (getThemeByIdService as jest.Mock).mockRejectedValue(new Error("Error fetching theme"));

    const response = await request(app).get("/api/v1/theme/1"); 

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error fetching theme");
  }); 


});
