import {$host} from "./index";

const token = 'ec388f23bd17cca9765daa9c9fc6da256ba20cde18f774fe8df17e14d93a3daafa183036828144a79d318deb3ee4ac5a4da5ed3bbcf44b0e81705cd32bc2b300ab025e643368056fa63e498dd5b070491366c367cfd49329be4c890efa481db41458ae287955346b0b405cbb96a961c9967bdbf157821915c87bb85f5dd09e8f';


export const getQuestions = async () => {

    const data = $host.get('api/questions?populate=*' ,
        { headers: {"Authorization" : `Bearer ${token}`}
        })
    return data;
}

export const getQuestionsByTheme = async (themeId) => {

    const data = $host.get('api/questions?populate[Image]=*&filters[theme][id][$eq]='+ themeId ,
        { headers: {"Authorization" : `Bearer ${token}`}
        })
    return data;
}

export const getErrors = async () => {

    const data = $host.get('api/errors?populate=*' ,
        { headers: {"Authorization" : `Bearer ${token}`}
        })
    return data;
}
export const getUserErrors = async (userId) => {
    const data = $host.get('api/errors?populate=*&filters[user][id][$eq]='+userId ,
        { headers: {"Authorization" : `Bearer ${token}`}
        })
    return data;
}
export const addError = async (id,answer,user) => {
    const data = $host.post('api/errors/',
        { data: {Archived:false,question:id,Answer:answer,user:user},
        })
    return data;
}

export const getErrorByQuestionId = async (id, userId) => {
    const data = $host.get('api/errors?filters[question][id][$eq]='+ id + '&filters[user][id][$eq]='+userId)
    return data;
}

export const archiveError = async (id, archive) => {
    const data = $host.put('api/errors/'+ id ,
        { data: {Archived:archive},
        })
    return data;
}

export const getSections = async () => {

    const data = $host.get('api/sections?populate=*' ,
        { headers: {"Authorization" : `Bearer ${token}`}
        })
    return data;
}

export const getTheme = async (id) => {

    const data = $host.get('api/themes/'+id+'?populate=*',
        {
            headers: { "Authorization": `Bearer ${token}` }
        });
    return data;
}

export const userLearnTheme = async (userId, themeId) => {
    const data = $host.put('/api/themes/' + themeId,
        {
            data: { users: {connect: [userId]}},
        });
    return data;
}

export const setErrorUser = async (error, user) => {
    const data = $host.put('/api/errors/' + error,
        {
            data: { user: user},
        });
    return data;
}
export const createDayPassTheme = async () => {
    const data = $host.post('/api/day-pass-themes',
        {
            data: {},
        });
    return data;
}

export const addDayPassTheme = async (theme, user,day) => {
    const data = $host.put('/api/day-pass-themes/'+ day,
        {
            data: {
                user: user,
                theme:theme,
                date: new Date()
            },
        });
    return data;
}

export const getDayPassTheme = async (theme, user) => {
    const data = $host.get('/api/day-pass-themes/?filters[theme][id][$eq]='+ theme + '&filters[user][id][$eq]=' + user,
        {
            headers: { "Authorization": `Bearer ${token}` },
        });
    return data;
}

export const getDayPassThemeByUser = async (user) => {
    const data = $host.get('/api/day-pass-themes/?&filters[user][id][$eq]=' + user,
        {
            headers: { "Authorization": `Bearer ${token}` },
        });
    return data;
}
