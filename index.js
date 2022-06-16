import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const data = req.body
    users = data
    console.log(users)
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const data = req.body
    tweets.push({
        username: data.username,
        avatar: users.avatar,
        tweet: data.tweet,
    })
    res.send("OK")
})

app.get("/tweets", (req, res) => {
    res.send(tweets)
})

app.listen(5000);

