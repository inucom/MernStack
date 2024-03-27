import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {UploadButtonDiv, UploadDiv, UploadForm} from "../../StyleCSS/UploadCSS";
import ImageUpload from "./ImageUpload";

function Edit() {
    let params = useParams();
    const [StyleInfo, setStyleInfo] = useState({});
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        let body = {
            styleNum: params.styleNum
        }
        axios.post("/api/style/detail", body)
            .then((res) => {
                if (res.data.success) {
                    setStyleInfo(res.data.style);
                }
            }).catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if (StyleInfo.title !== undefined) setTitle(StyleInfo.title);
        if (StyleInfo.content !== undefined) setContent(StyleInfo.content);
        if (StyleInfo.image !== undefined) setImage(StyleInfo.image);
    }, [StyleInfo]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (Title === "" || Content === "") {
            return alert("모든 항목을 채워주세요");
        }
        let body = {
            title: Title,
            content: Content,
            styleNum: params.styleNum,
            image: Image,
        }
        axios.post("/api/style/edit", body, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        }).then((res) => {
            if (res.data.success) {
                alert("스타일 수정이 완료되었습니다.");
                navigate(`/style/${params.styleNum}`);
            } else {
                alert("스타일 수정에 실패했습니다.");
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <UploadDiv>
            <UploadForm>
                <label htmlFor="label">제목</label>
                <input
                    id="title"
                    type="text"
                    value={Title}
                    onChange={(event) =>
                        setTitle(event.currentTarget.value)}/>
                <ImageUpload setImage={setImage} setUploadProgress={setUploadProgress}/> {/* 업로드 상태 전달 */}
                <label htmlFor="content">내용 </label>
                <textarea
                    id="content"
                    value={Content}
                    onChange={(event) =>
                        setContent(event.currentTarget.value)}/>
                <UploadButtonDiv>
                    <button
                        className="cancel"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}>
                        취소
                    </button>
                    <button disabled={uploadProgress !== 100} onClick={(e) => {
                        onSubmit(e);
                    }}>
                        제출
                    </button>
                </UploadButtonDiv>
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${uploadProgress}%`}}
                             aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100">{uploadProgress}%
                        </div>
                    </div>
                )}
            </UploadForm>
        </UploadDiv>
    )
}

export default Edit;
