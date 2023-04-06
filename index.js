const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios")

const token = 'BOT_TOKEN';

const bot = new TelegramBot(token, {polling: true});

async function instagramdanYuklovchilar(urlID){
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-story-downloader-media-downloader.p.rapidapi.com/index',
            params: {url: `${urlID}`},
            headers: {
                'X-RapidAPI-Key': 'bc92119f8cmsh0007b4a612d38e0p13049ejsn6da50514bb7f',
                'X-RapidAPI-Host': 'instagram-story-downloader-media-downloader.p.rapidapi.com'
            }
        };

        return await axios.request(options)

    } catch (error) {
        console.log("Error");
    }
}

bot.on('message', (msg) => {
  const userID = msg.from.id

  if(msg.text == "/start"){
    bot.sendMessage(userID, "Salom bu bot Instagramdan video yuklaydi...")
  }
  else{
    try {
        const video = instagramdanYuklovchilar(msg.text)
        video.then(res => {
            bot.sendVideo(userID, res.data.media, {caption: "Mana sizning videoyingiz!"})
        }).catch(err => {
            console.log("Error");
        })
    } catch (error) {
        console.log("Error");
    }
  }
});