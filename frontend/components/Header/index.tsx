import React from "react"
import { IconButton } from "../IconButton"
import { StyledHeader, Title } from "./style"

export const Header = () => {
    return (
        <StyledHeader>
            <IconButton icon={"menu.svg"} />
            <Title>Translate</Title>
        </StyledHeader>
    )
}