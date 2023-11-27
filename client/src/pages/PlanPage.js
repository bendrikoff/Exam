import { Alert, Card, Col, Container, Image, ProgressBar, Row, Spinner, Accordion, Button, Badge,ListGroup } from "react-bootstrap";
import Menu from "../components/Menu";
import Hat from "../Images/Education_Icon_Set-16.png";
import FirstBlock from "../Images/First.png";
import { useEffect, useState } from "react";
import { getErrors, getSections } from "../http/api";


const PlanPage = () => {
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState({ info: [] });
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState({ info: [] });


    useEffect(() => {
        getErrors().then(data => setErrors(data.data.data));
    }, []);

    useEffect(() => {
        getSections().then(data=>
            setSections(data.data.data)).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (<Container>
        <Row className="mt-2">
            <Col md={3}>
                <Menu />
            </Col>
            <Col md={9}>
                <Container>
                    <Container className="mx-auto" style={{ width: "max-content" }}>
                        <Image src={Hat} style={{ width: 150 }} />
                    </Container>
                    <h1 className="mx-auto" style={{ width: "max-content" }}>
                        <p style={{ color: "#1674FD" }}>Цель 75 баллов</p>
                    </h1>
                    <ProgressBar animated now={45} />
                </Container>
                {errors.filter(error => error.attributes.question.data.attributes !== undefined && error.attributes.Archived === false).length > 5
                    ? <Alert variant="primary" className="mt-3" onClose={() => setShow(false)} dismissible>
                        У вас уже более 5 {' '}
                        <Alert.Link href="#"> ошибок</Alert.Link>. Постарайтесь исправить их как можно быстрее.
                    </Alert>
                    : <div></div>}

                <Accordion border="light " className="mt-3" >
                {sections?.map(section => 
                    <Accordion.Item eventKey={section.id}>
                    <Accordion.Header ><h2>✅ Модуль {section.id}. {section.attributes.Name}</h2><Badge bg="primary" pill>
                        14
                    </Badge>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListGroup vertical>
                            <ListGroup.Item>✅</ListGroup.Item>
                            <ListGroup.Item>ListGroup</ListGroup.Item>
                            <ListGroup.Item>renders</ListGroup.Item>
                            <ListGroup.Item>horizontally!</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                )}
                </Accordion>
            </Col>
        </Row>
    </Container>
    );
};

export default PlanPage;