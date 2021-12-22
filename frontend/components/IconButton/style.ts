import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const StyledIconButton = styled.a`
    padding: 1.25rem;
    border-radius: 8px;
    transition: 0.3s all;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.125);
    }

    ${({ icon }: { icon: string }) => css`
        background-image: url(/static/icons/${icon});
        background-size: 16px;
        background-repeat: no-repeat;
        background-position: center;
    `};
`; 