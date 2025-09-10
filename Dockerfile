# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code
COPY index.ts ./

# Build the TypeScript code
RUN npm run build

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# The container will be run by cron, so no CMD needed
# The cron job should run: docker run --rm --env-file .env <image-name> node dist/index.js