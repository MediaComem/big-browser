export const databasePrefix = process.env.BIG_BROWSER_DATABASE_PREFIX || 'big-browser';
export const databaseUrl = process.env.BIG_BROWSER_DATABASE_URL || process.env.REDIS_URL || 'redis://localhost:6379/0';
export const memory = parseEnvInt('BIG_BROWSER_MEMORY', 0, 10000) || 2;
export const port = process.env.BIG_BROWSER_PORT || 3000;

function parseEnvInt(name: string, min?: number, max?: number) {

  const value = process.env[name];
  if (value === undefined) {
    return;
  }

  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || (min !== undefined && parsed < min) || (max !== undefined && parsed > max)) {
    throw new Error(`Value "${value}" of environment variable ${name} must be an integer${
      min !== undefined || max !== undefined ? ` between ${min || '-Infinity'} and ${max || 'Infinity'}` : ''
    }`);
  }

  return parsed;
}
