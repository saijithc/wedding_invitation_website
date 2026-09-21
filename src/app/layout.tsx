import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Playfair_Display, Great_Vibes, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vaishnav-manju-wedding.vercel.app'),
  title: 'Vaishnav & Dr. Manju — Wedding Invitation',
  description:
    'With warm regards, Mr. Surendran C. & Mrs. Preethi K.V. cordially invite you to the Wedding Reception of Vaishnav with Dr. Manju.',
  openGraph: {
    title: 'Vaishnav & Dr. Manju — Wedding Invitation',
    description:
      'Monday 26 October 2026 · Royal Convention Centre, Karakkunnu, Manjeri',
    images: [
      {
        url: '/assets/vaishnav-manju-invitation.jpg',
        width: 800,
        height: 1200,
        alt: 'Wedding Invitation of Vaishnav & Dr. Manju',
      },
    ],
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAF7F2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <body className="bg-[#FAF7F2] text-[#3D2A1D] antialiased overflow-hidden selection:bg-[#E6CF9B] selection:text-[#281C13]">
        {children}
      </body>
    </html>
  );
}
