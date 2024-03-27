import React, {useState} from "react";
import {TtsContentDiv, TtsUploadDiv} from "../../StyleCSS/TTSCSS";
import {useClickAway} from "@uidotdev/usehooks";
import axios from "axios";
import Button from "react-bootstrap/Button";

function TTSContent(props) {
    const [ModalFlag, setModalFlag] = useState(false);
    const [EditFlag, setEditFlag] = useState(false);
    const [Text, setText] = useState(props.tts.text);

    const ref = useClickAway(() => {
        setModalFlag(false);
    });

    const handleOpenModal = () => {
        if (ModalFlag === false) {
            setModalFlag(true);
        }
    };
    const submitHandler = (e) => {
        if(Text ===""){
            e.preventDefault();
            return alert("모든 공백을 채워주세요.");
        }
        e.preventDefault();
        let body ={
            text:Text,
            styleId: props.tts.styleId,
            ttsId:props.tts._id,
        }
        axios.post("/api/tts/edit", body).then((res)=>{
            if(res.data.success){
                alert("수정");
            }
            else{
                alert("실패");
            }
            return window.location.reload();
        })
    };

    const DeleteHandler = (e) => {
        e.preventDefault();
        if (window.confirm("삭제하시겠습니까?")) {
            let body = {
                styleId: props.tts.styleId,
                ttsId:props.tts._id,
            }
            axios.post("/api/tts/delete", body)
                .then((res) => {
                    if (res.data.success) {
                        alert("삭제");
                        window.location.reload();
                    }
                }).catch((err) => {
                alert("실패");
            })
        }
    }


    return (
        <div>
            <TtsContentDiv>
                <div className="author">
                    {EditFlag ? (
                        <TtsUploadDiv>
                            <form>
                                <input
                                    type="text"
                                    value={Text}
                                    onChange={(e) => {
                                        setText(e.currentTarget.value);
                                    }}
                                />
                                <button onClick={submitHandler}>수정</button>
                            </form>
                            <div className="cancel">
                            <button onClick={(e)=>{e.preventDefault();
                                setEditFlag(false);
                            }}>취소</button>
                            </div>
                        </TtsUploadDiv>
                    ) : (
                        <>

                            <div className="modalControl">
                                <p>{props.tts.text}</p>
                                <div>
                                <Button style={{marginRight:"10px"}}>AI</Button>
                                <Button onClick={handleOpenModal}>Δ</Button>
                                {ModalFlag && (
                                    <div className="modalDiv" ref={ref}>
                                        <p
                                            onClick={() => {
                                                setEditFlag(true);
                                                setModalFlag(false);
                                            }}
                                        >
                                            수정
                                        </p>
                                        <p className="delete" onClick={(e)=> DeleteHandler(e)}>삭제</p>
                                    </div>
                                )}
                                </div>
                            </div>

                        </>

                    )}
                </div>

            </TtsContentDiv>
        </div>
    );
}

export default TTSContent;
