// One half of the open notebook: dark frame + cream paper.
// `side` decides which corners are rounded and which edge meets the spine.
export default function BookHalf({ side, children }) {
  return (
    <div className={`book-half book-half--${side}`}>
      <div className="book-half__paper">{children}</div>
    </div>
  );
}
