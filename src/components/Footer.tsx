import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center">
      Brought to you by{" "}
      <Link
        href="https://lottopgf.org"
        target="_blank"
        className="underline hover:no-underline decoration-dotted"
      >
        LottoPGF
      </Link>{" "}
      &lt;3
    </footer>
  );
}
