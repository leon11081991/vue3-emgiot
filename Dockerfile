# Use Node.js LTS Alpine as the base image
FROM node:lts-alpine

# Install simple http server for serving static content
RUN npm install -g http-server

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the working directory
COPY . .

# Copy .env.dev to .env in the container
COPY .env.dev .env

# Build app for production with minification
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the http-server
CMD [ "http-server", "dist" ]
