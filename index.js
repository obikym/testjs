const TelegramApi = require('node-telegram-bot-api')

const token = '5559401316:AAEF4BdyWEShX7m-IyMq9CPlnx4BuG1C8z0'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;
if (text === '/start') {
  bot.sendMessage(chatId, "привет", {
    "reply_markup": {
        "keyboard": [["цукцуауцаца"]]
        }
    });
  }
})
