import { Metadata } from 'next';
import { siteConfig, getFormattedResponseTime } from '@/config';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the team. We're here to help with questions, feedback, or support.",
  openGraph: {
    title: 'Contact Us',
    description:
      'Get in touch with our team for questions, feedback, or support.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us',
    description:
      'Get in touch with our team for questions, feedback, or support.',
  },
};

export default async function ContactPage() {
  const contactEmail = siteConfig.contact.email;
  const responseTime = getFormattedResponseTime();

  return (
    <div className="min-h-screen bg-body">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We&apos;d love to hear
            from you. Our team is here to help make your gaming experience even
            better.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold text-foreground">
                Email Support
              </h2>
            </div>
            <p className="text-muted-foreground mb-4">
              For general questions, technical support, or feedback about our
              games.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary hover:text-primary-hover font-medium"
            >
              {contactEmail}
            </a>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold text-foreground">
                Game Suggestions
              </h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Have an idea for a game we should add? We&apos;re always looking
              for new content to feature.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary hover:text-primary-hover font-medium"
            >
              {contactEmail}
            </a>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold text-foreground">
                Response Time
              </h2>
            </div>
            <p className="text-muted-foreground">
              We typically respond to all inquiries within {responseTime}. For
              urgent technical issues, we aim to respond even faster.
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold text-foreground">
                Global Reach
              </h2>
            </div>
            <p className="text-muted-foreground">
              We&apos;re committed to providing excellent support regardless of
              your location or timezone.
            </p>
          </div>
        </div>

        {/* FAQ Preview */}
        <section className="bg-card rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How do I report a bug or technical issue?
              </h3>
              <p className="text-muted-foreground">
                Please email us at {contactEmail} with a detailed description of
                the issue, including your browser type, device, and steps to
                reproduce the problem. Screenshots are also helpful if
                applicable.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Can I suggest new games to be added?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! We&apos;re always looking for great new games to add
                to our collection. Send your suggestions to {contactEmail}
                with details about the game and why you think it would be a good
                fit for our platform.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Are your games safe to play?
              </h3>
              <p className="text-muted-foreground">
                Yes! All games on our platform are carefully reviewed and tested
                for safety and quality. We use secure hosting and don&apos;t
                require any downloads or installations, making our games safe to
                play directly in your browser.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Do you have plans for mobile apps?
              </h3>
              <p className="text-muted-foreground">
                Our games are designed to work great in mobile browsers, so you
                can play them on any device without needing to download an app.
                However, we&apos;re always exploring new ways to improve the
                mobile gaming experience.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Alternative */}
        <section className="text-center bg-secondary rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Don&apos;t hesitate to reach out. Whether it&apos;s feedback about a
            game, a technical question, or just to say hello, we&apos;d love to
            hear from you!
          </p>
          <a
            href={`mailto:${contactEmail}?subject=Question about the game`}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send us an Email
          </a>
        </section>
      </div>
    </div>
  );
}
