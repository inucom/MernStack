import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UploadButtonDiv, UploadDiv, UploadForm } from "../../StyleCSS/UploadCSS";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useSelector } from "react-redux";

function Upload() {
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0); // 업로드 진행률 상태 추가
    let navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user.accessToken) {
            alert("로그인한 회원만 스타일을 생성 할 수 있습니다.");
            navigate("/login");
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        if (Title === "" || Content === "") {
            return alert("모든 항목을 채워주세요");
        }
        let body = {
            title: Title,
            content: Content,
            image: Image,
            uid: user.uid,
        };
        axios.post("/api/style/submit", body)
            .then((res) => {
                if (res.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성에 실패했습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <UploadDiv>
            <UploadForm>
                <label htmlFor="label">Style Name</label>
                <input
                    id="title"
                    type="text"
                    value={Title}
                    onChange={(event) =>
                        setTitle(event.currentTarget.value)} />
                <ImageUpload setImage={setImage} setUploadProgress={setUploadProgress} /> {/* 업로드 상태 전달 */}
                <label htmlFor="content">Description</label>
                <textarea
                    id="content"
                    value={Content}
                    onChange={(event) =>
                        setContent(event.currentTarget.value)} />
                <UploadButtonDiv>
                    <button disabled={uploadProgress !== 100} onClick={(e) => {
                        onSubmit(e);
                    }}>
                        제출
                    </button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload;
