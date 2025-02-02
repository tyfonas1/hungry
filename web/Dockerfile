# 1. Use the official Node.js image as a base
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose the Next.js default port
EXPOSE 3000

# 8. Start the Next.js app
CMD ["npm", "run", "start"]
