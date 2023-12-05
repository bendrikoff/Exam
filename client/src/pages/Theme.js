import {Context} from '../index';
import {Alert, Button, Col, Container, Image, Row, Stack, ToggleButton,Form } from "react-bootstrap";
import Menu from "../components/Menu";
import Chart from "../components/Chart";
import {useContext, useState} from "react";
import { updateAvatar } from '../http/userAPI';
import axios from 'axios';
import profile from "../Images/Education_Icon_Set-19.png";
import {$host} from "../http/index";



const Profile = () => {
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Menu/>
                </Col>
                <Col md={9} className="mt-5">
                    <Container>
                        

                    </Container>
                    <hr />
                    <Row className="mt-2">
                        <Col md={6}>
                                <Alert variant="primary" className="mx-auto">
                                    <h5>Решено задач: 228</h5>
                                </Alert>
                                <Alert variant="success" className="mx-auto">
                                    <h5>Ошибок: 15</h5>
                                </Alert>
                                <Alert variant="warning" className="mx-auto">
                                    <h5>Исправлено ошибок: 15</h5>
                                </Alert>
                        </Col>
                        <Col md={6}>
                            <Alert variant="primary" className="mx-auto">
                                <h5>Дней подряд: 3</h5>
                            </Alert>
                            <Alert variant="success" className="mx-auto">
                                <h5>Изучено тем: 2</h5>
                            </Alert>
                        </Col>
                    </Row>
                    <hr />
                    <Stack direction="vertical" className={"mt-4"}>
                        <Chart />
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;