ALTER TABLE "SolutionPage" ADD COLUMN "overviewHeadlineEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionPage" ADD COLUMN "overviewHeadlineId" TEXT NOT NULL DEFAULT '';

ALTER TABLE "SolutionOverview" ADD COLUMN "heroPrimaryCtaLabelEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroPrimaryCtaLabelId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroPrimaryCtaHref" TEXT NOT NULL DEFAULT '#ecosystem';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroSecondaryCtaLabelEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroSecondaryCtaLabelId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroSecondaryCtaHref" TEXT NOT NULL DEFAULT '/#contact';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroSupportingLineEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "heroSupportingLineId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "layersEyebrowEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "layersEyebrowId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "layersTitleEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "layersTitleId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "layersDescriptionEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "layersDescriptionId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "ctaSecondaryButtonLabelEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "ctaSecondaryButtonLabelId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "ctaSecondaryButtonHref" TEXT NOT NULL DEFAULT '/#contact';
ALTER TABLE "SolutionOverview" ADD COLUMN "ctaReassuranceEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SolutionOverview" ADD COLUMN "ctaReassuranceId" TEXT NOT NULL DEFAULT '';

UPDATE "SolutionOverview"
SET
  "heroEyebrowEn" = '',
  "heroEyebrowId" = '',
  "heroTitleEn" = 'Our Advertising Solutions',
  "heroTitleId" = 'Solusi Periklanan Kami',
  "heroDescriptionEn" = 'From high-impact roadside billboards to premium mall LED screens, mobile advertising and real-world brand experiences, discover integrated OOH and DOOH solutions designed to connect your brand with audiences across Indonesia.',
  "heroDescriptionId" = 'Dari billboard roadside berdampak tinggi hingga layar LED premium di mal, periklanan bergerak, dan pengalaman brand di dunia nyata, temukan solusi OOH dan DOOH terintegrasi yang dirancang untuk menghubungkan brand Anda dengan audiens di seluruh Indonesia.',
  "heroPrimaryCtaLabelEn" = 'Explore Our Solutions',
  "heroPrimaryCtaLabelId" = 'Jelajahi Solusi Kami',
  "heroPrimaryCtaHref" = '#ecosystem',
  "heroSecondaryCtaLabelEn" = 'Plan Your Campaign',
  "heroSecondaryCtaLabelId" = 'Rencanakan Kampanye Anda',
  "heroSecondaryCtaHref" = '/#contact',
  "heroSupportingLineEn" = 'Roadside · Indoor · Mobile · Experience · Intelligence',
  "heroSupportingLineId" = 'Roadside · Indoor · Mobile · Experience · Intelligence',
  "introEyebrowEn" = 'What We Do',
  "introEyebrowId" = 'Yang Kami Lakukan',
  "introTitleEn" = 'Different Brands.\nDifferent Goals.\nOne Connected\nEcosystem.',
  "introTitleId" = 'Brand Berbeda.\nTujuan Berbeda.\nSatu Ekosistem\nTerhubung.',
  "introBodyEn" = 'Every campaign starts with a goal. Maybe you want more people to recognize your brand, introduce a new product, reach shoppers near retail destinations or create an experience people will remember.\n\nMING Promotion brings together five advertising ecosystems to help you find the right approach.\n\nFrom static and digital out-of-home advertising to mobile media, experiential marketing and audience insights, our solutions are designed to support different campaign objectives, locations and audience environments.\n\nExplore each solution to discover how your brand can connect with people beyond traditional advertising channels.',
  "introBodyId" = 'Setiap kampanye dimulai dengan sebuah tujuan. Mungkin Anda ingin lebih banyak orang mengenali brand Anda, memperkenalkan produk baru, menjangkau pengunjung di sekitar destinasi retail, atau menciptakan pengalaman yang akan mereka ingat.\n\nMING Promotion menyatukan lima ekosistem periklanan untuk membantu Anda menemukan pendekatan yang tepat.\n\nMulai dari periklanan luar ruang statis dan digital hingga media bergerak, experiential marketing, dan audience insight, solusi kami dirancang untuk mendukung beragam tujuan kampanye, lokasi, dan lingkungan audiens.\n\nJelajahi setiap solusi untuk menemukan cara brand Anda dapat terhubung dengan audiens melampaui kanal periklanan tradisional.',
  "layersEyebrowEn" = 'Explore Our Ecosystem',
  "layersEyebrowId" = 'Jelajahi Ekosistem Kami',
  "layersTitleEn" = 'Find the Right Way to Connect with Your Audience',
  "layersTitleId" = 'Temukan Cara Tepat untuk Terhubung dengan Audiens Anda',
  "layersDescriptionEn" = 'Your audience moves between different places and experiences every day. Discover five ways to bring your campaign into those moments.',
  "layersDescriptionId" = 'Audiens Anda berpindah di antara berbagai tempat dan pengalaman setiap hari. Temukan lima cara untuk menghadirkan kampanye Anda ke dalam momen-momen tersebut.',
  "ctaTitleEn" = 'Not Sure Which Solution Fits Your',
  "ctaTitleId" = 'Belum Yakin Solusi Mana yang Tepat untuk Kampanye',
  "ctaEmphasisEn" = 'Campaign?',
  "ctaEmphasisId" = 'Anda?',
  "ctaDescriptionEn" = 'You don''t need to know which advertising format to choose.\n\nTell us what you want to achieve, who you want to reach and where your campaign should run. We''ll help you explore suitable advertising solutions based on your objectives, preferred locations and budget.',
  "ctaDescriptionId" = 'Anda tidak perlu mengetahui format periklanan mana yang harus dipilih.\n\nCeritakan apa yang ingin Anda capai, siapa yang ingin Anda jangkau, dan di mana kampanye Anda akan berjalan. Kami akan membantu Anda mengeksplorasi solusi periklanan yang sesuai berdasarkan tujuan, lokasi pilihan, dan anggaran Anda.',
  "ctaButtonLabelEn" = 'Get My Free Plan & Quote',
  "ctaButtonLabelId" = 'Dapatkan Rencana & Penawaran Gratis',
  "ctaButtonHref" = '/#contact',
  "ctaSecondaryButtonLabelEn" = 'Talk to Our Team',
  "ctaSecondaryButtonLabelId" = 'Bicara dengan Tim Kami',
  "ctaSecondaryButtonHref" = '/#contact',
  "ctaReassuranceEn" = 'Free consultation · Tailored recommendations · One connected advertising ecosystem',
  "ctaReassuranceId" = 'Konsultasi gratis · Rekomendasi yang disesuaikan · Satu ekosistem periklanan terhubung',
  "seoTitleEn" = 'Our Advertising Solutions | MING Promotion',
  "seoTitleId" = 'Solusi Periklanan Kami | MING Promotion',
  "seoDescriptionEn" = 'Discover integrated OOH and DOOH advertising solutions from MING Promotion across Indonesia.',
  "seoDescriptionId" = 'Temukan solusi periklanan OOH dan DOOH terintegrasi dari MING Promotion di seluruh Indonesia.'
