-- CreateTable
CREATE TABLE "Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    CONSTRAINT "Vote_linkid_fkey" FOREIGN KEY ("linkid") REFERENCES "Link" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_linkid_userid_key" ON "Vote"("linkid", "userid");
