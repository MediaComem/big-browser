const developmentEnvironment = 'development';
const productionEnvironment = 'production';

export const environment = process.env['NODE_ENV'] ?? 'development';

export function isDevelopment(): boolean {
  return environment === developmentEnvironment;
}

export function isProduction(): boolean {
  return environment === productionEnvironment;
}

export const databasePrefix = process.env['BIG_BROWSER_DATABASE_PREFIX'] ?? 'big-browser';

export const databaseUrl =
  process.env['BIG_BROWSER_DATABASE_URL'] ?? process.env['REDIS_URL'] ?? 'redis://localhost:6379/0';

export const memory = parseEnvInt('BIG_BROWSER_MEMORY', 0, 10_000) ?? 5;
export const port =
  parseEnvInt('BIG_BROWSER_PORT', 1, 65_535) ?? parseEnvInt('PORT', 1, 65_535) ?? 3000;

export const frontendProxyUrl =
  process.env['BIG_BROWSER_FRONTEND_PROXY'] ?? 'http://localhost:5173';

function parseEnvInt(name: string, min?: number, max?: number) {
  const value = process.env[name];
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  if (
    Number.isNaN(parsed) ||
    (min !== undefined && parsed < min) ||
    (max !== undefined && parsed > max)
  ) {
    throw new Error(
      `Value "${value}" of environment variable ${name} must be an integer${
        min !== undefined || max !== undefined
          ? ` between ${min ?? '-Infinity'} and ${max ?? 'Infinity'}`
          : ''
      }`
    );
  }

  return parsed;
}