WHERE "id" = 'default';

UPDATE "SolutionOverview"
SET
  "introTitleEn" = replace("introTitleEn", '\n', char(10)),
  "introTitleId" = replace("introTitleId", '\n', char(10)),
  "introBodyEn" = replace("introBodyEn", '\n', char(10)),
  "introBodyId" = replace("introBodyId", '\n', char(10)),
  "ctaDescriptionEn" = replace("ctaDescriptionEn", '\n', char(10)),
  "ctaDescriptionId" = replace("ctaDescriptionId", '\n', char(10))
WHERE "id" = 'default';

UPDATE "SolutionPage" SET "overviewHeadlineEn" = 'Be Seen Where People Spend Time', "overviewHeadlineId" = 'Hadir di Tempat Audiens Menghabiskan Waktu', "order" = 1 WHERE "slug" = 'the-inside';
UPDATE "SolutionPage" SET "overviewHeadlineEn" = 'Put Your Brand Where the City Moves', "overviewHeadlineId" = 'Tempatkan Brand Anda di Jalur Pergerakan Kota', "order" = 2 WHERE "slug" = 'the-roadside';
UPDATE "SolutionPage" SET "overviewHeadlineEn" = 'Take Your Message Beyond Fixed Locations', "overviewHeadlineId" = 'Bawa Pesan Anda Melampaui Lokasi Tetap', "order" = 3 WHERE "slug" = 'the-movement';
UPDATE "SolutionPage" SET "overviewHeadlineEn" = 'Where Audiences Interact with Brands', "overviewHeadlineId" = 'Tempat Audiens Berinteraksi dengan Brand', "order" = 4 WHERE "slug" = 'the-experience';
UPDATE "SolutionPage" SET "overviewHeadlineEn" = 'Plan Smarter with Data and Insights', "overviewHeadlineId" = 'Rencanakan Lebih Cerdas dengan Data dan Insight', "order" = 5 WHERE "slug" = 'the-brain';

INSERT OR IGNORE INTO "Setting" ("key", "value", "description", "updatedAt") VALUES ('footer_career_url', '', 'Footer Career URL', CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO "Setting" ("key", "value", "description", "updatedAt") VALUES ('footer_sitemap_url', '', 'Footer Sitemap URL', CURRENT_TIMESTAMP);
