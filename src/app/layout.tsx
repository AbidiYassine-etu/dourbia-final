// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import { ABeeZee } from "next/font/google";
import { Actor } from "next/font/google";
import { Montserrat } from "next/font/google";
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/auth-context'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const abeezee = ABeeZee({
  subsets: ['latin'],
  variable: '--font-abeezee',
  weight: '400',
  style: 'normal',
});

const actor = Actor({
  subsets: ['latin'],
  variable: '--font-actor',
  weight: '400',
  style: 'normal',
});

// Montserrat Regular
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "400",
  style: "normal",
});

// Montserrat Light
const montserratLight = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-light",
  weight: "300",
  style: "normal",
});

const montserratSemiBold = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-semibold",
  weight: "600",
  style: "normal",
});

export const metadata: Metadata = {
  title: 'DOURBIA',
  description: 'Discover Tunisia Together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
<body className={`${inter.variable} ${abeezee.variable} ${actor.variable} ${montserrat.variable} ${montserratLight.variable} ${montserratSemiBold.variable}`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
              <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>

  )
}
