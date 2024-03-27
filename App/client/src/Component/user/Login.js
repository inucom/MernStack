import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom";
import firebase from "../../firebase";

function Login(){
    const [Email,setEmail] = useState("");
    const [PW,setPW] = useState("");
    const [Error,setError] = useState("");

    let navigate = useNavigate();

    const signInFunc = async (e) => {
        e.preventDefault();
        if(!(Email && PW)){
            return alert("모든 공백을 채워주세요.");
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(Email,PW);
            navigate("/");
        }catch (error) {
            setError(error.message);
        }
    }

    return(
        <Container fluid >
            <Row className="justify-content-center align-items-center" style={{ height: "70vh" }}>
                <Col md={4}>
                    <Form style={{ textAlign: "center" }}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          style={{width:"40vh", margin: "auto"}}
                                          value={Email}
                                          onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          style={{width:"40vh", margin: "auto"}}
                                          value={PW}
                                          onChange={(e) => setPW(e.currentTarget.value)}
                            />
                        </Form.Group>
                        {Error && <p style={{ color: "red" }}>{Error}</p>}
                        <Form.Group className="mb-3">
                        <Button variant="dark"
                                style={{ width:"40vh",marginTop:"30px"}}
                                onClick={(e) => signInFunc(e)}
                        >Sign In</Button>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Button variant="dark" style={{width:"40vh", margin: "auto"}}
                                onClick={(e)=>{
                                    e.preventDefault();
                                    navigate("/register");
                                }}
                        >Create an account</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
