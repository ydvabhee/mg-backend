# Node.js TypeScript Express MongoDB Backend

## ✨ Features

- RESTful API endpoints built with Express.js
- Written in TypeScript for type safety and improved maintainability
- MongoDB database integration using Mongoose ODM
- Input validation using Zod
- Comprehensive logging with Winston
- Environment variable management with dotenv
- Unit and integration testing setup with Jest & Supertest
- CORS configuration
- Hot reloading with Nodemon for development

---

## 🛠️ Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Logging:** Winston
- **Validation:** Zod
- **Environment Variables:** dotenv
- **Testing:** Jest, Supertest, MongoDB Memory Server
- **Development:** Nodemon, ts-node
- **Build:** tsc (TypeScript Compiler)
- **Package Manager:** npm / yarn

---

## ✅ Prerequisites

Ensure the following dependencies are installed:

- **Node.js** (v16.x or higher recommended - Check `.nvmrc` if available) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** (optional)
- **MongoDB** (local, Docker, or cloud service like MongoDB Atlas) - Obtain the connection string
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1️⃣ Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ydvabhee/mg-backend.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd mg-backend
    ```
3. **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### 2️⃣ Environment Variables

This application requires environment variables for configuration.

1. **Create a `.env` file:**
    - Copy the example file (`.env.example`) or create a new `.env` in the root directory.

2. **Populate `.env` with necessary variables:**
    ```dotenv
    # Server Configuration
    PORT=3000
    
    # MongoDB Connection
    MONGODB_URI=mongodb://localhost:27017/mydatabase
    
    # Additional configurations
    CORS_ORIGIN=http://localhost:5173
    ```
3. **Ensure `.env` is ignored in `.gitignore` to protect sensitive data.**

---

## ▶️ Running the Application

You can run the application in different modes:

### 🔹 Development Mode

Runs with `nodemon` for automatic server restarts on file changes.

Using npm:
```bash
npm start
```
Using yarn:
```bash
yarn start
```

The server will start on the port specified in `.env` (default: 3000).

### 🔹 Production Mode

1. **Build the application:**
    ```bash
    npm run build
    ```
    Or using yarn:
    ```bash
    yarn build
    ```
    This compiles the TypeScript code in `src/` to JavaScript in `dist/`.

2. **Run the server:**
    ```bash
    npm run server
    ```
    Or using yarn:
    ```bash
    yarn server
    ```
    This runs the compiled entry point `dist/src/index.js`.

---

## ✅ Running Tests

Execute the test suite using Jest:

Using npm:
```bash
npm test
```
Using yarn:
```bash
yarn test
```

This runs unit and integration tests, showing results and generating coverage reports (in `coverage/`).

---

 
Happy coding! 🚀

