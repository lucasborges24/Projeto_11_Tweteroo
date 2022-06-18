import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const data = req.body
    if (data.username.length === 0 || data.avatar.length === 0 ) {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        users.push(data)
        res.status(201).send("OK")
    }
})

app.post("/tweets", (req, res) => {
    const data = req.body
    const user = req.headers.user

    if (data.tweet.length === 0 || user.length === 0) {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        tweets.push({
            username: user,
            avatar: users.find(i => i.username === user).avatar,
            tweet: data.tweet,
        })
        res.status(201).send("OK")
    }
    
})

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);
    if (page === undefined || page < 1) {
        res.status(400).send("Informe uma página válida!")
    } else {
        const tweetsFiltered = filter(10, page);
        res.send(tweetsFiltered)
    }
})

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username
    const userTweets = tweets.filter(i => i.username === username)
    res.send(userTweets)
})

function filter(filterNumber, page) {
    let tweetsFiltered = [];
    let reverseTweets = [...tweets].reverse();
    tweetsFiltered = [...reverseTweets].slice((filterNumber * (page-1)), (filterNumber * page))

    return tweetsFiltered;
}

app.listen(5000);

