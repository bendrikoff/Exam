import {Context} from '../index';
import {Alert, Button, Col, Container, Image, Row, Stack, ToggleButton,Form } from "react-bootstrap";
import Menu from "../components/Menu";
import Chart from "../components/Chart";
import {useContext, useState} from "react";
import { updateAvatar } from '../http/userAPI';
import axios from 'axios';
import profile from "../Images/Education_Icon_Set-19.png";



const Profile = () => {
    const {user} = useContext(Context);
    const [file, setFile] = useState({})


    const data = [
        { dayOfWeek: "Mon", numSolvedTasks: 5 },
        { dayOfWeek: "Tue", numSolvedTasks: 8 },
        { dayOfWeek: "Wed", numSolvedTasks: 3 },
        { dayOfWeek: "Thu", numSolvedTasks: 12 },
        { dayOfWeek: "Fri", numSolvedTasks: 7 },
        { dayOfWeek: "Sat", numSolvedTasks: 9 },
        { dayOfWeek: "Sun", numSolvedTasks: 4 },
    ];
    const  dataOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
      };
    
    const registrationDate = new Date(user._user.createdAt).toLocaleString("ru", dataOptions);

    const handleChange = (event) => {
        console.log(event.target.files);
        setFile({file:event.target.files[0]})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData();
        data.append('files',file.file);
        if (file) {
            const fileType = file.file?.type;
      
            if (fileType === 'image/jpeg' || fileType === 'image/png') {
                const uploadRes = await axios({
                    method: 'POST',
                    url: 'http://localhost:1337/api/upload',
                    data
                }).then(data => {
                    updateAvatar(data.data[0], user._id).then(
                        window.location.reload(false)
                    )
                }
                )
            } else {
                alert("Выберите изображения формата png или jpg")
            }
        }
    }

    const avatar = user?._user?.Avatar?.url;
    const avatarPath = "http://localhost:1337" + user?._user?.Avatar?.url;
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Menu/>
                </Col>
                <Col md={9} className="mt-5">
                    <Container>
                        <Stack direction="horizontal" gap={3}>
                            <Image src={avatar
                                    ?avatarPath
                                    :profile } style={{width:150}} roundedCircle />
                            <Stack direction="vertical" className={"mt-4"}>
                                <h2>{user._user.username}</h2>
                                На сайте с: {registrationDate}
                            </Stack>
                        </Stack>
                        <form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control style={{width: 300}} accept="image/jpeg, image/png" onChange = {handleChange}className={"mt-2"} type="file" />
                            <Button style={{width: 300}} className={"mt-2"} type={"submit"}>Загрузить аватар</Button>
                        </Form.Group>
                        </form>

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