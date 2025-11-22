import Link from "next/link";

export default function Home() {
  return (
      <>
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
              <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16">
                <h1 className="text-2xl font-semibold">
                    Go to <Link href="/economy" className="underline text-indigo-600 hover:text-indigo-500">Economy Site</Link> {/* TODO: Add the link instead of "Economy" */}
                </h1>
              </main>
          </div>
      </>
  );
}
