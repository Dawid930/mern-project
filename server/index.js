import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js'

const app = express();

app.use('/posts', postRoutes) // code from posts.js will be reached by /posts and not just '/'

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true})) //bodyparser is needed to properly send the requests
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://digitalwarrior:digitalwarrior123123@cluster0.2pxcrrh.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 9000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

//mongoose.set('useFindAndModify', false) // not to get warnings to the console, it crashes if not commented out