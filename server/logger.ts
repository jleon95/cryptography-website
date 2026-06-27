import { pino, Bindings } from "pino";

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
    bindings: (_bindings: Bindings) => {
      return {};
    }
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: null
});

export default logger;