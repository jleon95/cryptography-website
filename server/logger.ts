import { Bindings } from "pino";

const pino = require("pino");

module.exports = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  bindings: (bindings: Bindings) => {
    return {};
  },
  base: undefined
});