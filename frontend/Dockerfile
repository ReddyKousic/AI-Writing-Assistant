# Use the official Nginx image
FROM nginx:alpine

# Copy the build files from the local build directory to the Nginx root directory
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
