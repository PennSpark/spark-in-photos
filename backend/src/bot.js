import { App } from "@slack/bolt"
import { fetchAndUpload } from "./upload"
require('dotenv').config()

const app = new App({
    token: process.env.BOT_TOKEN,
    appToken: process.env.APP_TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    socketMode: true
})

async function startApp() {
    // starts
    await app.start().catch(console.error)
    // send start msg
    await app.client.chat.postMessage({
        token: process.env.BOT_TOKEN,
        channel: "C051TR8RS2U",
        text: "Bot has started >:)"
    })
    console.log("Bot has started.");
}

app.message(async ({ message }) => {
    if (message.files != null) {
        // gets url
        const data = message.files[0]
        const url = data.url_private
        const time = data.created
        const user = data.user

        console.log(time)

        fetchAndUpload(url, time, user)
    } else {
        console.log("No file in message :(")
    }
})

startApp()