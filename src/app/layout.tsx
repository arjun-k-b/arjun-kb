import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/services/site.service';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {  
  const siteSettings = await getSiteSettings();

  return {
    alternates: {
    canonical: 'https://arjun-kb.vercel.app/',
  },
    verification: {
    google: 'XzfVLHT5uMjpw1zJhSfdxSHWrFDBdDSrdrPV0G3SRi4',
  },

  title: siteSettings.seo.title,
    description: siteSettings.seo.description,
    keywords: siteSettings.seo.keywords,
    authors: [{ name: siteSettings.seo.author }],
    creator: siteSettings.seo.author,
    openGraph: {
      title: siteSettings.seo.title,
      description: siteSettings.seo.description,
      url: siteSettings.seo.siteUrl,
      siteName: siteSettings.name,
      images: [
        {
          url: siteSettings.seo.ogImage,
          width: 1200,
          height: 630,
          alt: siteSettings.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteSettings.seo.title,
      description: siteSettings.seo.description,
      creator: siteSettings.twitterUrl,
      images: [siteSettings.seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon.svg',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteSettings.name,
    jobTitle: siteSettings.role,
    url: siteSettings.seo.siteUrl,
    sameAs: [
      siteSettings.githubUrl,
      siteSettings.linkedinUrl,
      siteSettings.twitterUrl,
    ],
    knowsAbout: [
      'SAP ABAP',
      'Module Pool Programming',
      'ALV Reports',
      'Open SQL',
      'ABAP Dictionary',
      'Smart Forms',
      'SAP S/4HANA',
      'JavaScript',
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B0B12] text-white min-h-screen font-sans selection:bg-[#7C3AED] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
