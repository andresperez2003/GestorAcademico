# Specify the image to build the container.
# This image is NodeJS based.
# More images at: https://hub.docker.com/_/node
# Change <version> with a nodejs valid version
# Use SemVer format: https://semver.org/
FROM node:20-alpine

# Create a temp folder before building
RUN mkdir /app_temp

# Set as main working directory
WORKDIR /app_temp

# Install pm2 and copyfiles globally
RUN npm install -g pm2 copyfiles

# Copy the package.json file to the container and
# install the dependencies
COPY package.json .
RUN npm install

# Copy the source code to the container
COPY . .

# Build the app
RUN npm run build

# Create the app folder
RUN mkdir /app

# Move the build to the app folder
RUN mv /app_temp/dist/ /app

# Set the app folder as the working directory
WORKDIR /app

# Install the dependencies
RUN npm install

# Remove the temp folder
RUN rm -rf /app_temp

# Expose the port that the app will use
# Change <port> with the port that the app will use
# Just documentation
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]