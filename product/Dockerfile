FROM node:18.18.2 AS builder

WORKDIR /product

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

ENV PORT 8002
ENV NODE_ENV production

WORKDIR /product

COPY --from=builder /product/dist ./dist
COPY --from=builder /product/package.json ./package.json
COPY --from=builder /product/src ./src 
COPY --from=builder /product/drizzle.config.ts ./drizzle.config.ts  
COPY --from=builder /product/drizzle ./drizzle 



RUN npm install --only=production
RUN npm install -g pnpm typescript tsx drizzle-kit

EXPOSE 8002

CMD ["node", "dist/src/server.js"]