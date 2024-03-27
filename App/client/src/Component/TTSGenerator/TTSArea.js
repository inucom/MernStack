import React from "react";
import TTSUpload from "./TTSUpload";
import TTSList from "./TTSList";
import { TtsAreaDiv } from "../../StyleCSS/TTSCSS.js";

function TTSArea(props) {

    return (
        <TtsAreaDiv>
            <TTSUpload styleId={props.styleId}/>
            <TTSList styleId={props.styleId}/>
        </TtsAreaDiv>
    )
}

export default TTSArea;