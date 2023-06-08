import { PrismaClient } from '@prisma/client'

const client = globalThis.prisama || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisama = client;

export default client