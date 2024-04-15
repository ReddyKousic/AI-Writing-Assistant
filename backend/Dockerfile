# Use the official Python image
FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY ./backend/requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the content of the local backend directory to the working directory
COPY ./backend .

# Command to run the Python application
CMD ["python", "main.py"]
