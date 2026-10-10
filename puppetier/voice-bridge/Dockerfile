FROM node:22-alpine
WORKDIR /app
RUN npm install ws@8
COPY server.js package.json ./
EXPOSE 8765
CMD ["node", "server.js"]
