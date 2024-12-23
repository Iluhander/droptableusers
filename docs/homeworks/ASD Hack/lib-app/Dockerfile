FROM node:22-slim

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build:prod

EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "serve"]
