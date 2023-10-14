import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import Menu from "../components/Menu";
import {addError, archiveError, getError, getErrorByQuestionId, getQuestions} from "../http/api";
import {observer} from "mobx-react-lite";

const Variant = observer(() => {
    let errorAnswers = 0;
    let correctAnswers = 0;
    const [errors, setErrors] = useState(0);
    const [corrects, setCorrects] = useState(0);

    const [questions, setQuestions] = useState({info: []});

    const [isTesting, setIsTesting] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuestions().then(data=>setQuestions(data.data.data)).finally(() => setLoading(false));
    }, []);

    const [answers,setAnswers] = useState([]);


    function onClick(){
        let array = [];
        let index =0;
        Array.prototype.forEach.call(document.getElementsByClassName("form-control"), function(el) {
            el.setAttribute("disabled", "");
            if(el.value!=questions[index].attributes.Answer){
                el.setAttribute("class", "form-control is-invalid");
                console.error("Ответ "+index+" должен быть равен "+questions[index].attributes.Answer);
                console.error("Было введено: "+el.value+" должен быть равен "+questions[index].attributes.Answer);
                el.value = `Вы ввели ${el.value}. Правильный ответ:${questions[index].attributes.Answer}`
                setErrors(++errorAnswers);
                addToErrors(questions[index].id,el.value);
            }else {
                el.setAttribute("class", "form-control is-valid");
                setCorrects(++correctAnswers);
            }
            index++;
            array.push(el.value);
        });
        setAnswers(array);
        setIsTesting(false);
    }

    function addToErrors(questionId,answer){
        getErrorByQuestionId(questionId).then(data=>{
            console.log(data.data.data)
            if(data.data.data.length==0){
                addError(questionId,answer);
            }
        })
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    console.log(questions);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Menu/>
                </Col>
                <Col md={9} className="mt-5">
                    <Container>
                        <h2></h2>
                        <div className="d-flex justify-content-end">
                        </div>
                    </Container>
                    <Form>
                        {questions.map(question=>
                            <Card key={question.id} className={"mb-3"}>
                                <Container className={"mt-3"}>
                                    <Card.Text>
                                        {question.attributes.Number}. {question.attributes.Question}
                                    </Card.Text>
                                </Container>
                                {question.attributes.Image.data
                                    ?<Image src={'http://localhost:1337'+question.attributes.Image.data.attributes.url}  style={{width:150}}/>
                                    :<div></div>
                                }
                                <Card.Body>
                                        <Form.Group controlId="answerText">
                                            <Form.Control type="text" placeholder="Введите ответ" />
                                        </Form.Group>
                                </Card.Body>
                            </Card>
                        )}
                        {
                            isTesting
                                ?<Button onClick={onClick} variant="primary">Отправить</Button>
                                :<h3>Верных ответов: {corrects}. Ошибок: {errors}.<p>Отличный результат, продолжайте в том же духе!</p></h3>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>

    );
})

export default Variant;