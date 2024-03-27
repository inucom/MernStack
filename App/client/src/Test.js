import React, {useState} from "react";

function Test(){
    const [Content, setContent] = useState("");
    const [ContentList, setContentList] = useState([]);

    const onSubmit = () => {
        let tempArr = [...ContentList];
        tempArr.push(Content);
        setContentList([...tempArr]);
        //setContentList([]);
    };

    return (
        <div>
            {ContentList.map((content,idx) => {
                return <div key={idx}>{content}</div>
            })}

            <input type="text" value={Content} onChange={(event) =>
                setContent(event.currentTarget.value)}/>
            <button onClick={() => {
                onSubmit();
            }}>제출</button>
        </div>
    )
}

export default Test;