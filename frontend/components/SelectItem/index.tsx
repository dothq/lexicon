import React from "react"
import { Flag, Name, StyledSelectItem } from "./style"
import emojiFlags from "emoji-flags";
const Twemoji = require("react-twemoji").default;
import { getLanguageMsLocales } from "country-language";
import { flags } from "../../util/flags";
import { IconButton } from "../IconButton";

export const SelectItem = ({ flag }: { flag: string }) => {
    const data = flags.find(f => f.code == flag);

    return (
        <StyledSelectItem>
            <Twemoji options={{ ext: ".svg", size: "svg" }}>
                <Flag>{data.flag}</Flag>
            </Twemoji>

            <Name>{data.name}</Name>

            <IconButton icon={"chevron-down.svg"} style={{ marginLeft: "auto" }} />
        </StyledSelectItem>
    )
}