import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Expertise } from "@/components/expertise";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { VideoProfile } from "@/components/video-profile";
import { CoverageArea } from "@/components/coverage-area";
import { Testimonials } from "@/components/testimonials";
import { OurClients } from "@/components/our-clients";

import { prisma } from "@/lib/db";

export default async function Home() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  const clients = await prisma.client.findMany({ orderBy: { order: 'asc' } });
  const settings = await prisma.setting.findMany();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

  const videoId = getSetting("videoProfileId");
  const videoThumbnail = getSetting("videoProfileThumbnail");
  const heroBackground = getSetting("hero_background");

  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand selection:text-black">
      <Navbar />
      <Hero backgroundImage={heroBackground} />
      <About />
      <VideoProfile videoId={videoId} thumbnail={videoThumbnail} />
      <Services services={services} />
      <Expertise />
      <CoverageArea />
      <Testimonials testimonials={testimonials} />
      <OurClients clients={clients} />
      <Footer />
    </main>
  );
}
