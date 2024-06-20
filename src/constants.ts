import { join as joinPath } from 'node:path';

export const root = joinPath(import.meta.dirname);
export const publicDir = joinPath(root, 'public');
