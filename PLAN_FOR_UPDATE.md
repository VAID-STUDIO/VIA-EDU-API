# Plan for Updating the VIA-EDU-API Project

## Changes Made

1. **Environment Variables**: Added `dotenv` to manage environment variables.
2. **TypeScript Migration**: Converted the existing JavaScript code to TypeScript for better type safety.
3. **Modularization**: Split the code into separate files for better organization.
4. **JWT Authentication**: Implemented a fast and secure JWT token generator.
5. **Error Handling**: Added a generic error handler to catch unexpected errors.
6. **Logging**: Improved logging for better debugging.

## Reasons for Changes

1. **Environment Variables**: Using `dotenv` to manage environment variables enhances security by keeping sensitive information like `SECRET_KEY` out of the source code.
2. **TypeScript Migration**: TypeScript provides better type safety, which helps in catching errors early during development.
3. **Modularization**: Splitting the code into separate files improves code organization and maintainability.
4. **JWT Authentication**: A fast and secure JWT token generator ensures that tokens are securely generated and stored.
5. **Error Handling**: A generic error handler helps in catching unexpected errors and responding appropriately.
6. **Logging**: Improved logging aids in better debugging and monitoring of the application.

## Instructions for Setting Up and Running the Updated Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VAID-STUDIO/VIA-EDU-API.git
   cd VIA-EDU-API
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=7120
   SECRET_KEY=your_secret_key
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Access the API**:
   The API will be running at `http://localhost:7120`. You can use tools like Postman to test the endpoints.

6. **Generate JWT Tokens**:
   Use a tool or script to generate JWT tokens using the `SECRET_KEY` specified in the `.env` file.

7. **Test the Endpoints**:
   - **Get Student by ID**: `GET /students/:studentId`
   - **Get All Students (Admin)**: `GET /admin/students`

8. **Monitor Logs**:
   Check the console output for logs to monitor the application's behavior and debug any issues.

By following these instructions, you should be able to set up and run the updated VIA-EDU-API project with the improvements mentioned above.
