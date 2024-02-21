npx prisma migrate deploy --schema=./src/prisma/schema.prisma
npx prisma db seed
npm run start