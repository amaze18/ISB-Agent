import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { BotProvider } from '@/support/BotContext';
import { UserProvider } from '@/support/UserContext';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CultureVo presents NOVI AI",
  description: "Always here to understand you as you are. Always on your side. Join the millions who are growing with AI friends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BotProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </BotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
