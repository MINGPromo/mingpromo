-- Baseline the landing CMS tables that pre-date the migration history.
-- IF NOT EXISTS keeps this migration safe for existing SQLite databases.
CREATE TABLE IF NOT EXISTS "LandingHero" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "tagline" TEXT NOT NULL DEFAULT 'INSIDE OUT OF HOME',
    "headlineEn" TEXT NOT NULL DEFAULT 'Connecting Brands with Audiences Since 1999.',
    "headlineId" TEXT NOT NULL DEFAULT 'Menghubungkan Brand dengan Audiens Sejak 1999.',
    "leadEn" TEXT NOT NULL DEFAULT 'The consumer journey is never confined to a single location. MING is here to bridge every touchpoint, ensuring your brand remains relevant, visible, and connected every step of the way.',
    "leadId" TEXT NOT NULL DEFAULT 'Perjalanan konsumen tidak pernah terbatas pada satu lokasi. MING hadir menjembatani setiap titik temu, memastikan brand Anda tetap relevan, terlihat, dan terhubung di setiap langkah.',
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "SiteMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "targetNumber" INTEGER NOT NULL,
    "suffix" TEXT NOT NULL,
    "formatComma" BOOLEAN NOT NULL DEFAULT false,
    "highlightEn" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "highlightId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "MarqueeTicker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productType" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "impressions" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "ConnectionLayer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tabKey" TEXT NOT NULL,
    "badgeText" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "ConnectionLayer_tabKey_key" ON "ConnectionLayer"("tabKey");
