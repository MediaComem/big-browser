# Big Browser

A demo application written with [NestJS](https://nestjs.com) and
[Vue](https://vuejs.org): a page that displays your HTTP client's user agent
information.

> Big browser is watching you.

[![build](https://github.com/MediaComem/big-browser/actions/workflows/build.yml/badge.svg)](https://github.com/MediaComem/big-browser/actions/workflows/build.yml)
[![e2e](https://github.com/MediaComem/big-browser/actions/workflows/e2e.yml/badge.svg)](https://github.com/MediaComem/big-browser/actions/workflows/e2e.yml)
[![license](https://img.shields.io/github/license/MediaComem/big-browser)](https://opensource.org/licenses/MIT)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Run in development mode](#run-in-development-mode)
  - [Run in production mode](#run-in-production-mode)
- [Configuration](#configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

### Requirements

- [Node.js](https://nodejs.org) 22.x
- [Redis](https://redis.io/) 5.x, 6.x or 7.x

### Setup

- Clone the repository and install dependencies:

  ```
  git clone https://github.com/mediacomem/big-browser
  cd big-browser
  npm ci
  ```

- Set up environment variables for [configuration](#configuration) if needed.

### Run in development mode

```
cd /path/to/application
npm start
```

### Build and run in production mode

```
cd /path/to/application
npm run build
npm run start:prod
```

## Configuration

The following environment variables can be set to customize the application's
behavior:

| Variable                                    | Default value              | Description                                                    |
| :------------------------------------------ | :------------------------- | :------------------------------------------------------------- |
| `BIG_BROWSER_DATABASE_PREFIX`               | `big-browser`              | Base URL at which the application is deployed.                 |
| `BIG_BROWSER_DATABASE_URL` (or `REDIS_URL`) | `redis://localhost:6379/0` | Redis connection URL.                                          |
| `BIG_BROWSER_FRONTEND_URL`                  | `http://localhost:5173`    | URL to which frontend requests are proxied during development. |
| `BIG_BROWSER_MEMORY`                        | 5                          | Number of previously scanned user agents to remember.          |
| `BIG_BROWSER_PORT` (or `PORT`)              | 3000                       | Port on which to listen to.                                    |
