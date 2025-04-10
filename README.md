# API Documentation Site Setup Guide

This guide will help you set up the API Documentation site for your ecommerce backend API.

## Overview

This project is a React-based documentation site with these key features:

- **Comprehensive Documentation**: Clear, detailed documentation for all your API endpoints
- **API Sandbox**: Interactive testing environment for developers to try API calls
- **Multi-Version Support**: Ability to switch between your three API implementations (Golang, Node.js, NestJS)
- **Responsive Design**: Works well on desktop and mobile devices

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn

## Installation

1. Create a new React application:

```bash
npx create-react-app ecommerce-api-docs
cd ecommerce-api-docs
```

2. Install required dependencies:

```bash
npm install react-router-dom react-syntax-highlighter react-json-tree
```

3. Replace the default files with the ones provided in this documentation.

## Project Structure

```
ecommerce-api-docs/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ApiDocumentation.tsx
│   │   ├── ApiSandbox.tsx
│   │   └── Home.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Configuration

### API Data

The API documentation is driven by data defined in `App.tsx`. To customize it for your actual API:

1. Update the `apiVersions` array with the correct base URLs for each implementation
2. Modify the `apiEndpoints` array to accurately reflect your API's structure
3. For each endpoint, ensure the parameters, request examples, and response examples match your actual API

Example for adding a new endpoint:

```typescript
{
  method: 'GET',
  path: '/categories',
  description: 'Get all product categories',
  parameters: [
    { name: 'active', type: 'query', dataType: 'boolean', description: 'Filter by active status', required: false },
  ],
  responses: [
    { status: 200, description: 'Success', example: '{ "data": [ { "id": "c1", "name": "Electronics", "active": true } ] }' },
    { status: 400, description: 'Bad Request', example: '{ "error": "Invalid query parameters" }' },
  ]
}
```

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `build` directory that you can deploy to any static hosting service.

## Deployment Options

### Option 1: Static Hosting

Since this is a React SPA, you can deploy it to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Firebase Hosting

### Option 2: Self-Hosted

You can also serve the documentation alongside your API:

- **For Golang**: Serve the static files using the `net/http` package
- **For Node.js/NestJS**: Serve the static files using Express.js

Example for Express.js:

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve API endpoints
app.use('/api', apiRouter);

// Serve documentation site
app.use(express.static(path.join(__dirname, 'docs')));

// Return the documentation for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Customization

### Styling

The application uses CSS variables for theming. To customize the look and feel, modify the variables in `App.css`:

```css
:root {
  --primary-color: #3f51b5;  /* Change to your brand color */
  --secondary-color: #ff4081;
  --dark-color: #1a237e;
  /* ... other variables ... */
}
```

### Adding Authentication

If your API requires authentication, you can modify the `ApiSandbox` component to include authentication options:

1. Add authentication fields to the UI
2. Update the request function to include authentication headers

## Extending the Documentation

### Adding OpenAPI/Swagger Support

You can enhance this documentation by importing OpenAPI/Swagger specifications:

1. Add a new component that parses and displays OpenAPI specs
2. Provide an option to import specifications directly

### Adding Code Generation

To help developers even more, you could add code generation features:

1. Create templates for common programming languages
2. Add a button to generate client code based on the selected endpoint

## Maintenance

Keep your documentation in sync with your API by:

1. Updating the endpoint data whenever you make changes to your API
2. Adding new sections for new features
3. Marking deprecated endpoints

## Troubleshooting

If you encounter issues:

- Check browser console for errors
- Verify that the React Router paths match your navigation
- Ensure all dependencies are correctly installed