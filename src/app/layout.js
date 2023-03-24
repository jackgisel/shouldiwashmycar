import "./globals.css";

export const metadata = {
  title: "Should I wash my car?",
  description: "A site to tell you if you should wash you car",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
