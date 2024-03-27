import React, {useEffect, useState} from "react";
import axios from "axios";
import TTSContent from "./TTSContent";

function TTSList(props) {
    const [TtsList,setTtsList] = useState([]);

    useEffect(() => {
        let body={
            styleId: props.styleId,
        }
        axios.post("/api/tts/getTts", body).then((res)=>{
            if(res.data.success){
                setTtsList([...res.data.ttsList]);
            }
        })
    }, []);

    return (
        <div className="scrollBar" >
            {TtsList.map((tts, idx)=> {
                return <TTSContent tts={tts} key={idx}/>;
            })}
        </div>
    )
}

export default TTSList;