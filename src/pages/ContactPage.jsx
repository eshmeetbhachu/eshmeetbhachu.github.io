import linkedinIcon from '../../assets/linkedin.png';
import githubIcon from '../../assets/github.png';
import gmailIcon from '../../assets/gmail.png';
import tape from '../../assets/tape.png';
import { CONTACT_CONTENT as C, SOCIAL_LINKS, RESUME_URL } from '../constants/content';

const HREF = {
  linkedin: SOCIAL_LINKS.find((l) => l.key === 'linkedin').href,
  github: SOCIAL_LINKS.find((l) => l.key === 'github').href,
  resume: RESUME_URL,
};
const ICON = { linkedin: linkedinIcon, github: githubIcon, resume: null };

// Last page: a taped envelope for email, receipt-style link rows, and a
// paper-plane sign-off doodle at the foot of the page.
export default function ContactPage() {
  return (
    <div className="contact-page p-5 pt-6">
      <h2 className="notebook-heading text-right">{C.heading}</h2>
      <p className="contact-intro">{C.intro}</p>

      <a className="contact-envelope" href={`mailto:${C.email}`}>
        <img className="contact-envelope__tape" src={tape} alt="" aria-hidden="true" />
        <svg className="contact-envelope__flap" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M1 1 50 34 99 1" fill="none" stroke="currentColor" strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        <img className="contact-envelope__icon" src={gmailIcon} alt="" aria-hidden="true" />
        <span className="contact-envelope__label">drop a line at</span>
        <span className="contact-envelope__email">{C.email}</span>
      </a>

      <ul className="contact-links">
        {C.links.map(({ key, label, handle }) => (
          <li key={key}>
            <a href={HREF[key]} target="_blank" rel="noopener noreferrer">
              {ICON[key] ? (
                <img src={ICON[key]} alt="" aria-hidden="true" />
              ) : (
                <svg className="contact-links__doc" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M4 1.5h7l3.5 3.5v11.5H4Z M11 1.5V5h3.5 M6.5 8.5h5.5M6.5 11h5.5M6.5 13.5h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              )}
              <span className="contact-links__label">{label}</span>
              <span className="contact-links__leader" aria-hidden="true" />
              <span className="contact-links__handle">{handle} ↗</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="contact-signoff">
        <svg className="contact-signoff__plane" viewBox="0 0 220 90" aria-hidden="true">
          <path
            d="M6 78c30 4 54-6 62-24 7-16-8-26-18-16-12 12 6 32 34 30 30-2 52-20 74-36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
          <path
            d="M166 30l46-22-20 50-14-16Zm0 0 26-22M178 42l-4 16 4-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <p className="contact-signoff__text">{C.signoff}</p>
      </div>
    </div>
  );
}
