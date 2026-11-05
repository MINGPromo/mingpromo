import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { prisma } from "@/lib/db";

export async function Footer() {
    const settings = await prisma.setting.findMany();
    const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

    const socialYoutube = getSetting("social_youtube");
    const socialLinkedin = getSetting("social_linkedin");
    const socialInstagram = getSetting("social_instagram");

    const contactEmail = getSetting("contact_email") || "info@mingpromo.com";
    const contactPhone = getSetting("contact_phone") || "+62 859 2220 6600";
    const contactAddress = getSetting("contact_address") || "Jakarta, Indonesia";

    const footerLogo = getSetting("footer_logo") || "/logo-white.png";
    const brandDescription = getSetting("brand_description") || "PT Mitra Inovasi Gemilang. Established in 1999. Specializing in innovative OOH media solutions across Indonesia.";

    return (
        <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="relative h-8 w-32 block mb-6">
                            <Image
                                src={footerLogo}
                                alt="MING Promotion"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {brandDescription}
                        </p>
                        <div className="flex items-center gap-6 h-8 mt-4">
                            <div className="flex gap-4">
                                {socialInstagram && (
                                    <Link href={socialInstagram} className="text-gray-400 hover:text-brand transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                )}
                                {socialLinkedin && (
                                    <Link href={socialLinkedin} className="text-gray-400 hover:text-brand transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                )}
                                {socialYoutube && (
                                    <Link href={socialYoutube} className="text-gray-400 hover:text-brand transition-colors">
                                        <Youtube className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div> {/*jarak */} </div>

                    <div> {/*jarak */} </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <address className="not-italic text-sm text-gray-400 space-y-3">
                            <p>{contactAddress}</p>
                            <p>Email: <a href={`mailto:${contactEmail}`} className="hover:text-brand">{contactEmail}</a></p>
                            <p>Phone: {contactPhone}</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} PT Mitra Inovasi Gemilang. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}
