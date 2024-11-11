# Use Node.js LTS Alpine as the base image
FROM node:lts-alpine

ARG ENVIRONMENT

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the working directory
COPY . .

# Copy .env.{ENVIRONMENT} to .env in the container
COPY .env.${ENVIRONMENT} .env

# Build app for production with minification
RUN npm run build

# Use an appropriate base image for serving the application
FROM nginx:stable-alpine AS production-stage

# Copy build output to nginx HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
