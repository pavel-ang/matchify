# Step 1: Build React app
FROM node:24-alpine3.20 as builder
WORKDIR /app

COPY . .
RUN npm i && npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
