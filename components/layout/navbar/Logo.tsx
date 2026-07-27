import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold">
      Arjun<span className="text-violet-500">.</span>
    </Link>
  );
}