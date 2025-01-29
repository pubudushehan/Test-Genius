# Test Genius

Test Genius is a comprehensive ICT education platform designed to help students prepare for their A/L examinations through interactive learning, real-time assessments, and personalized guidance.

## Features

- **Interactive Learning**: Engage with dynamic content and real-time feedback
- **Expert Guidance**: Learn from experienced ICT professionals
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **AI-Powered Chat**: Get instant help with your questions using Gemini AI
- **Quiz System**: Practice with comprehensive quiz modules
- **Responsive Design**: Seamless experience across all devices

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM
- Firebase

### Backend

- Node.js
- Express.js
- MongoDB
- Google Generative AI (Gemini)
- JWT Authentication
- Cloudinary (Image Storage)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/pubudushehan/test-genius.git
cd test-genius
```

2. Install frontend dependencies

```bash
cd Test-Genius-Frontend
npm install
```

3. Install backend dependencies

```bash
cd Test-Genius-Backend
npm install
```

4. Configure environment variables

Create `.env` files in both frontend and backend directories:

**Frontend `.env`:**

```bash
VITE_API_URL=http://localhost:5000
```

**Backend `.env`:**

```bash
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

5. Start Development Servers

Start the backend server:

```bash
cd Test-Genius-Backend
npm start
```

Start the frontend server:

```bash
cd Test-Genius-Frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173` to access the application.

## Contact

Pubudu Shehan - pubudushehankarunarathna@gmail.com

## License

This project is licensed under the ISC License.
