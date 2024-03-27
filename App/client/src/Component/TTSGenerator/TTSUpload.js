import React, {useState} from "react";
import axios from "axios";
import { TtsUploadDiv } from "../../StyleCSS/TTSCSS.js";
function TTSUpload(props) {
    const [Text,setText] = useState("");

    const submitHandler = (e) =>{
        if(Text ===""){
            return alert("모든 공백을 채워주세요.");
        }
        e.preventDefault();
        let body={
            text: Text,
            styleId:props.styleId,
        }
        axios.post("/api/tts/submit", body).then((res)=>{
            if(res.data.success){
                window.location.reload();
            }else{
                alert("다시 시도해주세요.");
            }
        })
    }

    return (
        <TtsUploadDiv>
        <form>
            <input type="text" value={Text}
            onChange={(e)=>{
                setText(e.currentTarget.value);
            }}
            />
            <button onClick={submitHandler}>생성</button>
        </form>
        </TtsUploadDiv>
    )
}

export default TTSUpload;