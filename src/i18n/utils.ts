export function createTranslator(
  translations: Record<string, string>,
  locale: string
) {
  return (key: string, variables?: Record<string, string | number>): string => {
    let translation = translations[key] || key;

    if (!translations[key]) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Missing translation for key: "${key}" in locale: "${locale}"`
        );
      }
      // Return key as fallback
      translation = key;
    }

    // Variable interpolation
    if (variables) {
      Object.entries(variables).forEach(([varKey, value]) => {
        const placeholder = `{{${varKey}}}`;
        // Escape placeholder for regex
        const escapedPlaceholder = placeholder.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&'
        );
        translation = translation.replace(
          new RegExp(escapedPlaceholder, 'g'),
          String(value)
        );
      });
    }

    return translation;
  };
}
