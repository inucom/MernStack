import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {StyleDiv} from "../../StyleCSS/StyleDetailCSS";

import {TtsContentDiv} from "../../StyleCSS/TTSCSS";
import {useClickAway} from "@uidotdev/usehooks";
import Button from "react-bootstrap/Button";

function Detail(props) {
    const [ModalFlag, setModalFlag] = useState(false);
    const ref = useClickAway(() => {
        setModalFlag(false);
    });

    const handleOpenModal = () => {
        if (ModalFlag === false) {
            setModalFlag(true);
        }
    };

    let params = useParams();
    let navigate = useNavigate();

    const DeleteHandler = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            let body = {
                styleNum: params.styleNum
            }
            axios.post("/api/style/delete", body)
                .then((res) => {
                    if (res.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/list");
                    }
                }).catch((err) => {
                alert("게시글 삭제에 실패하였습니다.");
            })
        }
    }

    return (
        <StyleDiv>
            <>
                <TtsContentDiv>
                    <div className="modalControl">
                        <h1>{props.StyleInfo.title}</h1>
                        <Button onClick={handleOpenModal}>Δ</Button>
                        {ModalFlag && (
                            <div className="modalDiv" ref={ref}>
                                <Link to={`/edit/${props.StyleInfo.styleNum}`}>
                                    <p onClick={() => {
                                        setModalFlag(false);
                                    }}>
                                        수정
                                    </p>
                                </Link>
                                <p className="delete" onClick={DeleteHandler}>삭제</p>
                            </div>
                        )}
                    </div>

                    <div style={{
                        display: "flex",
                        overflowX: "auto",
                        whiteSpace: "nowrap"
                    }}>
                    </div>
                    <p>{props.StyleInfo.content}</p>
                </TtsContentDiv>
                {props.StyleInfo.image && props.StyleInfo.image.map((image, index) => (
                    <div key={index} style={{
                        display: "inline-block",
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                        marginRight: "10px",
                        marginBottom: "10px",
                        backgroundColor: "white"
                    }}>
                        <img
                            src={image}
                            alt={`${index}`}
                            style={{width: "100%", height: "auto", objectFit: "contain"}}
                        />
                    </div>
                ))}
            </>
        </StyleDiv>
    );
}

export default Detail;