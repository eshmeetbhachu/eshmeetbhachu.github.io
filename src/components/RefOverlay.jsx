// Dev aid: add ?ref to the URL to overlay the Canva reference for the current state.
// Served straight from /design by the dev server; never part of the production bundle.
const enabled = import.meta.env.DEV && new URLSearchParams(window.location.search).has('ref');

export default function RefOverlay({ bookState, spread }) {
  if (!enabled) return null;
  const src =
    bookState === 'closed'
      ? '/design/01-home.png'
      : spread === 1
        ? '/design/03-projects-photos.png'
        : '/design/02-about-stack.png';
  return <img className="ref-overlay" src={src} alt="" />;
}
