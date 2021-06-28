import { Request, Response } from 'express'
import { User } from '../interface/User'
import { register, find_email } from '../services/userService'
import bcrypt from 'bcrypt'

//verifica se email ja esta cadastrado

export async function insert_users (request: Request, response: Response): Promise<Response> {
    const newUser: User = request.body
    const email = await find_email(newUser.email)

    if(email){
        return response.json({'message': 'email ja esta cadastrado no nosso sistema'})
    }

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash
    
    await register(newUser)
    return response.json({'message': 'created'})
}