import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <meta name="twitter:card" content="app" />
          <meta
            name="twitter:description"
            content="Cannonball is the fun way to create and share stories and poems on your phone. Start with a beautiful image from the gallery, then choose words to complete the story and share it with friends."
          />
          <meta name="twitter:app:country" content="US" />
          <meta name="twitter:app:name:iphone" content="Cannonball" />
          <meta
            name="twitter:app:url:iphone"
            content="cannonball://poem/5149e249222f9e600a7540ef"
          />
          <meta name="twitter:app:name:ipad" content="Cannonball" />
          <meta name="twitter:app:id:ipad" content="929750075" />
          <meta
            name="twitter:app:url:ipad"
            content="cannonball://poem/5149e249222f9e600a7540ef"
          />
          <meta name="twitter:app:name:googleplay" content="Cannonball" />
          <meta
            name="twitter:app:id:googleplay"
            content="io.fabric.samples.cannonball"
          />
          <meta
            name="twitter:app:url:googleplay"
            content="https://cdn.discordapp.com/attachments/825808720210165831/830413235467059250/unknown.png"
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

export default MyDocument;