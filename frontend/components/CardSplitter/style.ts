import styled from "@emotion/styled";

export const CardSplitter = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    & > textarea:first-of-type {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 1200px) { 
        flex-direction: column;

        & > textarea, & > div {
            width: auto !important;
        }

        & > textarea:first-of-type {
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
    }
`;