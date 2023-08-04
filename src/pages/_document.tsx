import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { cache } from '@emotion/css';
import { ServerStyleSheet } from 'styled-components';

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const emotionStyles = extractCritical(initialProps.html);
      initialProps.html = emotionStyles.html;

      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          styledComponentsSheet.getStyleElement(),
          <style
            data-emotion={`css ${emotionStyles.ids.join(' ')}`}
            key="emotion-style-tag"
            dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
          />,
        ],
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
