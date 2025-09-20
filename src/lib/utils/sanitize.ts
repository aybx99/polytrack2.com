const ALLOWED_TAGS: Record<string, string[]> = {
  p: ['class', 'id'],
  br: [],
  strong: ['class'],
  b: ['class'],
  em: ['class'],
  i: ['class'],
  u: ['class'],
  span: ['class', 'style'],
  h1: ['class', 'id'],
  h2: ['class', 'id'],
  h3: ['class', 'id'],
  h4: ['class', 'id'],
  h5: ['class', 'id'],
  h6: ['class', 'id'],
  ul: ['class'],
  ol: ['class'],
  li: ['class'],
  a: ['href', 'title', 'class', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'class'],
  table: ['class'],
  thead: ['class'],
  tbody: ['class'],
  tr: ['class'],
  th: ['class', 'scope'],
  td: ['class'],
  div: ['class', 'id'],
  section: ['class', 'id'],
  article: ['class', 'id'],
  blockquote: ['class', 'cite'],
  cite: ['class'],
  code: ['class'],
  pre: ['class'],
};

const DANGEROUS_PATTERNS = [
  /<script[^>]*>.*?<\/script>/gis,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /href\s*=\s*["']javascript:[^"']*["']/gi,
  /src\s*=\s*["']javascript:[^"']*["']/gi,
  /href\s*=\s*["']data:[^"']*["']/gi,
  /src\s*=\s*["']data:[^"']*["']/gi,
  /<form[^>]*>.*?<\/form>/gis,
  /<input[^>]*\/?>/gi,
  /<textarea[^>]*>.*?<\/textarea>/gis,
  /<select[^>]*>.*?<\/select>/gis,
  /<object[^>]*>.*?<\/object>/gis,
  /<embed[^>]*\/?>/gi,
  /<applet[^>]*>.*?<\/applet>/gis,
  /<meta[^>]*\/?>/gi,
  /<link[^>]*\/?>/gi,
  /<style[^>]*>.*?<\/style>/gis,
] as const;

export class ContentSanitizer {
  static sanitizeHtml(
    html: string,
    options: {
      allowedTags?: Record<string, string[]>;
      stripDisallowed?: boolean;
      maxLength?: number;
    } = {}
  ): string {
    if (!html || typeof html !== 'string') {
      return '';
    }

    const {
      allowedTags = ALLOWED_TAGS,
      stripDisallowed = true,
      maxLength,
    } = options;

    let cleaned = html;

    for (const pattern of DANGEROUS_PATTERNS) {
      cleaned = cleaned.replace(pattern, '');
    }

    if (stripDisallowed) {
      cleaned = this.stripDisallowedTags(cleaned, allowedTags);
    }

    cleaned = this.sanitizeAttributes(cleaned, allowedTags);

    cleaned = this.sanitizeUrls(cleaned);

    cleaned = this.normalizeWhitespace(cleaned);

    if (maxLength && cleaned.length > maxLength) {
      cleaned = this.truncateHtml(cleaned, maxLength);
    }

    return cleaned;
  }

  private static stripDisallowedTags(
    html: string,
    allowedTags: Record<string, string[]>
  ): string {
    const allowedTagNames = Object.keys(allowedTags);
    const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;

    return html.replace(tagPattern, (match, tagName) => {
      const lowerTagName = tagName.toLowerCase();
      return allowedTagNames.includes(lowerTagName) ? match : '';
    });
  }

  private static sanitizeAttributes(
    html: string,
    allowedTags: Record<string, string[]>
  ): string {
    return html.replace(
      /<([a-zA-Z][a-zA-Z0-9]*)\s+([^>]*)>/g,
      (match, tagName, attributes) => {
        const lowerTagName = tagName.toLowerCase();
        const allowedAttributes = allowedTags[lowerTagName];

        if (!allowedAttributes) {
          return `<${tagName}>`;
        }

        const cleanAttributes = this.filterAttributes(
          attributes,
          allowedAttributes
        );
        return cleanAttributes
          ? `<${tagName} ${cleanAttributes}>`
          : `<${tagName}>`;
      }
    );
  }

