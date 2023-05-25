import express, { Request, Response } from "express";
import createError from "http-errors";
import apiBlog from "./routes/apiBlog";


const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
apiBlog(app)

app.use((req: Request, res: Response, next: Function) => {
    next(createError(404))
})

app.listen(port, ()=>
console.log(`Server is running on port ${port}`) 
)