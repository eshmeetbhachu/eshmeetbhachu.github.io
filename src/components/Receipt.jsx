// Cropped from /assets/receipt.svg, which has a large transparent margin
// around the actual paper (511×751 canvas, paper only ~265×670) — using the
// raw file with background-size:cover fit the wrong box and left the paper
// undersized inside the receipt. This copy only narrows the viewBox to the
// paper, so the vector content is untouched.
import receiptPaper from '../assets/receipt-paper.webp';
import portrait from '../assets/optimized/portrait.webp';
import tape from '../../assets/tape.png';
import linkedinIcon from '../../assets/linkedin.png';
import pinterestIcon from '../../assets/pinterest.png';
import githubIcon from '../../assets/github.png';
import gmailIcon from '../../assets/gmail.png';
import barcode from '../../assets/barcode.png';
import { RECEIPT } from '../constants/layout';
import { RECEIPT_CONTENT, SOCIAL_LINKS, RESUME_URL } from '../constants/content';
import formatDate from '../utils/formatDate';

const ICONS = { linkedin: linkedinIcon, pinterest: pinterestIcon, github: githubIcon, gmail: gmailIcon };

function Divider() {
  return <div className="receipt__divider" />;
}

export default function Receipt({ shifted }) {
  return (
    <div
      className="receipt"
      data-shifted={shifted}
      style={{
        left: RECEIPT.x,
        top: RECEIPT.y,
        width: RECEIPT.width,
        height: RECEIPT.height,
        '--receipt-shift': `${RECEIPT.openOffsetX}px`,
        backgroundImage: `url(${receiptPaper})`,
      }}
    >
      <img className="receipt__tape" src={tape} alt="" aria-hidden="true" />
      <div className="receipt__inner">
        <div className="receipt__row">
          <span className="receipt__label">{RECEIPT_CONTENT.welcome}</span>
          <span className="receipt__label">{formatDate()}</span>
        </div>

        <Divider />

        <img className="receipt__photo" src={portrait} alt="Portrait of Eshmeet Singh Bhachu" />

        <p className="receipt__bio">{RECEIPT_CONTENT.bio}</p>

        <Divider />

        <dl className="receipt__stats">
          {RECEIPT_CONTENT.stats.map(([label, value]) => (
            <div key={label} className="receipt__stat-row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <Divider />

        <div className="receipt__icons">
          {SOCIAL_LINKS.map(({ key, label, href }) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <img className="receipt__icon" src={ICONS[key]} alt="" />
            </a>
          ))}
        </div>

        <a
          className="receipt__barcode-link"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume PDF"
        >
          <img className="receipt__barcode" src={barcode} alt="Barcode — open resume" />
        </a>
      </div>
    </div>
  );
}
