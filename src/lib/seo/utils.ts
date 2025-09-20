/**
 * SEO Utilities
 * Shared utility functions for SEO operations
 */

export function cleanDescription(
  text: string,
  maxLength: number = 160
): string {
  if (!text) return '';

  const cleaned = text
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

interface FAQItem {
  question: string;
  answer: string;
}

export function parseFAQJsonLd(faqJsonLd: string) {
  try {
    const faqData: FAQItem[] = JSON.parse(faqJsonLd);

    if (!Array.isArray(faqData)) {
      console.error('FAQ JSON-LD must be an array');
      return null;
    }

    if (faqData.length === 0) {
      return null; // No FAQ items to display
    }

    return {
      '@type': 'FAQPage',
      mainEntity: faqData
        .filter((item) => item.question && item.answer) // Only include valid Q&A pairs
        .map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
    };
  } catch (error) {
    console.error('Failed to parse FAQ JSON-LD:', error);
    return null;
  }
}
