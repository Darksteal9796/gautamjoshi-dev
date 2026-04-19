import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import ChatFab from "@/components/ChatFab";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import TopBar from "@/components/TopBar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://gautamjoshi.dev";
const SITE_TITLE = "Gautam Joshi — Senior AI Full-Stack Engineer";
const SITE_DESCRIPTION =
  "Senior AI Full-Stack Engineer building LLMs, RAG pipelines, and voice agents. 4+ years shipping production AI. Based in Pune, India. Open to senior roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Gautam Joshi", url: SITE_URL }],
  creator: "Gautam Joshi",
  keywords: [
    "Gautam Joshi",
    "AI engineer",
    "LLM",
    "RAG",
    "voice agents",
    "Turing",
    "Python",
    "FastAPI",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Gautam Joshi",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gautam Joshi",
  jobTitle: "Senior AI Full-Stack Engineer",
  email: "mailto:gautamjoshi.dev@gmail.com",
  url: SITE_URL,
  worksFor: { "@type": "Organization", name: "Turing" },
  sameAs: [
    "https://github.com/darksteal9796",
    "https://www.linkedin.com/in/gautam-joshi-054496243",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

const themeBootstrap = `(function(){try{var t=localStorage.getItem('gj-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <TopBar />
        {children}
        <Footer />
        <ChatFab />
      </body>
    </html>
  );
}
