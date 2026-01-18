import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Lumina Oracles",
    description: "Privacy Policy for Lumina Oracles. Learn how we collect, use, and protect your personal information in compliance with Ghana's Data Protection Act 2012 (Act 843).",
    openGraph: {
        title: "Privacy Policy | Lumina Oracles",
        description: "Privacy Policy for Lumina Oracles spiritual guidance services. Data protection in accordance with Ghana law.",
        type: "website",
    },
};

export default function PrivacyPage() {
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
                    Privacy Policy
                </h1>

                <p className="text-center text-foreground/60 mb-12 text-sm uppercase tracking-[0.3em]">
                    Last Updated: January 2026
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-lumina-gold prose-headings:font-[family-name:var(--font-calligraffitti)] prose-p:text-foreground/80 prose-li:text-foreground/80">

                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">Your Privacy is Sacred to Us</h2>
                        <p className="leading-relaxed">
                            At Lumina Oracles, we understand that the information you share with us is deeply personal and often of a sensitive spiritual nature. This Privacy Policy (&ldquo;Policy&rdquo;) outlines how we collect, use, store, protect, and disclose your personal information when you access our website, engage our services, or communicate with us through any channel.
                        </p>
                        <p className="leading-relaxed">
                            Lumina Oracles is operated by Mamaga Judith Etornam, based in the Republic of Ghana. We are committed to protecting your privacy in accordance with the <strong>Data Protection Act, 2012 (Act 843)</strong> of the Republic of Ghana, and we extend privacy protections that meet or exceed international best practices for all our clients, regardless of their location.
                        </p>
                        <p className="leading-relaxed">
                            By accessing our website or engaging our services, you consent to the collection, use, and processing of your personal information as described in this Policy.
                        </p>
                    </section>

                    {/* Data Controller */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">1. Data Controller</h2>
                        <p className="leading-relaxed">
                            For the purposes of applicable data protection laws, including Ghana&apos;s Data Protection Act, 2012 (Act 843), the data controller responsible for your personal information is:
                        </p>
                        <div className="mt-6 p-6 bg-black/30 border border-lumina-gold/20 rounded-xl backdrop-blur-sm not-prose">
                            <p className="text-lumina-gold font-[family-name:var(--font-calligraffitti)] text-xl mb-4">Lumina Oracles</p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Data Controller:</strong> Mamaga Judith Etornam</p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Email:</strong> <a href="mailto:goddessgreat16@gmail.com" className="text-lumina-gold hover:underline">goddessgreat16@gmail.com</a></p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">WhatsApp:</strong> <a href="https://wa.me/233241343329" className="text-lumina-gold hover:underline">+233 24 134 3329</a></p>
                            <p className="text-foreground/70"><strong className="text-foreground/90">Location:</strong> Ghana, West Africa</p>
                        </div>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">2. Information We Collect</h2>
                        <p className="leading-relaxed">
                            We collect various types of information depending on how you interact with Lumina Oracles:
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">2.1 Information You Provide Directly</h3>
                        <p className="leading-relaxed">When you engage with our services, you may provide us with:</p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Identity Information:</strong> Full name, date of birth, place of birth, gender, and other identifying details necessary for astrological calculations, tarot readings, or personalized spiritual guidance.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Contact Information:</strong> Email address, phone number, WhatsApp number, physical address, and other means of contacting you.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Consultation Information:</strong> Questions, concerns, life circumstances, spiritual experiences, relationship details, career situations, health matters, and other personal information shared during spiritual consultations.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Payment Information:</strong> Mobile money account details, bank account information, or other payment details necessary to process transactions. Note: We do not store complete credit card numbers or sensitive payment credentials.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Communication Records:</strong> Content of emails, WhatsApp messages, voice notes, video call recordings (if consented), and other communications with Lumina Oracles.
                            </li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">2.2 Information Collected Automatically</h3>
                        <p className="leading-relaxed">When you visit our website, we automatically collect:</p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Device Information:</strong> IP address, browser type and version, operating system, device type, screen resolution, and device identifiers.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Usage Information:</strong> Pages visited, time spent on pages, navigation paths, referring URLs, and interaction patterns with our website.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Location Information:</strong> General geographic location derived from your IP address (country, region, city level).
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Cookies and Similar Technologies:</strong> Data collected through cookies, web beacons, and similar tracking technologies as described in Section 6.
                            </li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">2.3 Sensitive Personal Information</h3>
                        <p className="leading-relaxed">
                            Given the nature of spiritual consultations, you may share information that constitutes sensitive personal data under Ghana&apos;s Data Protection Act, including but not limited to:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li>Religious or spiritual beliefs and practices</li>
                            <li>Health and medical information</li>
                            <li>Relationship and family matters</li>
                            <li>Sexual orientation (if disclosed)</li>
                            <li>Financial circumstances</li>
                            <li>Ancestral and ethnic heritage</li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            We treat all such information with the highest degree of confidentiality and only process it with your explicit consent for the purpose of providing spiritual guidance.
                        </p>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">3. How We Use Your Information</h2>
                        <p className="leading-relaxed">
                            We use your personal information for the following purposes:
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.1 Service Delivery</h3>
                        <ul className="space-y-2 mt-4">
                            <li>Providing personalized tarot readings, astrology consultations, and spiritual guidance</li>
                            <li>Calculating astrological charts based on your birth information</li>
                            <li>Preparing for and conducting scheduled consultations</li>
                            <li>Maintaining records of past readings for continuity of service</li>
                            <li>Tailoring spiritual advice to your unique circumstances</li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.2 Communication</h3>
                        <ul className="space-y-2 mt-4">
                            <li>Responding to your inquiries and requests</li>
                            <li>Sending appointment confirmations and reminders</li>
                            <li>Providing follow-up guidance after consultations</li>
                            <li>Sharing spiritual insights, newsletters, or relevant content (with your consent)</li>
                            <li>Notifying you of changes to our services or policies</li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.3 Payment Processing</h3>
                        <ul className="space-y-2 mt-4">
                            <li>Processing payments for services rendered</li>
                            <li>Issuing receipts and confirmations</li>
                            <li>Managing refunds or credits where applicable</li>
                            <li>Maintaining financial records as required by Ghanaian law</li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.4 Website Improvement and Analytics</h3>
                        <ul className="space-y-2 mt-4">
                            <li>Analyzing website usage to improve user experience</li>
                            <li>Understanding which content resonates with our community</li>
                            <li>Optimizing website performance and functionality</li>
                            <li>Identifying and resolving technical issues</li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">3.5 Legal Compliance</h3>
                        <ul className="space-y-2 mt-4">
                            <li>Complying with Ghana&apos;s Data Protection Act and other applicable laws</li>
                            <li>Responding to lawful requests from government authorities</li>
                            <li>Protecting our legal rights and interests</li>
                            <li>Maintaining records required by tax and business regulations</li>
                        </ul>
                    </section>

                    {/* Legal Basis for Processing */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">4. Legal Basis for Processing</h2>
                        <p className="leading-relaxed">
                            Under Ghana&apos;s Data Protection Act, 2012 (Act 843), we process your personal information on the following legal grounds:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Consent:</strong> You have given clear consent for us to process your personal information for specific purposes, particularly for spiritual consultations involving sensitive information.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Contractual Necessity:</strong> Processing is necessary to provide services you have requested and to fulfil our contractual obligations to you.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Legitimate Interest:</strong> Processing is necessary for our legitimate business interests, such as improving our services and protecting against fraud, provided such interests are not overridden by your rights.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Legal Obligation:</strong> Processing is necessary to comply with Ghanaian law, including tax, business, and data protection regulations.
                            </li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">5. How We Share Your Information</h2>
                        <p className="leading-relaxed">
                            We treat your personal information as sacred and do not sell, rent, or trade your data. We may share your information only in the following limited circumstances:
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">5.1 Service Providers</h3>
                        <p className="leading-relaxed">
                            We may share information with trusted third-party service providers who assist in operating our business:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li><strong>Payment Processors:</strong> MTN Mobile Money, Vodafone Cash, PayPal, and banking partners for transaction processing</li>
                            <li><strong>Website Hosting:</strong> Cloudflare and related infrastructure providers</li>
                            <li><strong>Analytics Services:</strong> Google Analytics and Microsoft Clarity for website performance analysis</li>
                            <li><strong>Communication Platforms:</strong> WhatsApp, email service providers for client communication</li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            All service providers are contractually bound to protect your information and use it only for the specific purposes for which it was shared.
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">5.2 Legal Requirements</h3>
                        <p className="leading-relaxed">
                            We may disclose your information when required by law:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li>To comply with a court order, subpoena, or legal process in Ghana</li>
                            <li>To respond to lawful requests from the Data Protection Commission of Ghana</li>
                            <li>To protect our rights, property, or safety, or that of others</li>
                            <li>To prevent or investigate suspected fraud, threats, or illegal activities</li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">5.3 With Your Consent</h3>
                        <p className="leading-relaxed">
                            We may share your information in other circumstances where you have provided explicit consent, such as for testimonials or case studies (with all identifying information removed unless you consent otherwise).
                        </p>
                    </section>

                    {/* Cookies */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">6. Cookies and Tracking Technologies</h2>
                        <p className="leading-relaxed">
                            Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze site usage.
                        </p>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">6.1 Types of Cookies We Use</h3>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Essential Cookies:</strong> Necessary for the website to function properly. These cannot be disabled.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Analytics Cookies:</strong> Help us understand how visitors interact with our website. We use:
                                <ul className="mt-2 ml-4 space-y-1">
                                    <li><strong>Google Analytics</strong> (Tracking ID: G-P9RTMNQPGE) - Collects anonymized usage data</li>
                                    <li><strong>Microsoft Clarity</strong> (Project ID: v2k3ymtj3v) - Provides heatmaps and session recordings</li>
                                </ul>
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Preference Cookies:</strong> Remember your settings and preferences for future visits.
                            </li>
                        </ul>

                        <h3 className="text-xl text-lumina-gold/90 mt-8 mb-4 not-prose font-semibold">6.2 Managing Cookies</h3>
                        <p className="leading-relaxed">
                            You can control cookies through your browser settings:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li>Most browsers allow you to block or delete cookies</li>
                            <li>You may opt out of Google Analytics at <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-lumina-gold hover:underline">tools.google.com/dlpage/gaoptout</a></li>
                            <li>Note that blocking cookies may affect website functionality</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">7. Data Security</h2>
                        <p className="leading-relaxed">
                            We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Encryption:</strong> Our website uses SSL/TLS encryption (HTTPS) to protect data in transit.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Access Controls:</strong> Only authorized personnel have access to personal information, on a need-to-know basis.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Secure Communication:</strong> Consultations conducted via WhatsApp benefit from end-to-end encryption.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Regular Review:</strong> We periodically review our security practices and update them as needed.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Confidential Handling:</strong> Physical records of consultations (if any) are stored securely and accessible only to Mamaga Judith Etornam.
                            </li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            While we take all reasonable precautions, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but commit to promptly addressing any breach.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">8. Data Retention</h2>
                        <p className="leading-relaxed">
                            We retain your personal information for as long as necessary to fulfil the purposes for which it was collected:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Consultation Records:</strong> Retained for up to 7 years to provide continuity of spiritual guidance and reference for future consultations, unless you request earlier deletion.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Communication Records:</strong> Retained for up to 3 years for service quality and dispute resolution purposes.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Financial Records:</strong> Retained for 7 years as required by Ghana Revenue Authority regulations.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Website Analytics:</strong> Retained according to the policies of Google Analytics and Microsoft Clarity (typically 26 months).
                            </li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            Upon expiration of retention periods, data is securely deleted or anonymized.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">9. Your Rights Under Ghana&apos;s Data Protection Act</h2>
                        <p className="leading-relaxed">
                            Under the Data Protection Act, 2012 (Act 843), you have the following rights regarding your personal information:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Right of Access:</strong> You may request a copy of the personal information we hold about you.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Right to Rectification:</strong> You may request correction of inaccurate or incomplete personal information.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Right to Erasure:</strong> You may request deletion of your personal information, subject to legal retention requirements.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Right to Object:</strong> You may object to processing of your personal information for specific purposes, including direct marketing.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of prior processing.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Right to Complain:</strong> You have the right to lodge a complaint with the Data Protection Commission of Ghana if you believe your rights have been violated.
                            </li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            To exercise any of these rights, please contact us using the details provided in Section 13. We will respond to your request within 30 days.
                        </p>
                    </section>

                    {/* International Transfers */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">10. International Data Transfers</h2>
                        <p className="leading-relaxed">
                            As we serve clients globally and use international service providers, your personal information may be transferred to and processed in countries outside Ghana:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <strong className="text-lumina-gold">Hosting Services:</strong> Our website may be hosted on servers located outside Ghana.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Analytics Providers:</strong> Google (USA) and Microsoft (USA) process analytics data globally.
                            </li>
                            <li>
                                <strong className="text-lumina-gold">Payment Processing:</strong> International payment processors may process data in various jurisdictions.
                            </li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                            In accordance with Section 48 of Ghana&apos;s Data Protection Act, we ensure that any international transfer of personal data is to jurisdictions with adequate data protection standards or is subject to appropriate safeguards such as contractual clauses ensuring equivalent protection.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">11. Children&apos;s Privacy</h2>
                        <p className="leading-relaxed">
                            Lumina Oracles services are intended exclusively for adults aged 18 years and above. We do not knowingly collect personal information from children under 18 years of age.
                        </p>
                        <p className="leading-relaxed">
                            If we become aware that we have inadvertently collected personal information from a minor, we will take immediate steps to delete such information. If you believe a child has provided us with their personal information, please contact us immediately.
                        </p>
                    </section>

                    {/* Updates to Policy */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">12. Updates to This Privacy Policy</h2>
                        <p className="leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors:
                        </p>
                        <ul className="space-y-2 mt-4">
                            <li>Updated policies will be posted on this page with a new &ldquo;Last Updated&rdquo; date</li>
                            <li>Material changes may be communicated through email or website notice</li>
                            <li>Your continued use of our services after updates constitutes acceptance of the revised Policy</li>
                            <li>We encourage you to review this Policy periodically</li>
                        </ul>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl mb-6">13. Contact Us</h2>
                        <p className="leading-relaxed">
                            For questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
                        </p>
                        <div className="mt-6 p-6 bg-black/30 border border-lumina-gold/20 rounded-xl backdrop-blur-sm not-prose">
                            <p className="text-lumina-gold font-[family-name:var(--font-calligraffitti)] text-xl mb-4">Lumina Oracles — Data Protection Inquiries</p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Data Controller:</strong> Mamaga Judith Etornam</p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Email:</strong> <a href="mailto:goddessgreat16@gmail.com" className="text-lumina-gold hover:underline">goddessgreat16@gmail.com</a></p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">WhatsApp:</strong> <a href="https://wa.me/233241343329" className="text-lumina-gold hover:underline">+233 24 134 3329</a></p>
                            <p className="text-foreground/70 mb-2"><strong className="text-foreground/90">Phone:</strong> <a href="tel:+233201639414" className="text-lumina-gold hover:underline">+233 20 163 9414</a></p>
                            <p className="text-foreground/70"><strong className="text-foreground/90">Location:</strong> Ghana, West Africa</p>
                        </div>
                        <p className="leading-relaxed mt-6">
                            You may also contact the <strong>Data Protection Commission of Ghana</strong> if you have concerns about how your personal information is being handled:
                        </p>
                        <div className="mt-4 p-4 bg-foreground/5 border border-foreground/10 rounded-lg not-prose">
                            <p className="text-foreground/70 text-sm">
                                <strong className="text-foreground/90">Data Protection Commission</strong><br />
                                Republic of Ghana<br />
                                Website: <a href="https://www.dataprotection.org.gh" target="_blank" rel="noopener noreferrer" className="text-lumina-gold hover:underline">www.dataprotection.org.gh</a>
                            </p>
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
                            &ldquo;Your trust is a sacred gift. We honour it with the highest care.&rdquo;
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
