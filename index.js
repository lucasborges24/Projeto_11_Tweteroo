import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const data = req.body
    if (data.username.length === 0 || data.avatar.length === 0 ) {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        users = data
        res.status(201).send("OK")
    }
})

app.post("/tweets", (req, res) => {
    const data = req.body
    const user = req.headers.user
    
    if (data.tweet.length === 0) {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        tweets.push({
            username: user,
            avatar: users.avatar,
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

function filter(filterNumber, n) {
    let tweetsFiltered = [];
    let reverseTweets = [...tweets].reverse();

    tweetsFiltered = [...reverseTweets].slice((filterNumber * (n-1)), (filterNumber * n))

    return tweetsFiltered;
}

app.listen(5000);

