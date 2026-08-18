import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-display font-bold text-[#e2e8f0] mb-4">404</div>
      <h1 className="text-2xl font-display font-bold text-[#0f1c2e] mb-3">Page Not Found</h1>
      <p className="text-[#64748b] mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-[#f97316] hover:bg-[#ea6c00] text-white font-semibold rounded-xl transition-all"
        >
          Go Home
        </Link>
        <Link
          href="/properties"
          className="px-6 py-3 border-2 border-[#0f1c2e] text-[#0f1c2e] hover:bg-[#0f1c2e] hover:text-white font-semibold rounded-xl transition-all"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  );
}
