const pino = require("pino");

module.exports = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  bindings: (bindings) => {
    return {};
  },
  base: undefined
});