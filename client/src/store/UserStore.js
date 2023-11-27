import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
         this._isAuth=false
         this._user= {}
         this._id=-1
         this._userRequest={}
         makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth=bool
    }
    setUser(user){
        this._user=user
    }
    setId(id){
        this._id=id
    }
    setUserRequest(userReq){
        this._userRequest=userReq
    }


    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
    get id(){
        return this._id
    }
    get userReq(){
        const req ={
            "id": this._id,
            "attributes": {
                "username": this._user.username,
                "email": this._user.email,
                "provider": this._user.provider,
                "confirmed": this._user.confirmed,
                "blocked": this._user.blocked,
                "createdAt": this._user.createdAt,
                "updatedAt": this._user.updatedAt
            }
        }
        return req
    }


}