import Link from "next/link";

export default function ContactButton() {
  return (
    <Link
      href="#contact"
      className="rounded-lg bg-primary px-5 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
    >
      Contact Me
    </Link>
  );
}