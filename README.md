# Business Process Parser

A web application that parses business process diagrams from screenshots and visualizes them interactively. The application uses Claude 3.7 API for image recognition and analysis.

## Features

- Upload business process diagram screenshots
- Parse diagrams using Claude 3.7 API
- Convert parsed data to JSON format
- Visualize business processes as interactive diagrams
- Compare original images with parsed visualizations

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- React Flow (for diagram visualization)
- Axios (for API requests)
- React Dropzone (for file uploads)

### Backend
- Node.js
- Express
- TypeScript
- Multer (for file handling)
- Claude 3.7 API (for image analysis)

## Project Structure

```
business_process/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
└── README.md               # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Claude API key

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your Claude API key:
   ```
   PORT=5000
   NODE_ENV=development
   CLAUDE_API_KEY=your_claude_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload a screenshot of a business process diagram
2. Wait for the system to process and parse the image
3. View the interactive visualization of the parsed business process
4. Compare the visualization with the original image

## License

MIT 