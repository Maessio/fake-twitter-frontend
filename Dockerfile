
# Build da aplicação Angular
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/fake-twitter-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf