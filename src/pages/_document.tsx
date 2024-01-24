// Import necessary modules from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Create a custom document component
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta tags for description and keywords */}
          <meta name="description" content="StockSync - Synchronize stock information across multiple stores" />
          <meta name="keywords" content="stock sync, inventory management, GraphQL, Prisma, Node.js, React, Next.js" />

          {/* Viewport for better mobile responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* Canonical link */}
          <link rel="canonical" href="https://stocksync-client.vercel.app/" />

          {/* Open Graph meta tags */}
          <meta property="og:title" content="StockSync - Synchronize stock information" />
          <meta property="og:description" content="Efficiently manage stock-related data with StockSync. Built with Node.js, Express.js, GraphQL, and Prisma." />
          <meta property="og:image" content="https://i.ibb.co/GnmS8Wj/Logo-tower-black.png" />
          <meta property="og:url" content="https://stocksync-client.vercel.app/" />

          {/* Twitter Card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@musyonchez" />
          <meta name="twitter:title" content="StockSync - Synchronize stock information" />
          <meta name="twitter:description" content="Efficiently manage stock-related data with StockSync. Built with Node.js, Express.js, GraphQL, and Prisma." />
          <meta name="twitter:image" content="https://stocksync-client.vercel.app/" />

          {/* Add any other necessary meta tags or link tags for SEO optimization */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
