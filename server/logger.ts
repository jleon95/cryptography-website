import { type Bindings, pino } from "pino";
import { env as validEnv } from "./src/env.js";

const logger = pino({
  level: validEnv.PINO_LOG_LEVEL || "info",
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
    bindings: (_bindings: Bindings) => {
      return {};
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: null,
});

export default logger;