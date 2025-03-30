import request from "supertest";
import { app, server } from "../../src/index"; 
import mongoose from "mongoose";  
import { createBulkContentService, getContentsForThemeService } from "../../src/services/content.service";
import HttpStatusCodes from "http-status-codes";
import { url } from "inspector";

jest.mock("../../src/services/content.service");

describe("Theme Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
    server.close(); // Close the Express app.
  });

  it("should successfully create bulk content", async () => {
    const mockContents = [
      { id: "1", title: "Content 1", description: "First content" },
      { id: "2", title: "Content 2", description: "Second content" },
    ];

    (createBulkContentService as jest.Mock).mockResolvedValue(mockContents);

    const response = await request(app)
      .post("/api/v1/content/bulk")
      .send({
        "data": [
        { src: "Content 1", alt: "First content" },
        { src: "Content 2", alt: "Second content" }
        ],
        themeId: "67e814292bc8282778caf1ae"
      });

    expect(response.status).toBe(HttpStatusCodes.CREATED);
    expect(response.body).toEqual(mockContents);
  });

  it("should handle error when creating bulk content", async () => {
    const errorMessage = "Error creating bulk content";
    (createBulkContentService as jest.Mock).mockRejectedValue(new Error(errorMessage)); 

    const response = await request(app)
      .post("/api/v1/content/bulk")
      .send({
        "data": [
        { src: "Content 1", alt: "First content" },
        { src: "Content 2", alt: "Second content" }
        ],
        themeId: "67e814292bc8282778caf1ae"
      });

    expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);  
    expect(response.body).toEqual({ message: "Error creating contents"});
  });

  it("should successfully return contents for a theme", async () => {
    const themeId = "67e814292bc8282778caf1ae";
    const mockContents = [
      { id: "1", title: "Content 1", "url": "https://example.com", description: "First content" },
      { id: "2", title: "Content 2", "url":"https://example.com", description: "Second content" },
    ];

    (getContentsForThemeService as jest.Mock).mockResolvedValue(mockContents);

    const response = await request(app).get(`/api/v1/content/theme/${themeId}`);

    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.body).toEqual(mockContents);
  });

  it("should handle error when fetching contents for a theme", async () => {
    const themeId = "67e814292bc8282778caf1ae";
    const errorMessage = "Error fetching contents for theme";
    (getContentsForThemeService as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get(`/api/v1/content/theme/${themeId}`);

    expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ message: "Error fetching contents"});
  });
});

