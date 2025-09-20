import type { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import { MetadataGenerator } from '@/lib/seo';

// Configure Nunito font
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
});
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OfflineIndicator from '@/components/OfflineIndicator';
import { WebVitals } from '@/components/WebVitals';

// [ANCHOR: metadata-config]
export const metadata: Metadata =
  MetadataGenerator.generateDefaultpageMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`min-h-screen flex flex-col bg-body ${nunito.variable}`}>
        {/* [ANCHOR: web-vitals] */}
        <WebVitals />

        {/* [ANCHOR: offline-indicator] */}
        <OfflineIndicator />

        {/* [ANCHOR: header-navigation] */}
        <Header />

        <main className="flex-grow bg-mesh">{children}</main>

        {/* [ANCHOR: footer-content] */}
        <Footer />
      </body>
    </html>
  );
}
