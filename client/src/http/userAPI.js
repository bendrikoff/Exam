import {$authHost,$host} from "./index";

export const registration = async(username,email,password) =>{
    const {data} = await $host.post('/api/auth/local/register', {username:username,email:email, password:password})
    console.log(data)
    localStorage.setItem('token',data.jwt)
    return data
}
export const login = async(email,password) =>{
    const {data} = await $host.post('/api/auth/local', {identifier:email, password:password})
    localStorage.setItem('token',data.jwt)
    return data
}
export const check = async() =>{
    const {data} = await $authHost.get('/api/users/me?populate=*')
    return data
}

export const upload = async(form) =>{
    const {data} = await $authHost.post('/api/upload', {form})
    return data
}

export const updateAvatar = async(Avatar,userId) =>{
    const {data} = await $authHost.put('/api/users/' + userId, {Avatar})
    return data
}