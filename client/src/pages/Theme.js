import { Alert, Card, Col, Container, Image, ProgressBar, Row, Spinner, Accordion, Button, Badge,ListGroup } from "react-bootstrap";
import Menu from "../components/Menu";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getTheme } from "../http/api";
import ReactMarkdown from "react-markdown";

const Theme = () => {
    const {id} = useParams();
    const [theme, setTheme] = useState({ });
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getTheme(id).then(data=>
            setTheme(data)).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Menu/>
                </Col>
                <Col md={9} className="mt-5">
                    <Container>
                        
                    <h1>{theme.data.data.attributes.Name}</h1>
                    <ReactMarkdown >{theme.data.data.attributes.Theory}</ReactMarkdown>

                    <Button variant="success" href={"/variant/"+ id}>Сдать тест</Button>
                    </Container>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default Theme;