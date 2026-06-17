/** Decorative animated colour blobs sitting behind page content. */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="blob -left-20 -top-24 h-96 w-96 bg-rose"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="blob right-[-10%] top-1/4 h-[28rem] w-[28rem] bg-blush"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="blob bottom-[-10%] left-1/3 h-[26rem] w-[26rem] bg-[#f6e27a]/60"
        style={{ animationDelay: "6s" }}
      />
    </div>
  );
}
