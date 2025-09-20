interface ServerRichContentProps {
  content: string;
  className?: string;
}

/**
 * Server-side component for rendering pre-sanitized HTML content
 * Use this for content that has already been sanitized server-side
 */
export default function ServerRichContent({
  content,
  className = '',
}: ServerRichContentProps) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:hover:text-primary-hover prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
