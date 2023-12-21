import { Alert, Card, Col, Container, Image, ProgressBar, Row, Spinner, Accordion, Button, Badge,ListGroup } from "react-bootstrap";
import Menu from "../components/Menu";
import {Context} from '../index';
import Hat from "../Images/Education_Icon_Set-16.png";
import { useEffect, useState, useContext } from "react";
import { getUserErrors, getSections } from "../http/api";


const PlanPage = () => {
    const {user} = useContext(Context);
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState({ info: [] });
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState({ info: [] });


    useEffect(() => {
        getUserErrors(user.user.id).then(data => setErrors(data.data.data));
    }, []);

    useEffect(() => {
        getSections().then(data=>
            setSections(data.data.data))
                .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    const totalThemes = sections.reduce(function(sum, section) {
        return sum + section.attributes?.themes?.data.length;
    }, 0);

    const passedThemesCount = user.user?.passed_themes?.length;

    var percentage = (passedThemesCount / totalThemes) * 100;

    const dataArray = ['Item 1', 'Item 2', 'Item 3'];
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
                        {/* <p style={{ color: "#1674FD" }}>Цель 75 баллов</p> */}
                    </h1>
                    <ProgressBar>
                    <ProgressBar animated striped variant="success" now={percentage} />
                    <ProgressBar animated striped variant="warning" now={100 - percentage} />
                    </ProgressBar>
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
                    <Accordion.Header >
                        <h2>{section?.attributes?.themes?.data.every(themes => user.user?.passed_themes?.some(userThemes => userThemes.id == themes.id))
                        ?<a>✅</a>
                        :<a>💡</a>}
                            Модуль {section.id}. {section.attributes.Name}
                        </h2>
                    <Badge bg="primary" pill>
                        {section?.attributes?.themes?.data.filter(userThemes => 
                            !user.user?.passed_themes?.some(themes => 
                                themes.id == userThemes.id)).length}
                    </Badge>
                    </Accordion.Header>
                    <Accordion.Body>
                            <ListGroup>
                                {section?.attributes?.themes?.data.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        {user.user?.passed_themes?.some(theme => theme.id == item.id )
                                            ?<a>✅</a>
                                            :<a>💡</a>}
                                        <a href={"/theme/" + item.id} style={{textDecoration:0}}>{item.attributes.Name}</a>
                                    </ListGroup.Item>
                                ))}
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