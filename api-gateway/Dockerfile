FROM nginx:alpine

# Install curl
RUN apk add --no-cache curl

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf