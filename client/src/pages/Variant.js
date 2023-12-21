import React, {useContext,useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import Menu from "../components/Menu";
import {
    addError,
    archiveError,
    getError,
    getErrorByQuestionId,
    getQuestions,
    getQuestionsByTheme,
    getTheme,
    userLearnTheme,
    setErrorUser,
    getDayPassTheme, createDayPassTheme, addDayPassTheme
} from "../http/api";
import {observer} from "mobx-react-lite";
import { useParams } from "react-router-dom";
import {Context} from "../index";
import {adress} from "../components/Consts";


const Variant = observer(() => {
    const {user} = useContext(Context);
    const {themeId} = useParams();
    let errorAnswers = 0;
    let correctAnswers = 0;
    const [errors, setErrors] = useState(0);
    const [corrects, setCorrects] = useState(0);

    const [questions, setQuestions] = useState([]);

    const [isTesting, setIsTesting] = useState(true);

    const [finishText, setFinishText] = useState("");

    const [loading, setLoading] = useState(true);

    if(themeId) { 
        useEffect(() => {
            getQuestionsByTheme(themeId).then(data=>setQuestions(data.data.data)).finally(() => setLoading(false));
        }, []);
    } else {
        useEffect(() => {
            getQuestions().then(data=>setQuestions(data.data.data)).finally(() => setLoading(false));
        }, []);
    }

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

        setFinishText(correctAnswers >= errorAnswers ?
            "Отличный результат! Ты изучил тему, приступай к следующей."
            : "Ты недостаточно изучил тему. Еще раз повтори и попробуй позже.");

        if(correctAnswers >= errorAnswers){
            getTheme(themeId)
                .then(data => userLearnTheme(user.id, data.data.data.id));
            getDayPassTheme(themeId, user.id)
                .then(data => {
                    if(data.data.data.length == 0) {
                        createDayPassTheme().then(data =>
                            addDayPassTheme(themeId,user.id,data.data.data.id));
                    }
                });
        }
        setAnswers(array);
        setIsTesting(false);
    }

    function addToErrors(questionId,answer){
        getErrorByQuestionId(questionId, user?.user.id).then(data=>{
            if(data.data.data.length==0){
                addError(questionId,answer,user?.user)
                    .then(data=> setErrorUser(data.data.data.id, user.user.id));
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
                        {questions?.map(question=>
                            <Card key={question.id} className={"mb-3"}>
                                <Container className={"mt-3"}>
                                    <Card.Text>
                                        {question.attributes.Question}
                                    </Card.Text>
                                </Container>
                                {question?.attributes?.Image?.data
                                    ? <Image src={adress + question.attributes.Image.data.attributes.url} style={{ width: 150 }} />
                                    : <div></div>
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
                                :<h3>Верных ответов: {corrects}. Ошибок: {errors}.<p>{finishText}</p></h3>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>

    );
})

export default Variant;