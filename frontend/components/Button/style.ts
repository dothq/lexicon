import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Button = styled.a`
    border-radius: 10px;
    padding: 0.8rem 1.25rem;
    display: flex;
    transition: 0.15s all;
    font-weight: 500;
    user-select: none;
    width: fit-content;
    gap: 0.6rem;

    ${({ variant }: { variant: 'primary' | 'secondary' }) => css`
        background-color: ${variant == "primary" ? "#1662D3" : "transparent"};
        color: ${variant == "primary" ? "white" : "black"};
        border: ${variant == "primary" ? "" : "1px solid rgba(0, 0, 0, 0.25)"};
        outline: 0px solid ${variant == "primary" ? "#1662D36B" : "rgba(0, 0, 0, 0.25)"};

        &:hover {
            background: ${variant == "primary" ? "#1457BA" : "rgba(0, 0, 0, 0.075)"};
            border: ${variant == "secondary" ? "1px solid rgba(0, 0, 0, 0.0)" : ""};
        }
    `};
`;