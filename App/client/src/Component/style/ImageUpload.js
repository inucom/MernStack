import React, { useState } from "react";
import { Form, ProgressBar } from "react-bootstrap";
import axios from "axios";

function ImageUpload({ setImage, setUploadProgress }) {
    const [progress, setProgress] = useState(0);

    const FileUpload = (e) => {
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append("files", e.target.files[i]);
        }
        if (e.target.files.length > 5) {
            alert("최대 업로드 수는 5개입니다.");
            return;
        }
        const config = {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
                if (percentCompleted === 100) {
                    setUploadProgress(100);
                    setTimeout(() => {
                        setProgress(0);
                    }, 2000);
                }
            }
        };
        axios.post("/api/style/image/upload", formData, config)
            .then((res) => {
                setImage(res.data.filePaths);
            });
    };

    return (
        <div>
            <Form.Control
                type="file" multiple
                className="shadow-none"
                accept="image/*"
                onChange={(e) => FileUpload(e)}
            />
            {progress > 0 && (
                <div className="mt-2">
                    <ProgressBar now={progress} label={`${progress}%`} />
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
