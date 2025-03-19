FROM node:18.18.2 AS builder

WORKDIR /auth

COPY package.json ./

RUN npm install -g pnpm typescript

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production

WORKDIR /auth
# Install pnpm in the runtime image to ensure it's available for the migrate command
RUN npm install -g pnpm tsx
# RUN apt-get update && apt-get install -y wait-for-it


COPY --from=builder /auth/dist ./dist
COPY --from=builder /auth/package.json ./package.json
COPY --from=builder /auth/src ./src
COPY --from=builder /auth/drizzle ./drizzle
COPY --from=builder /auth/node_modules/ ./node_modules



# RUN npm install --only=production
RUN pnpm install

RUN pnpm add bcrypt --force
EXPOSE 8000

# Misalkan ada skrip migrasi yang perlu dijalankan saat kontainer mulai
CMD ["sh", "-c", "pnpm run migrate && node dist/src/server.js"]
