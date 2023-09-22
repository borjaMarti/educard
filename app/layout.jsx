import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import Header from "@/components/ui/header-comp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase:
    process.env.NODE_ENV === "development"
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`,
  title: "EduCard",
  description: "Potencia el aprendizaje en el aula y más allá.",
  keywords: ["Estudiar", "Educación", "Flashcard"],
  authors: [
    {
      name: "Borja Martí",
      url: "https://borjamarti.dev",
    },
  ],
  themeColor: "#ea7070",
  openGraph: {
    title: "EduCard",
    description: "Potencia el aprendizaje en el aula y más allá.",
    url: "https://educard.es",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
