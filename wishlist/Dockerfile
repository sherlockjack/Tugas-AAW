FROM node:18.18.2 AS builder

WORKDIR /wishlist

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

ENV PORT 8004
ENV NODE_ENV production

WORKDIR /wishlist

COPY --from=builder /wishlist/dist ./dist
COPY --from=builder /wishlist/package.json ./package.json
COPY --from=builder /wishlist/src ./src 
COPY --from=builder /wishlist/drizzle.config.ts ./drizzle.config.ts  
COPY --from=builder /wishlist/drizzle ./drizzle 

RUN npm install --only=production
RUN npm install -g pnpm typescript tsx drizzle-kit


EXPOSE 8004

CMD ["node", "dist/src/server.js"]