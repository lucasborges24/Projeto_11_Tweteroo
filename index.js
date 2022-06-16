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
    const tweetsFiltered = filter(10);
    res.send(tweetsFiltered)
})

function filter(filterNumber) {
    const tweetsFiltered = []
    if (tweets.length < filterNumber) {
        for (let i = tweets.length - 1; i >= 0; i--) {
            tweetsFiltered.push(tweets[i])
        }
    } else {
        for (let i = tweets.length - 1; i >= tweets.length - filterNumber; i--) {
            tweetsFiltered.push(tweets[i])
        }
    }
    return tweetsFiltered;
}

app.listen(5000);

