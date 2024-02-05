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

-- AddForeignKey
ALTER TABLE "TextBeingDecrypted" ADD CONSTRAINT "TextBeingDecrypted_originalTextId_fkey" FOREIGN KEY ("originalTextId") REFERENCES "OriginalText"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
