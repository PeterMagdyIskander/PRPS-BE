# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the .env file is included in the image
COPY .env.docker .env.docker

# Expose the port specified in the .env file (optional, for clarity)
EXPOSE ${PORT}

# Command to run the app, loading environment variables from the .env file
CMD ["npm", "run", "start:docker"]