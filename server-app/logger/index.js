const logger =  require("pino");
const dayjs =  require("dayjs");

const log = logger({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty'
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

module.exports = log
