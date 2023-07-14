import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/ui/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduCard',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <Header />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}