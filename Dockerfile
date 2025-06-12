# Step 1: Build React app
FROM node:18-alpine as build
WORKDIR /app

# Install dependencies early (cached unless package*.json changes)
COPY package*.json ./
RUN npm install

# Copy rest of the app and build
COPY . .
RUN npm run build

# Step 2: Serve with NGINX and reverse proxy
FROM nginx:alpine

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX config with cache control headers
COPY nginx.conf /etc/nginx/conf.d/default.conf
