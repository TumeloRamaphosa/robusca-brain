FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build
RUN npx vite build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/server ./server
RUN npm install --omit=dev
ENV NODE_ENV=production
ENV PORT=5181
EXPOSE 5180 5181
CMD ["node", "dist/server.js"]
