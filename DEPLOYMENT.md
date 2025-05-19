# Deployment Instructions

## Deploying to Vercel

### Option 1: Using the Vercel Dashboard (Recommended)

1. Create a Vercel account at https://vercel.com if you don't have one
2. Push your project to a GitHub, GitLab, or Bitbucket repository
3. Log in to your Vercel dashboard
4. Click "New Project"
5. Import your repository
6. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
7. Click "Deploy"

### Option 2: Using the Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to configure and deploy your project.

## Deploying to Netlify

### Option 1: Using the Netlify Dashboard

1. Create a Netlify account at https://netlify.com if you don't have one
2. Push your project to a GitHub, GitLab, or Bitbucket repository
3. Log in to your Netlify dashboard
4. Click "New site from Git"
5. Select your repository
6. Configure the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
7. Click "Deploy site"

### Option 2: Using the Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site:
   ```bash
   netlify init
   ```

4. Follow the prompts to configure and deploy your project.

## Important Note about Routing

This application uses React Router for client-side routing. For proper routing to work in production, your hosting provider needs to redirect all requests to `index.html`.

The included `vercel.json` file handles this configuration for Vercel. For Netlify, create a `netlify.toml` file or a `_redirects` file in the public directory with the following content:

For `_redirects`:
```
/* /index.html 200
```

For `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```