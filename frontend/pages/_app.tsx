import { css, Global } from "@emotion/react";
import React from "react";
import emotionReset from "emotion-reset";

const App = ({ Component, pageProps }) => {
    return (
        <>
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