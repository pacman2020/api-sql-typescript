import { connect } from '../database'


export async function register (newUser){
    const conn = await connect()
    // console.log(newUser)
    const data = [newUser.username, newUser.email, newUser.password]
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    const result = await conn.query(sql, data)
    return result
}

export async function find_email (email){
    const conn = await connect()
    const sql = 'SELECT * FROM users WHERE email=?'
    const result = await conn.query(sql, [email])

    if (Object.values(result[0]).length > 0){
        return true
    }
    return false
}