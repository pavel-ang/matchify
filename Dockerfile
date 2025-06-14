# Step 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build the app
COPY . .
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
