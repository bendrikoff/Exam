import React, {useEffect, useState} from 'react';
import {Badge, Button, Image, Spinner, Stack} from "react-bootstrap";
import lamp from "../Images/Education_Icon_Set-07.png";
import errors from "../Images/Education_Icon_Set-12.png";
import variants from "../Images/Education_Icon_Set-04.png";
import profile from "../Images/Education_Icon_Set-10.png";
import {getErrors} from "../http/api";

const Menu = () => {
    const [errorsList, setErrors] = useState({info: []});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getErrors().then(data=>setErrors(data.data.data)).finally(() => setLoading(false));
    }, []);
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <Stack gap={2} className="mx-auto">
            <h2 color="#6D3CFC">InfoExam</h2>
            <Button variant="light" href="/"><Image style={{width:15, marginRight:5}} src={lamp} />План</Button>
            <Button variant="light" href="/variant"><Image style={{width:15, marginRight:5}} src={variants} />Варианты</Button>
            <Button variant="light" href="/errors"><Image style={{width:15, marginRight:5}} src={errors} />Ошибки
                {errorsList.filter(error=>error.attributes.question.data.attributes!==undefined && error.attributes.Archived===false).length > 0
                    ?<Badge bg="danger">{errorsList.filter(error=>error.attributes.question.data.attributes!==undefined && error.attributes.Archived===false).length}</Badge>
                    :<div></div>}
            </Button>
            <Button variant="light" href="/profile"><Image style={{width:15, marginRight:5}} src={profile} />Профиль </Button>
            <Button variant="light" href="/profile"><Image style={{width:15, marginRight:5}} src={profile} />Выйти </Button>


        </Stack>
    );
};

export default Menu;