# LingoPersona 🌍

An AI-powered language learning platform that creates personalized language tutors for immersive learning experiences.

## Project Status 🚀

The project structure has been set up with the following components:

### Frontend (/frontend)
- React/Next.js components for user interface
- TailwindCSS for styling
- Core pages: Home, Tutor Customization, Learning Modules
- Component tests with Jest

### Backend (/backend)
- Node.js/Express server
- PostgreSQL database with Sequelize ORM
- Authentication endpoints
- Tutor management API
- API tests with Mocha/Chai

### AI Integration (/AI)
- Python-based NLP services
- Speech-to-text and text-to-speech capabilities
- Conversation management
- Unit tests for AI components

## Getting Started 🏁

### Prerequisites
- Node.js >= 18
- Python >= 3.9
- PostgreSQL >= 14

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ark1122/LingoPersona.git
cd LingoPersona
```

2. Set up the frontend:
```bash
cd frontend
npm install
cp .env.example .env.local
# Configure your environment variables
npm run dev
```

3. Set up the backend:
```bash
cd ../backend
npm install
cp .env.example .env
# Configure your database and JWT settings
npm run migrate
npm run dev
```

4. Set up the AI service:
```bash
cd ../AI
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python run.py
```

## Development 💻

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# AI service tests
cd AI
python -m pytest
```

### Code Style
- Frontend: ESLint + Prettier
- Backend: ESLint
- AI: Black + isort

## Deployment 🚀

### Using Docker
```bash
docker-compose up -d
```

### Manual Deployment

1. Frontend (Vercel):
- Connect your GitHub repository
- Configure build settings
- Deploy

2. Backend (AWS):
- Configure environment variables
- Set up database connection
- Deploy using Elastic Beanstalk

3. Database:
- Set up PostgreSQL on AWS RDS
- Configure security groups
- Update connection strings

## Contributing 🤝

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## Architecture 🏗️

### Frontend Architecture
- Next.js for server-side rendering
- React components with hooks
- TailwindCSS for styling
- React Query for state management
- WebSocket for real-time chat

### Backend Architecture
- Express.js REST API
- JWT authentication
- Sequelize ORM
- WebSocket server
- Rate limiting and security middleware

### AI Service Architecture
- Flask API
- GPT integration for conversations
- Custom NLP models for language assessment
- Speech processing services

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💪

For support:
- Create an issue in the repository
- Email: support@lingopersona.com
- Join our Discord community