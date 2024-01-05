import express from "express"
import {json} from 'body-parser'
import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"
import { errorHandler } from "./middlewares/error-handler"
import { NotFoundError } from "./errors/not-found-error"
import mongoose, { mongo } from "mongoose"

const app = express()
app.use(json())

app.all('*', async (req, res, next) => {
    next(new NotFoundError())
    
})

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    }

    catch(err) {
        console.error(err)
    }
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
    console.log('Listening on port 3000!!!')
    })
}

start()



