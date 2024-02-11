export function createExpirationDate(): Date {
  return new Date((new Date().getTime()) + +process.env["SESSION_DURATION"]);
}