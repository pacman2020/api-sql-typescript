import { Request, Response } from 'express'
import { User } from '../interface/User'
import { register, find_email, show_user } from '../services/userService'
import bcrypt from 'bcrypt'


export async function insert_users (request: Request, response: Response): Promise<Response> {
    const newUser: User = request.body
    const user = await find_email(newUser.email)
    

    if(user){
        return response.json({'message': 'email is already registered in our system'})
    }

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash
    
    await register(newUser)
    return response.json({'message': 'user created successfully'})
}

export async function find_by_id_user (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const user = await show_user(id)

    if(!user){
        return response.json({'message': 'user not found'})
    }

    return response.json({'message': user})
}
