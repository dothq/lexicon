import styled from "@emotion/styled";

export const CardSplitter = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    & > textarea:first-of-type {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
`;