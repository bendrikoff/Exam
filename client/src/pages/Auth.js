import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const {loginPage} = useContext(Context);

    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = loginPage.login;
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')

    const [isLoginPage, setLogin] = useState('')

    const click = async () => {
        if(validation()) {
            try {
                let data;
                if (isLogin) {
                    data = await login(email, password);
                } else {
                    data = await registration(username, email, password);
                }
                user.setUser(data.user)
                user.setIsAuth(true)
                user.setId(data.user.id)
                navigate(MAIN_ROUTE)
            } catch (e) {
                alert(e.response.data?.error.message);
                alert(e.response.data?.message[0]);
            }
        }

    }

    const validation=()=>{
        if(!isLogin&&username==''){
            setUsernameError('Поле не может быть пустым');
            return false;
        }
        if(email==''){
            setEmailError('Поле не может быть пустым');
            return false;
        }
        if(password==''){
            setPasswordError('Поле не может быть пустым');
            return false;
        }
        if(!isLogin&&username.length<3){
            setPasswordError('Слишком короткий логин');
            return false;
        }
        if(password.length<3){
            setPasswordError('Слишком короткий пароль');
            return false;
        }
        if(!email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )){
            setEmailError('Введите корректный e-mail');
            return false;
        }
        return true
    }
    const onChangeUsername=(text)=>{
        setUsername(text)
        setUsernameError('')
    }

    const onChangeEmail=(text)=>{
        setEmail(text)
        setEmailError('')
    }

    const onChangePassword=(text)=>{
        setPassword(text)
        setPasswordError('')
    }

    const onChangeLoginPage=(isLoginPage)=>{
        setLogin(isLoginPage);
        loginPage.login =  isLoginPage;
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin?
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш логин"
                            value={username}
                            onChange={e => onChangeUsername(e.target.value)}
                        />
                        :
                        <></>
                    }
                    {!isLogin&&usernameError==''?
                        <></>
                        :
                        <div style={{visibility:"visible",color:"red"}}>{usernameError}</div>
                    }

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => onChangeEmail(e.target.value)}
                    />
                    {emailError==''?
                        <></>
                        :
                        <div style={{visibility:"visible",color:"red"}}>{emailError}</div>
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => onChangePassword(e.target.value)}
                        type="password"
                    />
                    {passwordError==''?
                        <></>
                        :
                        <div style={{visibility:"visible",color:"red"}}>{passwordError}</div>
                    }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>

                        <Row className="mt-3">
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <Button size="sm" onClick={() => onChangeLoginPage(false)}>Зарегистрируйтесь!</Button>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <Button  size="sm" onClick={() => onChangeLoginPage(true)}>Войдите!</Button>
                                </div>
                            }
                        </Row>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
