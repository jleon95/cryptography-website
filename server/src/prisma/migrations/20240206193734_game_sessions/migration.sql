-- CreateTable
CREATE TABLE "OriginalText" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "OriginalText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextBeingDecrypted" (
    "id" SERIAL NOT NULL,
    "originalTextId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "encryptionMapping" JSONB NOT NULL,

    CONSTRAINT "TextBeingDecrypted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextBeingDecrypted_sessionId_key" ON "TextBeingDecrypted"("sessionId");

-- AddForeignKey
ALTER TABLE "TextBeingDecrypted" ADD CONSTRAINT "TextBeingDecrypted_originalTextId_fkey" FOREIGN KEY ("originalTextId") REFERENCES "OriginalText"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextBeingDecrypted" ADD CONSTRAINT "TextBeingDecrypted_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
