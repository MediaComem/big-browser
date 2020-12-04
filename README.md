# Big Browser

A demo application written with [nest.js](https://nestjs.com/) and
[Vue](https://vuejs.org/): a page that display your HTTP client's user agent
information.

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

* [Node.js](https://nodejs.org) 12+
  * [Installation](https://nodejs.org/en/download/package-manager/)
* [Redis](https://redis.io/) 4+
  * [Installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04)
    (step 1 is sufficient, optionally with step 2 if you want to make sure it
    works)

### Setup

* Clone the repository.
* Install dependencies:

  ```
  cd /path/to/repo
  npm ci
  ```
* Set up environment variables for [configuration](#configuration) if needed.

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

The following environment variables can be set to customize the application's behavior:

Variable                                    | Default value              | Description
:------------------------------------------ | :------------------------- | :----------------------------------------------------
`BIG_BROWSER_DATABASE_PREFIX`               | `big-browser`              | Base URL at which the application is deployed.
`BIG_BROWSER_DATABASE_URL` (or `REDIS_URL`) | `redis://localhost:6379/0` | Redis connection URL.
`BIG_BROWSER_MEMORY`                        | 5                          | Number of previously scanned user agents to remember.
`BIG_BROWSER_PORT` (or `PORT`)              | 3000                       | Port on which to listen to.
