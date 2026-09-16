function TextRenderer({ text, className }) {
  return (
    <>
      <div className={className}>
        {text}
      </div>
    </>
  );
}

export default TextRenderer;
