import React, {useState} from 'react';
import {Alert, Button, Col, Container, Image, Row, Stack, ToggleButton} from "react-bootstrap";
import Menu from "../components/Menu";
import profile from "../Images/Education_Icon_Set-19.png";
import Chart from "../components/Chart";

const Profile = () => {
    const data = [
        { dayOfWeek: "Mon", numSolvedTasks: 5 },
        { dayOfWeek: "Tue", numSolvedTasks: 8 },
        { dayOfWeek: "Wed", numSolvedTasks: 3 },
        { dayOfWeek: "Thu", numSolvedTasks: 12 },
        { dayOfWeek: "Fri", numSolvedTasks: 7 },
        { dayOfWeek: "Sat", numSolvedTasks: 9 },
        { dayOfWeek: "Sun", numSolvedTasks: 4 },
    ];

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Menu/>
                </Col>
                <Col md={9} className="mt-5">
                    <Container>
                        <Stack direction="horizontal" gap={3}>
                            <Image src={profile} style={{width:150}} roundedCircle />
                            <Stack direction="vertical" className={"mt-4"}>
                                <h2>Иван Иванов</h2>
                                На сайте с: 2001 года
                            </Stack>
                        </Stack>
                        <ToggleButton className={"mt-2"}>Загрузить аватар</ToggleButton>
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