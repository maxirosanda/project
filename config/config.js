import dotenv from 'dotenv'

dotenv.config();


 const config = {
    //NODE_ENV: process.env.NODE_ENV || 'development',
    //HOST: process.env.HOST,
    PORT:process.env.PORT,
    //MODO:process.env.MODO,
    MAIL:process.env.MAIL,
    PASSWORDMAIL:process.env.PASSWORDMAIL,
    BASE:process.env.BASE

}

export default config
