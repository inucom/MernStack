import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useSelector} from "react-redux";

function List() {
    const [StyleList, setStyleList] = useState([]);
    const user = useSelector((state)=> state.user);

    useEffect(() => {
        let body ={
            uid : user.uid,
        }
        axios.post("/api/style/list", body).then((res) => {
            if (res.data.success) {
                setStyleList([...res.data.styleList]);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div style={{paddingTop: "1rem",
            paddingBottom: "1rem",
            maxWidth: "945px",
            margin: "0 auto",
            width: "90%",
            boxSizing: "border-box",}}>
            <h3 style={{
                maxWidth: "907px",
                margin: "0 auto",
                marginBottom: "20px",
            }}
            >Styles</h3>
            <div className="scrollBarList"
                style={{ display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                maxWidth: "945px",
            }}>
                {StyleList.map((style, idx) => (
                    <div key={idx} style={{ marginBottom: '20px', width: '18rem', marginRight: '10px', marginLeft: '10px' }}>
                        <Card>
                            {style.image && style.image.length > 0 &&
                                <Card.Img variant="top" src={style.image[0]} style={{ objectFit: "cover", height: "300px" }} />
                            }
                            <Card.Body>
                                <Card.Title>{style.title}</Card.Title>

                                <Link to={`/style/${style.styleNum}`}>
                                    <Button variant="dark" style={{ marginTop: '20px' }}>Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default List;
