import { css, Global } from "@emotion/react";
import React from "react";
import emotionReset from "emotion-reset";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Dot Translate</title>
                <meta name="description" content={"Translate text between languages with high-accuracy using artificial intelligence."}></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta property="og:title" content={"Dot Translate"}></meta>
                <meta property="og:description" content={"Translate text between languages with high-accuracy using artificial intelligence."}></meta>
                <meta name="twitter:title" content={"Dot Translate"}></meta>
                <meta name="twitter:description" content={"Translate text between languages with high-accuracy using artificial intelligence."}></meta>
            </Head>
            <Global
                styles={css`
                    ${emotionReset}

                    @font-face {
                        font-family: "Inter";
                        font-style: normal;
                        font-weight: 100 900;
                        font-display: block;
                        src: url(/static/fonts/Inter.var.woff2) format("woff2");
                        font-named-instance: "Regular";
                    }

                    ::selection {
                        background-color: #1662D3;
                        color: white;
                    }

                    html,
                    body,
                    input,
                    textarea {
                        color: #282828;
                        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    }
                `}
            />
            <Component {...pageProps} />
        </>
    )
}

export default App