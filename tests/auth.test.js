const request = require("supertest");
const app = require("../index");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

describe("Authentication API", () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  const registerUser = async (user) => {
    return await new User(user).save();
  };

  test("Should register a new user successfully", async () => {
    try {
      const res = await request(app).post("/api/v1/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("User registered successfully");
      expect(res.body.data.username).toBe("testuser");
      expect(res.body.data.email).toBe("test@example.com");
      expect(res.body.data.password).toBeUndefined(); // Ensure password is not exposed
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  });

  test("Should not register user with existing email", async () => {
    try {
      await registerUser({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/v1/auth/register").send({
        username: "testuser2",
        email: "test@example.com",
        password: "password456",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Email already in use");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  });

  test("Should login a user successfully", async () => {
    try {
      const user = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      // Register the user with hashed password logic in your model
      await registerUser(user);

      const res = await request(app).post("/api/v1/auth/login").send({
        email: user.email,
        password: user.password,
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("User logged in successfully");
      expect(res.body.token).toBeDefined();

      // Decode and validate the token
      const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
      expect(decoded.email).toBe(user.email);
      expect(decoded.username).toBe(user.username);
    } catch (error) {
      console.error("Error logging in user:", error.message);
    }
  });

  test("Should not login with invalid credentials", async () => {
    try {
      await registerUser({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Invalid credentials");
    } catch (error) {
      console.error("Error logging in user:", error.message);
    }
  });

  test("Should validate missing fields on registration", async () => {
    try {
      const res = await request(app).post("/api/v1/auth/register").send({
        username: "",
        email: "",
        password: "",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ msg: "Username is required" })
      );
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ msg: "Email is required" })
      );
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ msg: "Password is required" })
      );
    } catch (error) {
      console.error("Error validating registration fields:", error.message);
    }
  });
});
