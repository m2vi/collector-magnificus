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
          <meta property="og:url" content="https://github.com" />
          <meta property="og:site_name" content="GitHub" />
          <meta property="og:title" content="Build software better, together" />
          <meta
            property="og:description"
            content="GitHub is where people build software. More than 56 million people use GitHub to discover, fork, and contribute to over 100 million projects."
          />
          <meta
            property="og:image"
            content="https://github.githubassets.com/images/modules/open_graph/github-logo.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="1200" />
          <meta
            property="og:image"
            content="https://github.githubassets.com/images/modules/open_graph/github-mark.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="620" />
          <meta
            property="og:image"
            content="https://github.githubassets.com/images/modules/open_graph/github-octocat.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="620" />

          <meta property="twitter:site" content="github" />
          <meta property="twitter:site:id" content="13334762" />
          <meta property="twitter:creator" content="github" />
          <meta property="twitter:creator:id" content="13334762" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="GitHub" />
          <meta
            property="twitter:description"
            content="GitHub is where people build software. More than 56 million people use GitHub to discover, fork, and contribute to over 100 million projects."
          />
          <meta
            property="twitter:image:src"
            content="https://github.githubassets.com/images/modules/open_graph/github-logo.png"
          />
          <meta property="twitter:image:width" content="1200" />
          <meta property="twitter:image:height" content="1200" />
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
