import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Link href="/todo">
      <button className="text-3xl px-12 py-3 bg-blue-800 text-white rounded-lg hover:bg-red-400 duration-300 ease-linear transition-all">Todo</button>
      </Link>
    </main>
  );
}
