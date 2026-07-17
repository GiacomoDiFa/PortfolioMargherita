# Stage 1: Build the Angular Application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files and build
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve the application using Nginx
FROM nginx:1.25-alpine

# Set default port for Cloud Run
ENV PORT=8080

# Copy the build output from Stage 1 to Nginx public folder
COPY --from=build /app/dist/angular21/browser /usr/share/nginx/html

# Copy the Nginx configuration template for dynamic port injection
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose port (documented, Cloud Run will override via PORT env var)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
