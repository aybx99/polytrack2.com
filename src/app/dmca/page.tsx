import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { getMainGameConfig } from '@/config/games.config';

export const metadata: Metadata = {
  title: 'DMCA',
  description:
    'Learn about our DMCA policy and how to report copyright infringement.',
  openGraph: {
    title: 'DMCA',
    description:
      'Information about our DMCA policy and copyright infringement reporting procedures.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'DMCA',
    description:
      'Information about our DMCA policy and copyright infringement reporting procedures.',
  },
};

export default async function DMCAPage() {
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
            DMCA Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {legalDates.dmcaLastUpdated}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Copyright Infringement Policy
              </h2>
              <p className="text-muted-foreground mb-4">
                We have implemented a procedure to address any concerns
                regarding potential copyright violations on {gameName}. If you
                suspect that any content infringes on copyright laws, we will
                take immediate action to remove it upon notification.
              </p>
              <p className="text-muted-foreground">
                To report a claim of copyright infringement, please send a
                written notice using the contact information provided below.
                Your notice should include the following information:
              </p>
            </section>

            {/* DMCA Notice Requirements */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                DMCA Notice Requirements
              </h2>
              <p className="text-muted-foreground mb-4">
                To file a DMCA notice with us, you must provide a written
                communication that includes the following:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground mb-6 space-y-4">
                <li>
                  <strong className="text-foreground">Your Signature:</strong>{' '}
                  Your physical or electronic signature, as the owner of an
                  exclusive right that is allegedly infringed, or as an
                  authorized representative of such an owner.
                </li>
                <li>
                  <strong className="text-foreground">
                    Identification of Copyrighted Work:
                  </strong>{' '}
                  Identification of the copyrighted work that you claim has been
                  infringed, or, if there are multiple copyrighted works at a
                  single online site that are covered by a single notification,
                  a representative list of such works at that site.
                </li>
                <li>
                  <strong className="text-foreground">
                    Identification of Infringing Material:
                  </strong>{' '}
                  Identification of the material that you claim is infringing or
                  is the subject of infringing activity and that should be
                  removed or disabled, as well as information reasonably
                  sufficient to permit us to locate the material.
                </li>
                <li>
                  <strong className="text-foreground">
                    Contact Information:
                  </strong>{' '}
                  Information reasonably sufficient to permit us to contact you,
                  such as your address, telephone number, and email address if
                  available.
                </li>
                <li>
                  <strong className="text-foreground">
                    Good Faith Statement:
                  </strong>{' '}
                  A statement that you have a good faith belief that use of the
                  material in the manner complained of is not authorized by the
                  copyright owner, its agent, or the law.
                </li>
                <li>
                  <strong className="text-foreground">
                    Accuracy Statement:
                  </strong>{' '}
                  A statement that the information in your notification is
                  accurate and, under penalty of perjury, that you are the owner
                  of an exclusive right that is allegedly infringed or are
                  authorized to act on behalf of such owner.
                </li>
              </ol>
            </section>

            {/* Important Notice */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Important Notice
              </h2>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-muted-foreground font-semibold">
                  ⚠️ False claims of copyright infringement may result in legal
                  consequences.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-4">
                To report copyright infringement, contact us at:
              </p>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email:</strong>{' '}
                  {contactEmail}
                  <br />
                  <strong className="text-foreground">Subject:</strong> DMCA
                  Notice
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
