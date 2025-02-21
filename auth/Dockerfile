FROM node:18.18.2 AS builder

WORKDIR /auth

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production image
FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production

WORKDIR /auth

COPY --from=builder /auth/dist ./dist
COPY --from=builder /auth/package.json ./package.json
COPY --from=builder /auth/src ./src 
COPY --from=builder /auth/drizzle.config.ts ./drizzle.config.ts  
COPY --from=builder /auth/drizzle ./drizzle 

RUN npm install --only=production
RUN npm install -g pnpm typescript tsx drizzle-kit


EXPOSE 8000

CMD ["node", "dist/src/server.js"]