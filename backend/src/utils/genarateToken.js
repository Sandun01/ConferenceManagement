import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '45m'
    })
}

export default generateToken