import styled from "@emotion/styled"

export const StyledSelectItem = styled.div`
    padding: 0 1.3rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-right: 0.5rem;
    user-select: none;
    cursor: pointer;

    &:hover > a {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &:active > a {
        background-color: rgba(0, 0, 0, 0.125);
    }
`;

export const Flag = styled.i`
    display: flex;
    width: 24px;
    height: 24px;
`;

export const Name = styled.span`
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
`;