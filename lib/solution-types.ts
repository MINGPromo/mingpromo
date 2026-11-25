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
  slug?: string | null;
  templateVariant?: string | null;
  detailTitleEn?: string | null;
  detailTitleId?: string | null;
  detailDescriptionEn?: string | null;
  detailDescriptionId?: string | null;
  detailBodyEn?: string | null;
  detailBodyId?: string | null;
  detailHeroImage?: string | null;
  heroPrimaryCtaLabelEn?: string | null;
  heroPrimaryCtaLabelId?: string | null;
  heroPrimaryCtaHref?: string | null;
  heroSecondaryCtaLabelEn?: string | null;
  heroSecondaryCtaLabelId?: string | null;
  heroSecondaryCtaHref?: string | null;
  valueBarTextEn?: string | null;
  valueBarTextId?: string | null;
  valueBarCtaLabelEn?: string | null;
  valueBarCtaLabelId?: string | null;
  valueBarCtaHref?: string | null;
  showcaseTitleEn?: string | null;
  showcaseTitleId?: string | null;
  showcaseDescriptionEn?: string | null;
  showcaseDescriptionId?: string | null;
  showcaseMediaUrl?: string | null;
  showcaseMediaType?: string | null;
  showcaseMetaTitleEn?: string | null;
  showcaseMetaTitleId?: string | null;
  showcaseMetaDescEn?: string | null;
  showcaseMetaDescId?: string | null;
  worksTitleEn?: string | null;
  worksTitleId?: string | null;
  worksDescriptionEn?: string | null;
  worksDescriptionId?: string | null;
  guidesTitleEn?: string | null;
  guidesTitleId?: string | null;
  guidesDescriptionEn?: string | null;
  guidesDescriptionId?: string | null;
  ctaImage?: string | null;
  ctaBadgeEn?: string | null;
  ctaBadgeId?: string | null;
  ctaTitleEn?: string | null;
  ctaTitleId?: string | null;
  ctaEmphasisEn?: string | null;
  ctaEmphasisId?: string | null;
  ctaDescriptionEn?: string | null;
  ctaDescriptionId?: string | null;
  ctaButtonLabelEn?: string | null;
  ctaButtonLabelId?: string | null;
  ctaButtonHref?: string | null;
  gallery?: SolutionProductGalleryInput[];
  features?: SolutionProductFeatureInput[];
  locations?: SolutionProductLocationInput[];
  caseStudies?: SolutionProductCaseStudyInput[];
  insights?: SolutionProductInsightInput[];
  faqCategories?: FaqCategoryInput[];
}

export interface SolutionProductGalleryInput { id?: string; imageUrl: string; altEn: string; altId: string; order?: number; }
export interface SolutionProductFeatureInput { id?: string; key: string; labelEn: string; labelId: string; titleEn: string; titleId: string; bodyEn: string; bodyId: string; cityTags?: string; order?: number; }
export interface SolutionProductLocationInput { id?: string; labelEn: string; labelId: string; order?: number; }
export interface SolutionProductCaseStudyInput { id?: string; clientName: string; titleEn: string; titleId: string; descriptionEn: string; descriptionId: string; imageUrl: string; href: string; order?: number; isActive: boolean; }
export interface SolutionInsightPostInput { id: string; title: string; slug: string; excerpt?: string | null; coverImage?: string | null; }
export interface SolutionProductInsightInput { id?: string; postId: string; order?: number; post?: SolutionInsightPostInput; }

export type FaqScope = "GLOBAL" | "SOLUTION" | "PRODUCT";

export interface FaqItemInput {
  id?: string;
  categoryId?: string;
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
  order?: number;
  isActive?: boolean;
}

export interface FaqCategoryInput {
  id?: string;
  scope?: FaqScope;
  solutionPageId?: string | null;
  productId?: string | null;
  key: string;
  labelEn: string;
  labelId: string;
  order?: number;
  items: FaqItemInput[];
}

export type SolutionFaqItemInput = FaqItemInput;
export type SolutionFaqCategoryInput = FaqCategoryInput;

export interface SolutionPageInput {
  id?: string;
  slug: string;
  badgeText: string;
  navLabelEn: string;
  navLabelId: string;
  overviewHeadlineEn: string;
  overviewHeadlineId: string;
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
  templateVariant?: string;
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
