import { env as validEnv } from '../../env.js';

export function createExpirationDate(): Date {
  return new Date(Date.now() + validEnv.SESSION_DURATION);
}