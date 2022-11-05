const TelegramApi = require("node-telegram-bot-api");

const token = "5559401316:AAEF4BdyWEShX7m-IyMq9CPlnx4BuG1C8z0";
const bot = new TelegramApi(token, { polling: true });
const chats = {};

var client = { phone: "", name: "" , payment: "" };

var state = "";

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const button = "Ввести продажу";

  if (text === "/start") {
    bot.sendMessage(chatId, "привет", {
      reply_markup: {
        keyboard: [["Ввести продажу"]],
      },
    });
    state = "";
  }

  if (text.indexOf(button) === 0) {
    bot.sendMessage(chatId, "Введите телефон клиента");
    state = "tel";
  } else if (state === "tel") {
    client.phone = text;
    bot.sendMessage(chatId, "Введите имя клиента");
    state = "name";
  } else if (state === 'name') {
    client.name = text;
    bot.sendMessage(chatId, "Введите сумму платежа клиента")
    state = "payment";
  }
  else if (state === 'payment') {
    client.payment = text;
    bot.sendMessage(chatId, "Имя, телефон и сумма платежа успешно записаны")
  }
});
