FROM node:20-alpine

WORKDIR /app

# Copy package files first to cache npm install
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

EXPOSE 5173

# Vite needs --host 0.0.0.0 to be accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
