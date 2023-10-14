import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, ProgressBar, Row, Spinner} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import Menu from "../components/Menu";
import {archiveError, getErrors} from "../http/api";
import {observer} from "mobx-react-lite";

const Errors = observer(() => {
    const [errors, setErrors] = useState({info: []});
    const [loading, setLoading] = useState(true);

    const [isShowArchive, setIsShowArchive] = useState(false);

    useEffect(() => {
        getErrors().then(data=>
            setErrors(data.data.data)).finally(() => setLoading(false));
    }, []);

    const setArchiveError = (id, archive) => {
        setLoading(true)
        archiveError(id, archive)
            .then(data => getErrors().then(data=>setErrors(data.data.data)).finally(() => setLoading(false)));
    };

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Menu/>
                </Col>
                <Col md={9} className="mt-5">
                    <Container>
                        <h2>Ошибок: {errors.filter(error=>error.attributes.question.data.attributes!==undefined && error.attributes.Archived===isShowArchive).length}</h2>
                        <div className="d-flex justify-content-end">
                            <a className="mr-auto" onClick = {()=> setIsShowArchive(!isShowArchive)}>
                                {isShowArchive
                                    ?"Вернуться"
                                    :"Архив"
                                }
                            </a>
                        </div>
                    </Container>
                    {errors.filter(error=>error.attributes.question.data.attributes!==undefined && error.attributes.Archived===isShowArchive).map(error=>
                        <Alert key={error.id} variant="warning">
                            <p>
                                {error.attributes.question.data.attributes.Number}. {error.attributes.question.data.attributes.Question}
                            </p>
                            <hr />
                                Вы ответили: {error.attributes.Answer}. Правильный ответ: {error.attributes.question.data.attributes.Answer}
                            <div className="d-flex justify-content-end">
                                <Button onClick = {()=> setArchiveError(error.id, !isShowArchive)} variant="outline-success">
                                    {isShowArchive
                                        ?"Убрать из архива"
                                        :"Выполнено"
                                    }
                                </Button>
                            </div>
                        </Alert>
                    )}

                </Col>
            </Row>
        </Container>
    );
});

export default Errors;