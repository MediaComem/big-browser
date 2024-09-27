# Builder image
# =============

FROM node:22.9.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm ci

COPY . .
RUN npm run build && \
    npm prune --production

# Production image
# ================

FROM node:22.9.0-alpine

ENV NODE_ENV=production \
    PORT=3000

LABEL org.opencontainers.image.authors="simon.oulevay@heig-vd.ch"

WORKDIR /app

RUN addgroup -S bigbrowser && \
    adduser -D -G bigbrowser -H -s /usr/bin/nologin -S bigbrowser && \
    chown bigbrowser:bigbrowser /app

USER bigbrowser:bigbrowser

COPY --chown=bigbrowser:bigbrowser --from=builder /app/dist/ /app/
COPY --chown=bigbrowser:bigbrowser --from=builder /app/node_modules/ /app/node_modules/

CMD ["node", "./main.js"]

EXPOSE 3000
