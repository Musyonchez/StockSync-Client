import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="StockSync - Synchronize stock information across multiple stores"
          />
          <meta
            name="keywords"
            content="stock sync, inventory management, GraphQL, Prisma, Node.js, React, Next.js"
          />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link rel="canonical" href="https://stocksync-client.vercel.app/" />

          <meta
            property="og:title"
            content="StockSync - Synchronize stock information"
          />
          <meta
            property="og:description"
            content="Efficiently manage stock-related data with StockSync. Built with Node.js, Express.js, GraphQL, and Prisma."
          />
          <meta
            property="og:image"
            content="https://i.ibb.co/GnmS8Wj/Logo-tower-black.png"
          />
          <meta
            property="og:url"
            content="https://stocksync-client.vercel.app/"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@musyonchez" />
          <meta
            name="twitter:title"
            content="StockSync - Synchronize stock information"
          />
          <meta
            name="twitter:description"
            content="Efficiently manage stock-related data with StockSync. Built with Node.js, Express.js, GraphQL, and Prisma."
          />
          <meta
            name="twitter:image"
            content="https://stocksync-client.vercel.app/"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
