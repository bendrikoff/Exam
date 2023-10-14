import {Alert, Card, Col, Container, Image, ProgressBar, Row, Spinner} from "react-bootstrap";
import Menu from "../components/Menu";
import Hat from "../Images/Education_Icon_Set-16.png";
import FirstBlock from "../Images/First.png";
import {useEffect, useState} from "react";
import {getErrors} from "../http/api";


const PlanPage = () => {
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState({info: []});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getErrors().then(data=>setErrors(data.data.data)).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return ( <Container>
        <Row className="mt-2">
            <Col md={3}>
                <Menu/>
            </Col>
            <Col md={9}>
                <Container>
                    <Container className="mx-auto" style={{width:"max-content"}}>
                        <Image src={Hat}  style={{width:150}}/>
                    </Container>
                    <h1 className="mx-auto" style={{width:"max-content"}}>
                        <p style={{color: "#1674FD"}}>Цель 75 баллов</p>
                    </h1>
                    <ProgressBar animated now={45} />
                </Container>
                {errors.filter(error=>error.attributes.question.data.attributes!==undefined && error.attributes.Archived===false).length > 5
                    ?<Alert variant="primary" className="mt-3" onClose={() => setShow(false)} dismissible>
                        У вас уже более 5 {' '}
                        <Alert.Link href="#"> ошибок</Alert.Link>. Постарайтесь исправить их как можно быстрее.
                    </Alert>
                    :<div></div> }


                <Card border="light " className="mt-3">
                    <Card.Header> <h2>Модуль 1.Анализ информационных моделей</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Container className="mt-5">
                                <Row>
                                    <Col md={4}><Image src={FirstBlock} roundedCircle />1</Col>
                                    <Col md={3}><Image src={FirstBlock} roundedCircle />2</Col>

                                   <Col md={{ span: 3, offset: 2}}><Image src={FirstBlock} roundedCircle />6</Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 3, offset: 2}}><Image src={FirstBlock} roundedCircle />3</Col>
                                        <Col md={{ span: 3, offset: 2 }}><Image src={FirstBlock} roundedCircle />4</Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 6, offset: 5 }}><Image src={FirstBlock} roundedCircle />5</Col>
                                    </Row>

                                </Container>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlanPage;