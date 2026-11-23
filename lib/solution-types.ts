export interface SolutionBenefitInput {
  id?: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
}

export interface SolutionFilterInput {
  id?: string;
  key: string;
  labelEn: string;
  labelId: string;
}

export interface SolutionProductInput {
  id?: string;
  nameEn: string;
  nameId: string;
  imageUrl: string;
  imageAltEn: string;
  imageAltId: string;
  tagLabelEn: string;
  tagLabelId: string;
  filterKeys: string;
  href: string;
  isActive: boolean;
}

export interface SolutionFaqItemInput {
  id?: string;
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
}

export interface SolutionFaqCategoryInput {
  id?: string;
  key: string;
  labelEn: string;
  labelId: string;
  items: SolutionFaqItemInput[];
}

export interface SolutionPageInput {
  id?: string;
  slug: string;
  badgeText: string;
  navLabelEn: string;
  navLabelId: string;
  heroTitleEn: string;
  heroTitleId: string;
  heroDescriptionEn: string;
  heroDescriptionId: string;
  heroImage: string;
  primaryCtaLabelEn: string;
  primaryCtaLabelId: string;
  primaryCtaHref: string;
  secondaryCtaLabelEn: string;
  secondaryCtaLabelId: string;
  secondaryCtaHref: string;
  introEyebrowEn: string;
  introEyebrowId: string;
  introTitleEn: string;
  introTitleId: string;
  introBodyEn: string;
  introBodyId: string;
  introImage: string;
  benefitsTitleEn: string;
  benefitsTitleId: string;
  benefitsDescriptionEn: string;
  benefitsDescriptionId: string;
  productsTitleEn: string;
  productsTitleId: string;
  productsDescriptionEn: string;
  productsDescriptionId: string;
  faqTitleEn: string;
  faqTitleId: string;
  ctaTitleEn: string;
  ctaTitleId: string;
  ctaEmphasisEn: string;
  ctaEmphasisId: string;
  ctaDescriptionEn: string;
  ctaDescriptionId: string;
  ctaButtonLabelEn: string;
  ctaButtonLabelId: string;
  ctaButtonHref: string;
  seoTitleEn: string;
  seoTitleId: string;
  seoDescriptionEn: string;
  seoDescriptionId: string;
  published: boolean;
  order: number;
  benefits: SolutionBenefitInput[];
  filters: SolutionFilterInput[];
  products: SolutionProductInput[];
  faqCategories: SolutionFaqCategoryInput[];
}

export interface SolutionNavLink {
  slug: string;
  badgeText: string;
  navLabelEn: string;
  navLabelId: string;
}
