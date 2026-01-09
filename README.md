# Co-founder Candidate Search

A React application for searching and managing co-founder candidates with GraphQL integration and dark mode support.

## Features

- 🔍 Advanced candidate search with filters
- 📊 Paginated candidate table with sorting
- 🌙 Dark/Light theme toggle
- 📱 Responsive design
- 🚀 GraphQL integration with Apollo Client
- ☁️ Backend deployed on Koyeb

## Tech Stack

- **Frontend**: React 19.2.3
- **GraphQL Client**: Apollo Client 3.14.0
- **Styling**: CSS with dark mode support
- **Backend**: GraphQL API (deployed on Koyeb)

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Access to the GraphQL backend API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your API endpoint in `.env`:
```env
REACT_APP_GRAPHQL_URI=https://your-koyeb-app.koyeb.app/graphql
```

## Environment Configuration

### Environment Files

- **`.env`** - Production/default configuration
- **`.env.local`** - Local development overrides (not tracked in git)
- **`.env.example`** - Template file with all required variables

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_GRAPHQL_URI` | GraphQL API endpoint | `https://your-app.koyeb.app/graphql` |

### Development vs Production

**For Local Development:**
Create `.env.local` with:
```env
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
```

**For Production:**
Update `.env` with your Koyeb deployment URL:
```env
REACT_APP_GRAPHQL_URI=https://colossal-sailfish-standardhub-04bde32e.koyeb.app/graphql
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes and display lint errors in the console.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized bundles.

### `npm run eject`
**⚠️ One-way operation!** Ejects from Create React App for full configuration control.

## Project Structure

```
src/
├── components/           # React components
│   ├── CandidateModal.js    # Candidate details modal
│   ├── CandidateSearch.js   # Main search interface
│   ├── CandidateTable.js    # Results table
│   ├── FilterPanel.js       # Search filters
│   ├── Pagination.js        # Table pagination
│   └── ThemeToggle.js       # Dark/light mode toggle
├── config/
│   └── api.js           # API configuration
├── App.js               # Main application component
├── App.css              # Global styles
└── index.js             # Application entry point
```

## GraphQL Integration

The app uses Apollo Client for GraphQL operations:

- **Client Configuration**: Configured in `src/App.js`
- **Error Handling**: Includes comprehensive error policies
- **Authentication**: Ready for future auth implementation
- **Caching**: In-memory cache with Apollo Client

### API Configuration

The GraphQL client is configured with:
- Dynamic URI based on environment variables
- Error handling policies
- Future-ready authentication context
- CORS support for cross-origin requests

## Styling & Theming

- **CSS Variables**: Used for consistent theming
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach
- **Component Styles**: Each component has its own CSS file

## Development Workflow

1. **Start Development Server**:
```bash
npm start
```

2. **Environment Setup**:
   - Ensure `.env.local` points to your local backend
   - Verify GraphQL endpoint is accessible

3. **Testing Connection**:
   - Check browser console for GraphQL URI logs
   - Verify no CORS errors in network tab

## Deployment

### Frontend Deployment

1. **Build the application**:
```bash
npm run build
```

2. **Deploy the `build` folder** to your hosting service (Netlify, Vercel, etc.)

3. **Set environment variables** in your hosting platform:
```env
REACT_APP_GRAPHQL_URI=https://your-koyeb-app.koyeb.app/graphql
```

### Backend Requirements

Ensure your Koyeb backend:
- Accepts CORS requests from your frontend domain
- Has GraphQL endpoint accessible at `/graphql`
- Returns proper error responses

## Troubleshooting

### Common Issues

**Connection Refused Error**:
- Verify `REACT_APP_GRAPHQL_URI` is set correctly
- Restart development server after changing `.env`
- Check if backend is running and accessible

**CORS Errors**:
- Configure backend to allow requests from your frontend domain
- Add both `localhost:3000` and production domain to CORS whitelist

**Environment Variables Not Loading**:
- Ensure variables start with `REACT_APP_`
- Restart development server after changes
- Check `.env.local` doesn't override production values

### Debug Mode

The app includes debug logging for the GraphQL URI. Check browser console for:
```
GraphQL URI: https://your-app.koyeb.app/graphql
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review browser console for errors
- Verify backend API is accessible
- Ensure environment variables are properly configured
