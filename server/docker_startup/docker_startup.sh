npx prisma migrate deploy --schema=./src/prisma/schema.prisma
npm run db:seed:prod
npm run start