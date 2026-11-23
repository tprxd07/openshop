-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "bannerUrl" TEXT;
ALTER TABLE "Profile" ADD COLUMN "githubUsername" TEXT;

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "primaryColor" TEXT NOT NULL DEFAULT '#01875f',
    "density" TEXT NOT NULL DEFAULT 'comfortable',
    "animations" BOOLEAN NOT NULL DEFAULT true,
    "notifComments" BOOLEAN NOT NULL DEFAULT true,
    "notifDownloads" BOOLEAN NOT NULL DEFAULT true,
    "notifNewApps" BOOLEAN NOT NULL DEFAULT false,
    "notifEmail" BOOLEAN NOT NULL DEFAULT true,
    "profilePublic" BOOLEAN NOT NULL DEFAULT true,
    "showEmail" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "readme" TEXT,
    "repoUrl" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "releaseTag" TEXT,
    "releaseUrl" TEXT,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "githubRepoId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "description", "downloads", "id", "name", "ownerId", "readme", "releaseTag", "releaseUrl", "repoUrl", "slug", "updatedAt") SELECT "createdAt", "description", "downloads", "id", "name", "ownerId", "readme", "releaseTag", "releaseUrl", "repoUrl", "slug", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_ownerId_idx" ON "Project"("ownerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");
