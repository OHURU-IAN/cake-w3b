export function CakeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blush to-rose/40 text-4xl ${className}`}
        aria-hidden
      >
        🎂
      </div>
    );
  }
  // Plain <img> is used (rather than next/image) because photos are
  // uploaded by the owner and have unknown dimensions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
}
