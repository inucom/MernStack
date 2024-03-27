import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [PW, setPW] = useState("");
    const [PWConfirm, setPWConfirm] = useState("");
    const [Flag, setFlag] = useState(false);
    const [Error, setError] = useState("");

    const registerFunc = async (e) => {
        e.preventDefault();
        if (!(Name && Email && PW && PWConfirm)) {
            return alert("모든 공백을 채워주세요.");
        }
        if (PW !== PWConfirm) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }
        setFlag(true);
        try {
            let createUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(Email, PW);
            await createUser.user.updateProfile({
                displayName: Name,
            });
            let body = {
                email: createUser.user.email,
                displayName: createUser.user.displayName,
                uid: createUser.user.uid,
            };
            axios.post("/api/user/register", body).then((res) => {
                setFlag(false);
                if (res.data.success) {
                    navigate("/");
                    window.location.reload();
                } else {
                    return alert("회원가입 오류");
                }
            });
        } catch (error) {
            setFlag(false);
            setError(error.message);
        }
    };

    return (
        <Container fluid>
            <Row className="justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Col md={4}>
                    <Form style={{ textAlign: "center" }}>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name"
                                          placeholder="Enter name"
                                          style={{ width: "40vh", margin: "auto" }}
                                          value={Name}
                                          onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          style={{ width: "40vh", margin: "auto" }}
                                          value={Email}
                                          onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          style={{ width: "40vh", margin: "auto" }}
                                          value={PW}
                                          onChange={(e) => setPW(e.currentTarget.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                            <Form.Label>Verify password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Verify password"
                                          style={{ width: "40vh", margin: "auto" }}
                                          value={PWConfirm}
                                          onChange={(e) => setPWConfirm(e.currentTarget.value)}
                            />
                        </Form.Group>
                        {Error && <p style={{ color: "red" }}>{Error}</p>}
                        <Button variant="dark"
                                type="submit"
                                style={{ width: "40vh", marginTop: "30px", marginBottom: "20px" }}
                                disabled={Flag}
                                onClick={(e) => registerFunc(e)}
                        >Create an account</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
