import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Michroma&family=Work+Sans:wght@400;700&display=swap" rel="stylesheet" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/Adieu-Regular.woff" as="font" type="font/woff" crossOrigin="" />
        <link rel="preload" href="/fonts/NHG.woff" as="font" type="font/woff" crossOrigin="" />
        <link rel="preload" href="/DTSloading.webp" as="image" />
        <link rel="preload" href="/screens/welcome.webp" as="image" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
