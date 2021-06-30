import { Request, Response } from 'express'
import { Session } from '../interface/Session'
import { find_email } from '../services/userService'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function session (request: Request, response: Response): Promise<Response> {
    const sessionUser: Session = request.body
    const user = await find_email(sessionUser.email)
    
    if(!user){
        return response.json({'message': 'email ou senha estão incorretos'})
    }

    //vericando senha com hash
    const hash = bcrypt.compareSync(sessionUser.password, user['password']);
    
    if(!hash){
        return response.json({'message': 'email ou senha estão incorretos'})
    }
    
    //gera o token
    const token = jwt.sign({
        id: user['id'],
        username: user['username']
    }, process.env.SECRET_KEY , { expiresIn: "5d" })

    return response.status(200).json({'message': token })
}