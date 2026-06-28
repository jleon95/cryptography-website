import { PrismaClient } from '@prisma/client';
import { env as validEnv } from '../env.js';

declare global {
  namespace NodeJS {
    interface Global { }
  }
}

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (validEnv.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;