import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Icon = styled.i`
    width: 16px;
    height: 16px;
    display: flex;

    ${({ icon, colour }: { icon: string, colour?: string }) => css`
        mask-image: url(/static/icons/${icon});
        mask-size: 16px;
        mask-repeat: no-repeat;
        mask-position: center;
        background-color: ${colour || "currentColor"};
    `};
`;