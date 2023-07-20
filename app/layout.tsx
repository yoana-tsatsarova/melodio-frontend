import './globals.css'
import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-stone-100 flex flex-col items-center">
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  )
}
