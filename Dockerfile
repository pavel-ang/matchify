# Build phase
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve phase
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
