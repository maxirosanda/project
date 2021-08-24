import express from 'express'
import http from 'http'
import  config from './config/config.js'
import { routes } from './src/routes/routes.js'
import morgan from 'morgan'
import { conectarDB } from './config/db.js'
import passport from 'passport'
import session from 'express-session'
import { ConectarPassport } from './passport/passport.js'
import MongoStore from 'connect-mongo'
import handlebars  from "express-handlebars"
import cookieParser from "cookie-parser"
import path from 'path'
import methodOverride from 'method-override'
import fileUpload from 'express-fileupload'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const __dirname = path.resolve();


app.use(morgan('dev'))

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
   // dir for windows PC
    tempFileDir: path.join(__dirname, './tmp'),
  }),
);
//app.use(cors())
//app.use(cookieParser())

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
conectarDB()

app.engine("hbs", handlebars({
  extname: "hbs",
  defaultLayout: "index",
  layoutsDir: path.join(__dirname, "/src/views/layouts"),
  partialsDir: path.join(__dirname, "/src/views/partials"),
}));
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'hbs');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl:config.BASE,
    mongoOptions: advancedOptions,
    collectionName: 'sessions',
    ttl: 10 * 60
  })
}))

ConectarPassport()
app.use(passport.initialize())
app.use(passport.session())
routes(app)


const port = config.PORT|| '3000'
app.set('port', port)
server.listen(port).on('error', error => {
  console.log(`server error:${error}`)
})
console.log('Server listening  on port ' + port + ' pid:' + process.pid)