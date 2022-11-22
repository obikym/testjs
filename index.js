const TelegramApi = require("node-telegram-bot-api");

const token = "5559401316:AAFSI0zmDw34TiwZ2JOMvQ6AZAuIwbKif_k";
const bot = new TelegramApi(token, { polling: true });
const chats = {};

var client = { phone: "", name: "" , payment: "" , share: ""};

var state = "";

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const button = "Ввести продажу";

  if (text === "/start") {
    bot.sendMessage(chatId, "привет", {
      reply_markup: {
        keyboard: [["Ввести продажу"]],
        resize_keyboard: true
      },
    });
    state = "";
  };

  if (text.indexOf(button) === 0) {
    bot.sendMessage(chatId, "Введите телефон клиента");
    state = "tel";
  } else if (state === "tel") {;
    client.phone = text;
    bot.sendMessage(chatId, "Введите имя клиента");
    state = "name";
  } else if (state === 'name') {
    client.name = text;
    bot.sendMessage(chatId, "Введите сумму платежа клиента");
    state = "payment";
  }
  else if (state === 'payment') {
    client.payment = text;
    if (isNaN(client.payment) === false) {
    bot.sendMessage(chatId, "Имя, телефон и сумма платежа успешно записаны");  
    state = "share";     
    }
    if (isNaN(client.payment) === true) {
      bot.sendMessage(chatId, "Вы ошиблись, введите число.");
    }
  }
  if (state === "share") {
    bot.sendMessage(chatId, "Какую долю вы получаете?", {
      "reply_markup": {
          "inline_keyboard": [
              [
                  {
                      text: "30%",
                      callback_data: "30",
                  },
                  {
                    text: "35%",
                    callback_data: "35",
                },
                {
                  text: "40%",
                  callback_data: "40",
              },
              ],
          ],
          
      },
  });
  state = "";
   }

});

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, "Успешно записано!"));
      client.share = callbackQuery.data;
      console.log(client.share)
});
