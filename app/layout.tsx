import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
export const metadata = {
  title: "User Management",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <main className="flex min-h-screen  items-center bg-gray-900 text-stone-50">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
