import { Metadata } from 'next';
import { getServerTranslations } from '@/i18n/server';
import { siteConfig } from '@/config/site.config';
import { getMainGameConfig } from '@/config/games.config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read our privacy policy to understand how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy',
    description:
      'Learn about our privacy practices and how we protect your information.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy',
    description:
      'Learn about our privacy practices and how we protect your information.',
  },
};

export default async function PrivacyPolicyPage() {
  const { t } = await getServerTranslations();
  const contactEmail = siteConfig.contact.email;
  const legalDates = siteConfig.legal;
  const mainGame = getMainGameConfig();
  const gameName = mainGame.displayName || mainGame.slug;

  return (
    <div className="min-h-screen bg-body">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {legalDates.privacyPolicyLastUpdated}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Introduction
              </h2>
              <p className="text-muted-foreground mb-4">
                At {gameName}, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website and use our gaming
                services.
              </p>
              <p className="text-muted-foreground">
                By using our service, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                Automatically Collected Information
              </h3>
              <p className="text-muted-foreground mb-4">
                When you visit our website, we may automatically collect certain
                information about your device, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
                <li>Device identifiers</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                Cookies and Tracking Technologies
              </h3>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze site usage, and remember your
                preferences. You can control cookie settings through your
                browser preferences.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>To provide and maintain our gaming services</li>
                <li>To improve and optimize our website performance</li>
                <li>To understand how users interact with our games</li>
                <li>To detect and prevent technical issues</li>
                <li>To ensure security and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Information Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>
                  To protect our rights, property, or safety, or that of our
                  users
                </li>
                <li>
                  With trusted service providers who assist us in operating our
                  website (under strict confidentiality agreements)
                </li>
                <li>
                  In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Security
              </h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                These measures include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>
                  Limited access to personal information on a need-to-know basis
                </li>
                <li>Secure hosting infrastructure</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Retention
              </h2>
              <p className="text-muted-foreground">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, comply with legal obligations, resolve disputes, and
                enforce our agreements. When information is no longer needed, we
                securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Your Privacy Rights
              </h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to opt-out of certain data uses</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise these rights, please contact us at {contactEmail}.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Third-Party Links
              </h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites or
                services. We are not responsible for the privacy practices or
                content of these external sites. We encourage you to review the
                privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground">
                Our services are not directed to children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us
                immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date. We
                encourage you to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {contactEmail}
                  <br />
                  <strong>Subject:</strong> Privacy Policy Inquiry
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
