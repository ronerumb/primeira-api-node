-- CreateTable
CREATE TABLE "UserClientFiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "file" TEXT NOT NULL,
    "description" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "userClientId" TEXT NOT NULL,

    CONSTRAINT "UserClientFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserClientFiles" ADD CONSTRAINT "UserClientFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClientFiles" ADD CONSTRAINT "UserClientFiles_userClientId_fkey" FOREIGN KEY ("userClientId") REFERENCES "UserClient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
