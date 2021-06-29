import { Request, Response } from 'express'
import { Session } from '../interface/Session'
import { find_email } from '../services/userService'
import bcrypt from 'bcrypt'


export async function session (request: Request, response: Response): Promise<Response> {
    const sessionUser: Session = request.body
    const user = await find_email(sessionUser.email)

    if(!user){
        return response.json({'message': 'email ou senha estão incorretos'})
    }

    const hash = bcrypt.compareSync(sessionUser.password, user['password']);
    
    if(!hash){
        return response.json({'message': 'email ou  senha estão incorretos'})
    }
    
    //gera o token

    return response.json({'message': 'session'})
}