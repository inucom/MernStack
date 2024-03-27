import React, {useState} from "react";
import "../../StyleCSS/styles.css";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import axios from "axios";

function Survey() {

    const user = useSelector((state) => state.user);
    const [Survey, setSurvey] = useState("");

    const submitHandler = (e) => {
        if (Survey === "") {
            return alert("제안을 작성해주세요.");
        }
        e.preventDefault();
        let body = {
            suggestion: Survey,
            uid: user.uid,
        }
        axios.post("/api/survey/submit", body).then((res) => {
            if (res.data.success) {
                alert("감사합니다.");
                window.location.reload();
            } else {
                alert("다시 시도해주세요.");
            }
        })
    }

    return (
        <div style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            maxWidth: "925px",
            margin: "0 auto",
            width: "90%",
            boxSizing: "border-box",
        }}>
            <header>
                <h1>InuAttention Survey</h1>
            </header>
            <div>Let us know how we can improve our service</div>
            <br/>
            <br/>
            <h4>각종 버그, 버그 시 상황, 제안 깃허브테스트</h4>
            <div>
                        <textarea rows="10" placeholder="Enter your comment here..."
                                  style={{maxWidth:"900px",width:"90%", margin:"0 auto"}}
                                  onChange={(e) =>
                                      setSurvey(e.currentTarget.value)}></textarea>
                <br/><br/>
                <Button onClick={(e)=>{submitHandler(e)}}>Submit</Button>
            </div>
        </div>
    );
}

export default Survey;
