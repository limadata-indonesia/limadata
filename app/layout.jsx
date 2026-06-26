import "./globals.css";

export const metadata = {
  title: "Jasa SEO Indonesia Terpercaya | Limadata — Agency SEO & GEO",
  description: "Limadata adalah jasa SEO Indonesia terpercaya. Kami membantu bisnis Indonesia raih peringkat #1 di Google, tampil di AI Overview, ChatGPT & Gemini.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
