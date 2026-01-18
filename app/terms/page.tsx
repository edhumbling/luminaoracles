import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Lumina Oracles",
    description: "Terms of Service for Lumina Oracles spiritual guidance services. Read our comprehensive terms covering tarot readings, astrology consultations, energy healing, and manifestation coaching in Ghana.",
    openGraph: {
        title: "Terms of Service | Lumina Oracles",
        description: "Terms of Service for Lumina Oracles spiritual guidance services in Ghana.",
        type: "website",
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-background text-foreground pt-24 md:pt-32 pb-20 px-6 md:px-12 lg:px-24">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[400px] pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-lumina-gold/5 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lumina-gold/10 via-transparent to-transparent opacity-50" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-calligraffitti)] text-center text-lumina-gold mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    Terms of Service
                </h1>

                <p className="text-center text-foreground/60 mb-12 text-sm uppercase tracking-[0.3em]">
                    Last Updated: January 2026
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-lumina-gold prose-headings:font-[family-name:var(--font-calligraffitti)] prose-p:text-foreground/80 prose-li:text-foreground/80">

                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">Welcome to Lumina Oracles</h2>
                        <p className="leading-relaxed">
                            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo; &ldquo;Client,&rdquo; or &ldquo;you&rdquo;) and Lumina Oracles (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Company&rdquo;), operated by Mamaga Judith Etornam, a spiritual practitioner and mystic based in the Republic of Ghana. By accessing our website, engaging our services, or communicating with us through any channel, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.
                        </p>
                        <p className="leading-relaxed">
                            Lumina Oracles is dedicated to illuminating the path of spiritual seekers through divine guidance, ancestral wisdom, and mystical practices rooted in both African heritage and universal spiritual truths. Our services are offered with reverence for the sacred connection between the spiritual and material realms.
                        </p>
                    </section>

                    {/* Definitions */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">1. Definitions and Interpretations</h2>
                        <p className="leading-relaxed">For the purposes of these Terms, the following definitions shall apply:</p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">&ldquo;Spiritual Services&rdquo;</strong> encompasses all offerings provided by Lumina Oracles, including but not limited to tarot card readings, astrology consultations, zodiac interpretations, chakra healing and energy work, manifestation coaching, ancestral wisdom guidance, meditation instruction, and any other metaphysical or spiritual guidance services.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">&ldquo;Consultation&rdquo;</strong> refers to any session, whether conducted in person, via telephone, video call, WhatsApp, or any other communication medium, during which Spiritual Services are rendered.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">&ldquo;Content&rdquo;</strong> means all text, graphics, images, videos, audio recordings, spiritual readings, interpretations, advice, and any other materials provided through our website or during Consultations.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">&ldquo;User Account&rdquo;</strong> refers to any registration or profile created on our platform for accessing personalized services.
                            </li>
                        </ul>
                    </section>

                    {/* Eligibility */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">2. Eligibility and User Representations</h2>
                        <p className="leading-relaxed">By engaging with Lumina Oracles, you represent and warrant that:</p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                You are at least eighteen (18) years of age, or the age of legal majority in your jurisdiction, whichever is greater. Spiritual guidance services are intended exclusively for adults who possess the legal capacity to enter into binding agreements.
                            </li>
                            <li>
                                You possess the full legal authority and capacity to enter into these Terms and to fulfil your obligations hereunder, in accordance with the laws of the Republic of Ghana and your jurisdiction of residence.
                            </li>
                            <li>
                                You approach our services with genuine spiritual intent and not for purposes of fraud, deception, testing, or any activity that undermines the sacred nature of spiritual consultation.
                            </li>
                            <li>
                                You understand that spiritual guidance requires honest and open communication, and you agree to provide truthful information during all Consultations.
                            </li>
                            <li>
                                You acknowledge that you are mentally and emotionally prepared to receive spiritual insights, which may sometimes reveal challenging truths or require personal reflection.
                            </li>
                        </ul>
                    </section>

                    {/* Nature of Services */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">3. Nature of Spiritual Services</h2>
                        <p className="leading-relaxed">
                            The services provided by Lumina Oracles are spiritual in nature and are designed to offer guidance, insight, and support for your personal growth and spiritual journey. It is essential that you understand the following:
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.1 Guidance, Not Guarantees</h3>
                        <p className="leading-relaxed">
                            Our Spiritual Services are intended to provide guidance, perspective, and spiritual insight. We do not guarantee specific outcomes, results, or the manifestation of particular desires. The spiritual realm operates according to divine timing and universal laws that transcend human control. Your free will and the choices you make remain paramount in shaping your destiny.
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.2 Not a Substitute for Professional Advice</h3>
                        <p className="leading-relaxed font-medium text-foreground/90">
                            LUMINA ORACLES SPIRITUAL SERVICES ARE NOT INTENDED TO REPLACE AND SHALL NEVER BE CONSTRUED AS A SUBSTITUTE FOR:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li><strong>Medical Advice:</strong> Our services do not diagnose, treat, cure, or prevent any medical condition. Always consult licensed medical practitioners registered with the Ghana Medical and Dental Council for health concerns.</li>
                            <li><strong>Mental Health Treatment:</strong> For psychological distress, depression, anxiety, or mental health conditions, seek care from qualified mental health professionals.</li>
                            <li><strong>Legal Counsel:</strong> We do not provide legal advice. Consult a licensed legal practitioner registered with the Ghana Bar Association for legal matters.</li>
                            <li><strong>Financial Planning:</strong> Our guidance does not constitute financial advice. Engage certified financial advisors for investment or financial decisions.</li>
                            <li><strong>Licensed Professional Services:</strong> Any area requiring licensure or professional certification falls outside the scope of our offerings.</li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.3 Entertainment and Spiritual Value</h3>
                        <p className="leading-relaxed">
                            While we approach our work with the deepest spiritual reverence and authenticity, certain jurisdictions may consider these services as entertainment. Regardless of legal classification, we maintain the highest standards of spiritual integrity in all our offerings.
                        </p>
                    </section>

                    {/* Booking and Payment */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">4. Booking, Payment, and Cancellation</h2>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">4.1 Booking Consultations</h3>
                        <p className="leading-relaxed">
                            Consultations may be booked through our website, WhatsApp (+233 24 134 3329 or +233 20 163 9414), email (goddessgreat16@gmail.com), or other designated communication channels. All bookings are subject to availability and confirmation by Lumina Oracles.
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">4.2 Payment Terms</h3>
                        <p className="leading-relaxed">
                            Payment for services is due in full prior to or at the time of the Consultation unless otherwise agreed in writing. We accept the following payment methods:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li><strong>Mobile Money:</strong> MTN Mobile Money, Vodafone Cash, AirtelTigo Money (Ghana)</li>
                            <li><strong>Bank Transfer:</strong> Direct transfer to our designated Ghana Commercial Bank or other specified banking institution</li>
                            <li><strong>International Payments:</strong> PayPal, Western Union, or other international transfer services for clients outside Ghana</li>
                            <li><strong>Cash:</strong> For in-person consultations conducted in Ghana</li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            All prices are quoted in Ghana Cedis (GHS) unless otherwise specified. For international clients, prices may be quoted in United States Dollars (USD) or other currencies at our discretion.
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">4.3 Cancellation and Rescheduling</h3>
                        <p className="leading-relaxed">
                            We understand that life circumstances may require changes to scheduled Consultations. The following policies apply:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li><strong>Client Cancellation (48+ hours notice):</strong> Full refund or credit toward future service</li>
                            <li><strong>Client Cancellation (24-48 hours notice):</strong> 50% refund or full credit toward future service</li>
                            <li><strong>Client Cancellation (less than 24 hours):</strong> No refund; credit toward future service at our discretion</li>
                            <li><strong>No-Show:</strong> No refund shall be provided for missed appointments without prior notice</li>
                            <li><strong>Lumina Oracles Cancellation:</strong> Full refund or rescheduling at no additional cost</li>
                        </ul>
                    </section>

                    {/* Confidentiality */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">5. Confidentiality and Sacred Trust</h2>
                        <p className="leading-relaxed">
                            We hold the sacred bond of trust between spiritual guide and seeker in the highest regard. The matters you share during Consultations are treated with the utmost confidentiality:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                All information shared during Consultations shall be held in strict confidence and shall not be disclosed to third parties except as required by law or with your express consent.
                            </li>
                            <li>
                                We maintain the sanctity of spiritual communication as an inviolable principle of our practice, honouring the trust you place in us.
                            </li>
                            <li>
                                Testimonials or case references may only be shared publicly with your explicit written permission, and all identifying details shall be removed unless you consent otherwise.
                            </li>
                            <li>
                                <strong>Exceptions:</strong> We may be required to disclose information if compelled by Ghanaian law, court order, or to prevent imminent harm to yourself or others.
                            </li>
                        </ul>
                    </section>

                    {/* User Conduct */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">6. User Conduct and Responsibilities</h2>
                        <p className="leading-relaxed">In engaging with Lumina Oracles, you agree to:</p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong>Respectful Engagement:</strong> Treat Mamaga Judith Etornam and all Lumina Oracles representatives with respect, courtesy, and dignity befitting the sacred nature of spiritual work.
                            </li>
                            <li>
                                <strong>Honest Communication:</strong> Provide truthful and accurate information during Consultations to enable effective spiritual guidance.
                            </li>
                            <li>
                                <strong>Appropriate Use:</strong> Use our services solely for genuine spiritual guidance and personal development purposes.
                            </li>
                            <li>
                                <strong>No Harassment:</strong> Refrain from any form of harassment, abuse, threats, or inappropriate behaviour toward our team.
                            </li>
                            <li>
                                <strong>No Commercial Exploitation:</strong> Not record, reproduce, distribute, or commercially exploit any Consultation content without express written permission.
                            </li>
                            <li>
                                <strong>Compliance with Law:</strong> Comply with all applicable laws of the Republic of Ghana and your jurisdiction.
                            </li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            We reserve the right to refuse service, terminate Consultations, or ban users who violate these conduct requirements, without refund.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">7. Intellectual Property Rights</h2>
                        <p className="leading-relaxed">
                            All Content on the Lumina Oracles website and provided during Consultations is protected by intellectual property laws of the Republic of Ghana, including but not limited to the Copyright Act, 2005 (Act 690):
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong>Website Content:</strong> All text, graphics, logos, images, videos, audio, and software on our website are the exclusive property of Lumina Oracles or our licensors.
                            </li>
                            <li>
                                <strong>Consultation Content:</strong> Readings, interpretations, advice, and spiritual guidance provided during Consultations remain the intellectual property of Lumina Oracles.
                            </li>
                            <li>
                                <strong>Limited License:</strong> You are granted a limited, non-exclusive, non-transferable license to access and use Content solely for personal, non-commercial purposes.
                            </li>
                            <li>
                                <strong>Prohibited Activities:</strong> You may not copy, modify, distribute, sell, lease, or create derivative works from our Content without express written permission.
                            </li>
                            <li>
                                <strong>Trademark:</strong> &ldquo;Lumina Oracles,&rdquo; our logo, and associated branding are trademarks of the Company and may not be used without authorization.
                            </li>
                        </ul>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">8. Limitation of Liability</h2>
                        <p className="leading-relaxed font-medium text-foreground/90">
                            TO THE FULLEST EXTENT PERMITTED BY THE LAWS OF THE REPUBLIC OF GHANA:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong>No Guaranteed Outcomes:</strong> Lumina Oracles makes no warranties or representations regarding the accuracy, completeness, or reliability of spiritual guidance. All services are provided &ldquo;as is&rdquo; without warranty of any kind.
                            </li>
                            <li>
                                <strong>Limitation of Damages:</strong> Our total liability for any claims arising from or related to these Terms or our services shall not exceed the amount paid by you for the specific service giving rise to the claim.
                            </li>
                            <li>
                                <strong>Exclusion of Consequential Damages:</strong> In no event shall Lumina Oracles be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses.
                            </li>
                            <li>
                                <strong>User Responsibility:</strong> You acknowledge that you are solely responsible for decisions made based on spiritual guidance received, and Lumina Oracles shall bear no liability for the consequences of such decisions.
                            </li>
                        </ul>
                    </section>

                    {/* Indemnification */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">9. Indemnification</h2>
                        <p className="leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Lumina Oracles, Mamaga Judith Etornam, and our affiliates, officers, agents, partners, and employees from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from or related to:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li>Your use of our services or website</li>
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any rights of third parties</li>
                            <li>Any actions you take based on spiritual guidance received</li>
                            <li>Any content or information you provide to us</li>
                        </ul>
                    </section>

                    {/* Dispute Resolution */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">10. Governing Law and Dispute Resolution</h2>
                        <p className="leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana, without regard to conflict of law principles:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong>Jurisdiction:</strong> Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of the Republic of Ghana, specifically the courts in Accra.
                            </li>
                            <li>
                                <strong>Amicable Resolution:</strong> Before initiating formal legal proceedings, both parties agree to attempt to resolve disputes through good-faith negotiation and, if necessary, mediation.
                            </li>
                            <li>
                                <strong>Alternative Dispute Resolution:</strong> At our discretion, disputes may be referred to the Ghana Arbitration Centre for resolution in accordance with its rules.
                            </li>
                        </ul>
                    </section>

                    {/* Modifications */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">11. Modifications to Terms</h2>
                        <p className="leading-relaxed">
                            Lumina Oracles reserves the right to modify, amend, or update these Terms at any time, in our sole discretion:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li>Updated Terms shall be posted on our website with a revised &ldquo;Last Updated&rdquo; date</li>
                            <li>Material changes may be communicated through email or prominent website notice</li>
                            <li>Your continued use of our services after such modifications constitutes acceptance of the updated Terms</li>
                            <li>We encourage you to review these Terms periodically</li>
                        </ul>
                    </section>

                    {/* Termination */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">12. Termination</h2>
                        <p className="leading-relaxed">
                            Either party may terminate the service relationship at any time:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li><strong>By You:</strong> You may discontinue using our services at any time by notifying us in writing</li>
                            <li><strong>By Us:</strong> We may refuse service, suspend access, or terminate your relationship with Lumina Oracles for violation of these Terms, inappropriate conduct, or at our discretion</li>
                            <li><strong>Effect of Termination:</strong> Upon termination, provisions regarding intellectual property, limitation of liability, indemnification, and governing law shall survive</li>
                        </ul>
                    </section>

                    {/* Severability */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">13. Severability and Waiver</h2>
                        <p className="leading-relaxed">
                            If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.
                        </p>
                        <p className="leading-relaxed mt-4">
                            No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term, and Lumina Oracles&apos; failure to assert any right or provision shall not constitute a waiver of such right or provision.
                        </p>
                    </section>

                    {/* Entire Agreement */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">14. Entire Agreement</h2>
                        <p className="leading-relaxed">
                            These Terms, together with our Privacy Policy and any service-specific agreements, constitute the entire agreement between you and Lumina Oracles regarding your use of our services. These Terms supersede all prior or contemporaneous understandings, agreements, negotiations, representations, and warranties, both written and oral, regarding the subject matter hereof.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">15. Contact Information</h2>
                        <p className="leading-relaxed">
                            For questions, concerns, or inquiries regarding these Terms of Service, please contact us through any of the following channels:
                        </p>
                        <div className="mt-6 p-6 bg-black/30 border border-lumina-gold/20 rounded-xl backdrop-blur-sm not-prose">
                            <p className="text-lumina-gold font-[family-name:var(--font-calligraffitti)] text-xl mb-4">Lumina Oracles</p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Founder:</strong> Mamaga Judith Etornam</p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Email:</strong> <a href="mailto:goddessgreat16@gmail.com" className="text-lumina-gold hover:underline">goddessgreat16@gmail.com</a></p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">WhatsApp:</strong> <a href="https://wa.me/233241343329" className="text-lumina-gold hover:underline">+233 24 134 3329</a></p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Phone:</strong> <a href="tel:+233201639414" className="text-lumina-gold hover:underline">+233 20 163 9414</a></p>
                            <p className="text-foreground/70"><strong className="text-foreground/90">Location:</strong> Ghana, West Africa</p>
                        </div>
                    </section>

                    {/* Closing */}
                    <section className="text-center mt-16">
                        <div className="flex items-center justify-center gap-4 mb-8 opacity-30">
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
                            <div className="w-2 h-2 rotate-45 border border-lumina-gold" />
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
                        </div>
                        <p className="text-foreground/60 italic">
                            &ldquo;Walk in light, guided by truth.&rdquo;
                        </p>
                        <p className="text-lumina-gold font-[family-name:var(--font-calligraffitti)] text-xl mt-4">
                            — Lumina Oracles
                        </p>
                    </section>

                </div>
            </div>
        </main>
    );
}
