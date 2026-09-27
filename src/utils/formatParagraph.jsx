const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Wraps specific substrings of `text` in <strong>/<u>/nowrap-<span>, without
// touching the wording itself. `rules` is an ordered list of
// { match, as: 'strong' | 'u' | 'nowrap', whole? } — `whole` adds word
// boundaries so short words (e.g. "ai") don't match inside other words;
// leave it off for multi-word phrases, where the surrounding punctuation
// already makes the match unambiguous. Matching is case-insensitive, but the
// original casing in `text` is what actually renders (React nodes come from
// the split, not from `rules`).
export default function formatParagraph(text, rules) {
  if (!rules.length) return text;

  const pattern = new RegExp(
    `(${rules.map((r) => (r.whole ? `\\b${escapeRegExp(r.match)}\\b` : escapeRegExp(r.match))).join('|')})`,
    'gi',
  );
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (!part) return null;
    const rule = rules.find((r) => r.match.toLowerCase() === part.toLowerCase());
    if (!rule) return part;
    if (rule.as === 'strong') return <strong key={i}>{part}</strong>;
    if (rule.as === 'u') return <u key={i}>{part}</u>;
    // nowrap — keeps a phrase from breaking across two lines, without any
    // other visual change.
    return (
      <span key={i} style={{ whiteSpace: 'nowrap' }}>
        {part}
      </span>
    );
  });
}
