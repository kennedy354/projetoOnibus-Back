import express, {Express, Request, Response} from 'express'
import mongoose from 'mongoose'
import router from './src/routes/routes'

const app: Express = express()
const port = 8080

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(router)

//senha mongo 123
mongoose
.connect('mongodb+srv://kennedy:123@cluster0.vantho4.mongodb.net/')
.then(()=> {
    app.listen(port, () => {
        console.log(`O servidor está no link http://localhost:${port}`)
    })
})
.catch((err)=> console.log(err))
