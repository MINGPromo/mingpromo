CREATE TABLE "SolutionPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "badgeText" TEXT NOT NULL,
    "navLabelEn" TEXT NOT NULL,
    "navLabelId" TEXT NOT NULL,
    "heroTitleEn" TEXT NOT NULL,
    "heroTitleId" TEXT NOT NULL,
    "heroDescriptionEn" TEXT NOT NULL,
    "heroDescriptionId" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "primaryCtaLabelEn" TEXT NOT NULL DEFAULT 'Explore Media',
    "primaryCtaLabelId" TEXT NOT NULL DEFAULT 'Jelajahi Media',
    "primaryCtaHref" TEXT NOT NULL DEFAULT '#products',
    "secondaryCtaLabelEn" TEXT NOT NULL DEFAULT 'Plan Your Campaign',
    "secondaryCtaLabelId" TEXT NOT NULL DEFAULT 'Rencanakan Kampanye',
    "secondaryCtaHref" TEXT NOT NULL DEFAULT '/#contact',
    "introEyebrowEn" TEXT NOT NULL DEFAULT 'Introduction',
    "introEyebrowId" TEXT NOT NULL DEFAULT 'Pengantar',
    "introTitleEn" TEXT NOT NULL,
    "introTitleId" TEXT NOT NULL,
    "introBodyEn" TEXT NOT NULL,
    "introBodyId" TEXT NOT NULL,
    "introImage" TEXT NOT NULL,
    "benefitsTitleEn" TEXT NOT NULL,
    "benefitsTitleId" TEXT NOT NULL,
    "benefitsDescriptionEn" TEXT NOT NULL,
    "benefitsDescriptionId" TEXT NOT NULL,
    "productsTitleEn" TEXT NOT NULL,
    "productsTitleId" TEXT NOT NULL,
    "productsDescriptionEn" TEXT NOT NULL,
    "productsDescriptionId" TEXT NOT NULL,
    "faqTitleEn" TEXT NOT NULL DEFAULT 'Frequently Asked Questions',
    "faqTitleId" TEXT NOT NULL DEFAULT 'Pertanyaan yang Sering Diajukan',
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
    "published" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "SolutionBenefit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "solutionPageId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "SolutionBenefit_solutionPageId_fkey" FOREIGN KEY ("solutionPageId") REFERENCES "SolutionPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "SolutionFilter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "solutionPageId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "SolutionFilter_solutionPageId_fkey" FOREIGN KEY ("solutionPageId") REFERENCES "SolutionPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "SolutionProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "solutionPageId" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageAltEn" TEXT NOT NULL,
    "imageAltId" TEXT NOT NULL,
    "tagLabelEn" TEXT NOT NULL,
    "tagLabelId" TEXT NOT NULL,
    "filterKeys" TEXT NOT NULL DEFAULT '',
    "href" TEXT NOT NULL DEFAULT '/#contact',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "SolutionProduct_solutionPageId_fkey" FOREIGN KEY ("solutionPageId") REFERENCES "SolutionPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "SolutionFaqCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "solutionPageId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "SolutionFaqCategory_solutionPageId_fkey" FOREIGN KEY ("solutionPageId") REFERENCES "SolutionPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "SolutionFaqItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "SolutionFaqItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SolutionFaqCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "ConnectionLayer" ADD COLUMN "solutionPageId" TEXT REFERENCES "SolutionPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE UNIQUE INDEX "SolutionPage_slug_key" ON "SolutionPage"("slug");
CREATE UNIQUE INDEX "SolutionFilter_solutionPageId_key_key" ON "SolutionFilter"("solutionPageId", "key");
CREATE UNIQUE INDEX "SolutionFaqCategory_solutionPageId_key_key" ON "SolutionFaqCategory"("solutionPageId", "key");
CREATE UNIQUE INDEX "ConnectionLayer_solutionPageId_key" ON "ConnectionLayer"("solutionPageId");
