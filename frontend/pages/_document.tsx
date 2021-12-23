import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
    public render() {
        return (
            <Html 
                prefix={"og: https://ogp.me/ns#"} 
                itemScope={true} 
                itemType={"http://schema.org/WebSite"}
            >
                <Head>
                    <meta charSet="utf-8"></meta>
                    <meta name="keywords" content="translation google-translate translate opensource oss free"></meta>
                    <meta name="google" content="notranslate"></meta>
                    <meta name="name" itemProp="name" content="Dot Translate"></meta>
                    <meta name="application-name" content="Dot Translate"></meta>
                    <meta name="robots" content="index,follow"></meta>
                    <meta name="author" content="Dot HQ, support@dothq.co"></meta>
                    <meta name="reply-to" content="support@dothq.co"></meta>
                    <meta name="email" content="support@dothq.co"></meta>
                    <meta name="owner" content="Dot HQ"></meta>
                    <meta name="coverage" content="worldwide"></meta>
                    <meta name="distribution" content="global"></meta>
                    <meta name="rating" content="safe for kids"></meta>
                    <meta name="isFamilyFriendly" itemProp="isFamilyFriendly" content="true"></meta>
                    <meta name="apple-mobile-web-app-title" content="Dot HQ"></meta>
                    <meta name="application-name" content="Dot Translate"></meta>
                    <meta name="theme-color" content="#fefefe"></meta>
                    <link rel="canonical" href="https://www.dothq.co/"></link>
                    <link rel="home" href="https://www.dothq.co/"></link>
                    <link rel="start" href="https://www.dothq.co/"></link>
                    <link rel="help" href="mailto:support@dothq.co"></link>

                    <link rel="icon" type="image/png" href="/favicon.png"></link>

                    <meta property="og:site_name" content="Dot HQ"></meta>
                    <meta name="twitter:site" content="@DotBrowser"></meta>
                    <meta name="twitter:creator" content="@DotBrowser"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
  }
}

export default Document;