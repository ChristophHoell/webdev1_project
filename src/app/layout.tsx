import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NextJS Demo',
  description: 'A simple task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 bg-opacity-70 text-white p-4 shadow-md flex items-center justify-between">
          <div className="flex justify-center w-full">
            <Link href="/home" className="text-lg font-bold">
              NextJS Demo Website
            </Link>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
