import dotenv from 'dotenv'

dotenv.config();


 const config = {
    PORT:process.env.PORT,
    MAIL:process.env.MAIL,
    PASSWORDMAIL:process.env.PASSWORDMAIL,
    BASE:process.env.BASE

}

export default config
