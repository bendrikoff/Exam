import {Context} from '../index';
import {Alert, Button, Col, Container, Image, Row, Stack, Spinner,Form } from "react-bootstrap";
import {getDayPassThemeByUser, getUserErrors} from "../http/api";
import Menu from "../components/Menu";
import Chart from "../components/Chart";
import {useEffect,useContext, useState} from "react";
import { updateAvatar } from '../http/userAPI';
import axios from 'axios';
import profile from "../Images/Education_Icon_Set-19.png";
import {$host} from "../http/index";
import {adress} from "../components/Consts";



const Profile = () => {
    const {user} = useContext(Context);
    const [file, setFile] = useState({})

    const [errorsCount, setErrorsCount] = useState(0);
    const [archivedErrorsCount, setArchivedErrorsCount] = useState(0);
    const [passedVariants, setPassedVariants] = useState({});
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [monthData, setMonthData] = useState([]);


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
                    url: adress+'/api/upload',
                    data
                }).then(data => {
                    updateAvatar(data.data[0], user._id).then(
                        window.location.reload(false)
                    )
                });
            } else {
                alert("Выберите изображения формата png или jpg")
            }
        }
    }

    useEffect(() => {
        getUserErrors(user.id)
            .then(data=>{
                setErrorsCount(data?.data?.data?.length);
                setArchivedErrorsCount(data?.data?.data?.filter(x=> x.attributes.Archived == true).length);
            })
            .finally(() => setLoading(false));
        getDayPassThemeByUser(user.id)
            .then(data=>{
                setPassedVariants(data?.data?.data);
                // Ваш массив объектов
                var objects = data?.data?.data;

                var dateCounter = {};

                for (var i = 0; i < objects.length; i++) {
                    var date = new Date(objects[i].attributes?.date);
                    var formattedDate = date.toISOString().split('T')[0];
                    dateCounter[formattedDate] = (dateCounter[formattedDate] || 0) + 1;
                }

                var result = [];
                for (var i = 6; i >= 0; i--) {
                    var currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - i);
                    var formattedDate = currentDate.toISOString().split('T')[0];
                    var dayOfWeek = getDayOfWeek(currentDate.getDay());
                    result.push({day: dayOfWeek,решено: dateCounter[formattedDate] || 0 });
                }
                setData(result);
                function getDayOfWeek(dayIndex) {
                    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
                    return daysOfWeek[dayIndex];
                }

                var monthCounter = {};

                for (var i = 0; i < objects.length; i++) {
                    var month = new Date(objects[i].attributes?.date).toLocaleString('ru-RU', { month: 'long' });
                    monthCounter[month] = (monthCounter[month] || 0) + 1;
                }

                var currentMonth = new Date().toLocaleString('ru-RU', { month: 'long' });

                var monthData = [];
                for (var i = 5; i >= 0; i--) {
                    var month = new Date();
                    month.setMonth(month.getMonth() - i);
                    var formattedMonth = month.toLocaleString('ru-RU', { month: 'long' });
                    monthData.push({ month: formattedMonth, решено: monthCounter[formattedMonth] || 0 });
                }

                setMonthData(monthData);

            })
            .finally(() => setLoading(false));
    }, []);


    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    const avatar = user?._user?.Avatar?.url;
    const avatarPath = adress + user?._user?.Avatar?.url;
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
                                <Alert variant="success" className="mx-auto">
                                    <h5>Допущено ошибок: {errorsCount}</h5>
                                </Alert>
                                <Alert variant="warning" className="mx-auto">
                                    <h5>Исправлено ошибок: {archivedErrorsCount}</h5>
                                </Alert>
                        </Col>
                        <Col md={6}>
                        <Alert variant="primary" className="mx-auto">
                                    <h5>Решено вариантов: {passedVariants.length}</h5>
                                </Alert>
                            <Alert variant="success" className="mx-auto">
                                <h5>Изучено тем: {user.user?.passed_themes?.length}</h5>
                            </Alert>
                        </Col>
                    </Row>
                    <hr />
                    <Stack direction="vertical" className={"mt-4"}>
                        <Chart data={data}  monthData={monthData}/>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;