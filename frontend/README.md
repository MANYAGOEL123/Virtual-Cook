# Virtual Cook Frontend

A modern React TypeScript application for the Virtual Cook recipe sharing platform. This frontend provides a complete user interface for browsing recipes, managing ingredients, sharing videos, and interacting with the cooking community.

## Features

### 🍳 Core Features
- **Recipe Discovery**: Browse and search through community recipes
- **Recipe Details**: View complete recipes with nutritional information, ingredients, and step-by-step instructions
- **Recipe Creation**: Create and share your own recipes with the community
- **Video Integration**: Watch recipe videos and upload your own cooking demonstrations
- **Pantry Management**: Track your available ingredients and get personalized recipe recommendations
- **Social Features**: Like, comment, and save recipes

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Updates**: Instant feedback with toast notifications
- **User Authentication**: Secure login and registration system
- **Profile Management**: Customize your profile and track your cooking journey

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Notifications**: React Toastify
- **State Management**: React Context API

## Prerequisites

Before running the frontend, make sure you have:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Backend Server** running on `http://localhost:5000`

## Installation & Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and visit `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/         # Navigation and layout components
│   │   └── UI/             # Basic UI components
│   ├── contexts/           # React Context providers
│   ├── pages/              # Main application pages
│   ├── services/           # API service layer
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and Tailwind config
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## Key Components

### Pages
- **Home**: Recipe discovery and search
- **Login/Register**: User authentication
- **RecipeDetail**: Complete recipe view with comments and videos
- **CreateRecipe**: Recipe creation form
- **Pantry**: Ingredient management and recipe recommendations
- **Profile**: User profile and account management
- **Videos**: Video browsing and upload functionality

### Services
- **API Layer**: Centralized HTTP client with authentication
- **Auth Context**: User authentication state management
- **Type Definitions**: Comprehensive TypeScript interfaces

## Configuration

### Environment Variables
Create a `.env` file in the frontend directory if you need to customize the backend URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Tailwind Configuration
The app uses a custom Tailwind theme with primary colors. You can modify the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom color palette
      }
    }
  }
}
```

## Features Overview

### 🏠 Home Page
- Browse featured recipes
- Search recipes by name, cuisine, or ingredients
- Quick access to create recipes, manage pantry, and view videos
- Responsive recipe grid with filtering

### 🍽️ Recipe Management
- **Create Recipes**: Rich form with ingredients, instructions, nutritional info
- **View Recipes**: Detailed view with cooking times, servings, and nutritional breakdown
- **Social Features**: Like, comment, and save favorite recipes
- **Video Integration**: Embedded recipe videos with playback controls

### 🥘 Smart Pantry
- **Ingredient Tracking**: Add, edit, and remove pantry items
- **Smart Recommendations**: Get recipe suggestions based on available ingredients
- **Expiration Tracking**: Monitor ingredient freshness
- **Quantity Management**: Track ingredient quantities and units

### 🎥 Video Platform
- **Video Gallery**: Browse community cooking videos
- **Video Upload**: Share your own cooking demonstrations
- **Playback Features**: Full video controls with duration and view counts
- **Recipe Integration**: Videos linked to specific recipes

### 👤 User Profiles
- **Profile Management**: Update personal information and avatar
- **Activity Tracking**: View saved recipes and cooking statistics
- **Account Settings**: Manage account preferences and security

## API Integration

The frontend communicates with the backend through a comprehensive API service layer:

### Authentication
- User registration and login
- JWT token management
- Protected route handling

### Recipe Operations
- CRUD operations for recipes
- Recipe search and filtering
- Nutritional information management

### Video Management
- Video upload with progress tracking
- Video streaming and playback
- Video metadata management

### Social Features
- Like/unlike functionality
- Comment system
- User interactions

## Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Collapsible navigation menu
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized mobile forms

## Development

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build production bundle
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App (not recommended)

### Code Style

The project follows React and TypeScript best practices:
- Functional components with hooks
- TypeScript strict mode
- ESLint and Prettier configuration
- Component composition patterns

## Backend Integration

This frontend is designed to work with the Virtual Cook backend API. Make sure your backend is running and accessible at `http://localhost:5000`.

### Required Backend Endpoints

The frontend expects the following API endpoints:
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/recipes` - Fetch recipes
- `POST /api/recipes` - Create recipe
- `GET /api/videos` - Fetch videos
- `POST /api/videos/upload` - Upload video
- And more...

## Troubleshooting

### Common Issues

1. **Backend Connection**: Ensure backend is running on port 5000
2. **CORS Issues**: Check backend CORS configuration
3. **Authentication**: Verify JWT token handling
4. **File Uploads**: Check file size limits for video uploads

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

Potential features for future development:
- Real-time notifications
- Advanced recipe filtering
- Meal planning functionality
- Social networking features
- Mobile app development
- Offline recipe access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Virtual Cook platform. Please respect the license terms.

---

**Happy Cooking! 🍳**

For questions or support, please refer to the documentation or contact the development team.
