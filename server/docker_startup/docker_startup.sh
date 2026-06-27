npx prisma migrate deploy --schema=./src/prisma/schema.prisma
node src/prisma/seed.js
node app