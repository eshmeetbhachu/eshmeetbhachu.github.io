import { ABOUT_CONTENT } from '../constants/content';
import formatParagraph from '../utils/formatParagraph';
import meme from '../assets/optimized/meme1.webp';

// Per-paragraph formatting (bold/underline/keep-on-one-line) — wording itself
// lives only in content.js; this just marks which words to style.
const PARAGRAPH_RULES = [
  [{ match: 'software developer', as: 'strong', whole: true }],
  [
    { match: 'ai', as: 'strong', whole: true },
    { match: 'designing', as: 'strong', whole: true },
    { match: 'projects', as: 'strong', whole: true },
  ],
  [
    { match: 'FOOD', as: 'u', whole: true },
    { match: '(An accurate description below)', as: 'nowrap' },
  ],
];

export default function AboutPage() {
  return (
    <div className="p-5 pt-6">
      <h2 className="notebook-heading">{ABOUT_CONTENT.heading}</h2>
      <div className="about-body">
        {ABOUT_CONTENT.paragraphs.map((p, i) => (
          <p key={i}>{formatParagraph(p, PARAGRAPH_RULES[i] ?? [])}</p>
        ))}
      </div>
      <img className="about-photo" src={meme} alt="" />
    </div>
  );
}
