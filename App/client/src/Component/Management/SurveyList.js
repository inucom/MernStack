import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

function SurveyList() {
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user);
    const [SurveyList, setSurveyList] = useState([]);

    useEffect(() => {
        axios.post("/api/survey/list").then((res)=>{
            if(res.data.success){
                setSurveyList([...res.data.SurveyList]);
            }
            else{
                alert("설문자료 로딩 실패");
            }
        })
    }, []);

    if(user.uid !== "YJXzsJvrHIPBtX8z1XBMEFszTaG3"){
        return(
            <div style={{
                width:"1200px",
                margin:"0 auto",
            }}>
                <h1>Unauthorized</h1>
                <p>You are not authorized to read this style.</p>
                <Button variant="dark"
                        style={{marginTop: '20px'}}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}>Go back</Button>
            </div>
        )
    }
    
    return (
        <div>
            <h1>Survey List</h1>
            <ul>
                {SurveyList.map((survey, idx) => (
                    <li key={idx}>
                        <h3>Suggestion: {survey.suggestion}</h3>
                        <p>Author's Email: {survey.author.email}</p>
                        <p>Created At: {new Date(survey.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SurveyList;
