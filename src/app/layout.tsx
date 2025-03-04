import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Easy Opus',
  description: 'A simple task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 bg-opacity-70 text-white p-4 shadow-md flex items-center justify-between">
          <div className="flex justify-center w-full">
            <Link href="/" className="text-lg font-bold">
              easy-opus
            </Link>
          </div>
        </nav>
        <>{children}</>
      </body>
    </html>
  );
}
