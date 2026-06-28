import { env as validEnv } from '../../env.js';

export function createExpirationDate(): Date {
  return new Date((new Date().getTime()) + validEnv.SESSION_DURATION);
}