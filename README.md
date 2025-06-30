# Capstone Project: OpenRouter API Integration

This project demonstrates a simple integration with the OpenRouter API using `axios` in a Node.js application. The application allows users to send a question to the OpenRouter API and receive a response, which is processed and returned to the client.

## Features

- **Ask Endpoint**: Users can send a question via the `/ask` endpoint, and the application forwards the request to the OpenRouter API.
- **Response Processing**: The API response is processed using `marked` to format the text.
- **Environment Variables**: The API key is securely stored in a `.env` file.

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenRouter API key:

   ```env
   OP_API_KEY=your-api-key-here
   ```

4. Start the server:
   ```sh
   node index.js
   ```

## Usage

1. Navigate to `http://localhost:3000` in your browser.
2. Use the `/ask` endpoint to send a question:
   - Send a POST request with a JSON body containing the `question` field.
   - Example:
     ```json
     {
       "question": "What is the capital of France?"
     }
     ```

## Dependencies

- [Express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [Axios](https://www.npmjs.com/package/axios): HTTP client for making API requests.
- [dotenv](https://www.npmjs.com/package/dotenv): For managing environment variables.
- [Marked](https://www.npmjs.com/package/marked): For processing and formatting text.

## File Structure

- `index.js`: Main application file.
- `.env`: Environment variables file (not included in the repository).
- `public/`: Static files directory.

## API Details

- **OpenRouter API**: The application interacts with the OpenRouter API at `https://openrouter.ai/api/v1/completions`.
- **Authorization**: The API key is passed in the `Authorization` header.

## Example Response

When a question is sent to the `/ask` endpoint, the application returns a JSON response containing the formatted answer.

## License

This project is licensed under the MIT License.

![Home Page]("./images/image.png")