  private static filterAttributes(
    attributeString: string,
    allowedAttributes: string[]
  ): string {
    const attrPattern = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const cleanAttributes: string[] = [];
    let match;

    while ((match = attrPattern.exec(attributeString)) !== null) {
      const [, attrName, attrValue] = match;

      if (attrName && allowedAttributes.includes(attrName.toLowerCase())) {
        const cleanValue = this.sanitizeAttributeValue(
          attrName,
          attrValue || ''
        );
        if (cleanValue !== null) {
          cleanAttributes.push(`${attrName}="${cleanValue}"`);
        }
      }
    }

    return cleanAttributes.join(' ');
  }

  private static sanitizeAttributeValue(
    attrName: string,
    attrValue: string
  ): string | null {
    const lowerAttrName = attrName.toLowerCase();

    switch (lowerAttrName) {
      case 'href':
        return this.sanitizeUrl(attrValue);

      case 'src':
        return this.sanitizeUrl(attrValue);

      case 'class':
        return attrValue.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim();

      case 'id':
        return attrValue.replace(/[^a-zA-Z0-9\-_]/g, '').trim();

      case 'style':
        return this.sanitizeInlineStyle(attrValue);

      case 'target':
        return ['_blank', '_self', '_parent', '_top'].includes(attrValue)
          ? attrValue
          : null;

      case 'rel':
        return this.sanitizeRelAttribute(attrValue);

      default:
        return attrValue.replace(/[<>"']/g, '').trim();
    }
  }

  private static sanitizeUrl(url: string): string | null {
    if (!url) return null;

    const trimmedUrl = url.trim().toLowerCase();

    if (
      trimmedUrl.startsWith('javascript:') ||
      trimmedUrl.startsWith('data:') ||
      trimmedUrl.startsWith('vbscript:') ||
      trimmedUrl.startsWith('file:')
    ) {
      return null;
    }

    if (
      trimmedUrl.startsWith('/') ||
      trimmedUrl.startsWith('./') ||
      trimmedUrl.startsWith('../') ||
      trimmedUrl.startsWith('http://') ||
      trimmedUrl.startsWith('https://') ||
      trimmedUrl.startsWith('mailto:') ||
      trimmedUrl.startsWith('#')
    ) {
      return url;
    }

    return null;
  }

  private static sanitizeUrls(html: string): string {
    return html.replace(
      /(href|src)\s*=\s*["']([^"']*)["']/gi,
      (match, attr, url) => {
        const cleanUrl = this.sanitizeUrl(url);
        return cleanUrl ? `${attr}="${cleanUrl}"` : '';
      }
    );
  }

  private static sanitizeInlineStyle(style: string): string | null {
    if (!style) return null;

    const dangerousPatterns = [
      /expression\s*\(/gi,
      /-moz-binding/gi,
      /javascript:/gi,
      /behavior\s*:/gi,
      /@import/gi,
    ];

    let cleanStyle = style;
    for (const pattern of dangerousPatterns) {
      cleanStyle = cleanStyle.replace(pattern, '');
    }

    return cleanStyle.trim();
  }

  private static sanitizeRelAttribute(rel: string): string | null {
    if (!rel) return null;

    const allowedRels = ['nofollow', 'noopener', 'noreferrer', 'prev', 'next'];
    const rels = rel.toLowerCase().split(/\s+/);
    const cleanRels = rels.filter((r) => allowedRels.includes(r));

    return cleanRels.length > 0 ? cleanRels.join(' ') : null;
  }

  private static normalizeWhitespace(html: string): string {
    return html
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  private static truncateHtml(html: string, maxLength: number): string {
    if (html.length <= maxLength) return html;

    let truncated = html.substring(0, maxLength);
    const lastTag = truncated.lastIndexOf('<');
    const lastClose = truncated.lastIndexOf('>');

    if (lastTag > lastClose) {
      truncated = truncated.substring(0, lastTag);
    }

    return truncated + '...';
  }

  static extractPlainText(html: string): string {
    if (!html) return '';

    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  static createExcerpt(html: string, maxLength: number = 160): string {
    const plainText = this.extractPlainText(html);

    if (plainText.length <= maxLength) {
      return plainText;
    }

    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';
  }
}

export { ALLOWED_TAGS, DANGEROUS_PATTERNS };
