ALTER TABLE "SolutionPage" ADD COLUMN "templateVariant" TEXT NOT NULL DEFAULT 'standard';

ALTER TABLE "SolutionProduct" ADD COLUMN "slug" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailTitleEn" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailTitleId" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailDescriptionEn" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailDescriptionId" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailBodyEn" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailBodyId" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "detailHeroImage" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "showcaseTitleEn" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "showcaseTitleId" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "showcaseDescriptionEn" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "showcaseDescriptionId" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "showcaseMediaUrl" TEXT;
ALTER TABLE "SolutionProduct" ADD COLUMN "showcaseMediaType" TEXT;

CREATE TABLE "SolutionOverview" (
  "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
  "heroEyebrowEn" TEXT NOT NULL DEFAULT 'OUR SOLUTION',
  "heroEyebrowId" TEXT NOT NULL DEFAULT 'SOLUSI KAMI',
  "heroTitleEn" TEXT NOT NULL DEFAULT 'OUR SOLUTION',
  "heroTitleId" TEXT NOT NULL DEFAULT 'SOLUSI KAMI',
  "heroDescriptionEn" TEXT NOT NULL,
  "heroDescriptionId" TEXT NOT NULL,
  "heroImage" TEXT NOT NULL,
  "introEyebrowEn" TEXT NOT NULL DEFAULT 'ECOSYSTEM',
  "introEyebrowId" TEXT NOT NULL DEFAULT 'EKOSISTEM',
  "introTitleEn" TEXT NOT NULL,
  "introTitleId" TEXT NOT NULL,
  "introBodyEn" TEXT NOT NULL,
  "introBodyId" TEXT NOT NULL,
  "ctaTitleEn" TEXT NOT NULL,
  "ctaTitleId" TEXT NOT NULL,
  "ctaEmphasisEn" TEXT NOT NULL,
  "ctaEmphasisId" TEXT NOT NULL,
  "ctaDescriptionEn" TEXT NOT NULL,
  "ctaDescriptionId" TEXT NOT NULL,
  "ctaButtonLabelEn" TEXT NOT NULL DEFAULT 'Request a Proposal',
  "ctaButtonLabelId" TEXT NOT NULL DEFAULT 'Minta Proposal',
  "ctaButtonHref" TEXT NOT NULL DEFAULT '/#contact',
  "seoTitleEn" TEXT NOT NULL,
  "seoTitleId" TEXT NOT NULL,
  "seoDescriptionEn" TEXT NOT NULL,
  "seoDescriptionId" TEXT NOT NULL,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "SolutionProductGallery" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "altEn" TEXT NOT NULL,
  "altId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "SolutionProductGallery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SolutionProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "SolutionProductFeature" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "labelEn" TEXT NOT NULL,
  "labelId" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleId" TEXT NOT NULL,
  "bodyEn" TEXT NOT NULL,
  "bodyId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "SolutionProductFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SolutionProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "SolutionProductLocation" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "labelEn" TEXT NOT NULL,
  "labelId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "SolutionProductLocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SolutionProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "SolutionProductCaseStudy" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "clientName" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleId" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "descriptionId" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "href" TEXT NOT NULL DEFAULT '/#contact',
  "order" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "SolutionProductCaseStudy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SolutionProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "SolutionProductInsight" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "postId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "SolutionProductInsight_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SolutionProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "SolutionProductInsight_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "SolutionProduct_solutionPageId_slug_key" ON "SolutionProduct"("solutionPageId", "slug");
