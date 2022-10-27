const TelegramApi = require('node-telegram-bot-api')

const token = '5559401316:AAEF4BdyWEShX7m-IyMq9CPlnx4BuG1C8z0'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

bot.on('message', (msg) => {
    const { message_id: originalMessageId, from: { username }, chat: { id: chatId } } = msg;
  
    bot.sendMessage(chatId, `привет, привет! ${username}`, {
      reply_to_message_id: originalMessageId
    });
  })