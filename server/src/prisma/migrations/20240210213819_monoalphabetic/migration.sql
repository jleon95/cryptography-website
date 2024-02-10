-- CreateTable
CREATE TABLE "OriginalText" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "OriginalText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonoalphabeticSession" (
    "sessionId" TEXT NOT NULL,
    "maxHints" INTEGER NOT NULL,
    "hintsUsed" INTEGER NOT NULL,
    "originalTextId" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "encryptionMapping" JSONB NOT NULL,

    CONSTRAINT "MonoalphabeticSession_pkey" PRIMARY KEY ("sessionId")
);

-- AddForeignKey
ALTER TABLE "MonoalphabeticSession" ADD CONSTRAINT "MonoalphabeticSession_originalTextId_fkey" FOREIGN KEY ("originalTextId") REFERENCES "OriginalText"("id") ON DELETE CASCADE ON UPDATE CASCADE;
