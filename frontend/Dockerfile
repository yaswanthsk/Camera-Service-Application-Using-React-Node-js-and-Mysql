# STEP 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy only the frontend files
COPY frontend/package*.json ./
COPY frontend/ ./

RUN npm install
RUN npm run build

# STEP 2: Serve using Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
