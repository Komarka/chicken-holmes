process.env.NTBA_FIX_319 = 1;

// PACKAGE IMPORTS
const osmosis = require('osmosis');

const TelegramBot = require('node-telegram-bot-api');
const BOT_TOKEN = '1929134046:AAHHUZZInKf0S9xFQlD4xI-YNtwGwnJz8dE';
const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});


const Promise = require('bluebird');
Promise.config({
    cancellation: true
});

// SYSTEM IMPORTS
const messages = require('./messages');
const keyboards = require('./keyboards.js');
const helpers = require('./helpers.js');

const StoreClass = require('./store.js');
let store;



// /START command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    store = new StoreClass();
   
    bot.sendMessage(chatId, messages.WELCOME_MESSAGE);

    setTimeout(() => {
       bot.sendMessage(chatId, messages.BUDGET_MESSAGE, {
            reply_markup: {
                inline_keyboard: keyboards.BUDGET_KEYBOARD,
             }
        });
    }, 3000);
    
});

// /NEXT command handler
bot.onText(/\/next/, (msg) => {
  const chatId = msg.chat.id;
  const chunkStart = store.chunkIndex;
  const chunkEnd = store.chunkIndex + 3;
  const isItems = !!store.events[chunkStart];
  if (isItems) {
    store.events.slice(chunkStart, chunkEnd).forEach(event => {
      bot.sendMessage(chatId, event);
      store.chunkIndex += 2;
    })
  } else {
    helpers.handleNotFoundResponse(bot, chatId);
  }
})



// /CATEGORIES event handler
bot.onText(/\/category/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.EVENT_TYPE_MESSAGE, {
    reply_markup: {
        inline_keyboard: keyboards.EVENT_TYPE_KEYBOARD,
     }
  })
})

// /CALENDAR event handler
bot.onText(/\/calendar/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.CALENDAR_MESSAGE, {
    reply_markup: {
        inline_keyboard: helpers.generateEventCalendarKeyboard(),
     }
  })
})

// /CITY event handler
bot.onText(/\/city/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.CITY_MESSAGE, {
    reply_markup: {
        inline_keyboard: keyboards.CITY_KEYBOARD,
     }
  })
})

// /BUDGET event handler
bot.onText(/\/budget/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.BUDGET_MESSAGE, {
    reply_markup: {
        inline_keyboard: keyboards.BUDGET_KEYBOARD,
     }
  })
})




bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    const [className, method] = query.data.split('@');
    const importedClass = require(`./keyboardClasses/${className}.js`);
    const classInstance = new importedClass(store);
    if (method.includes(':')) {
        const [methodName, value] = method.split(':');
        classInstance[methodName](value);
    } else {
        classInstance[method]();
    }
    if (!store.city) {
        bot.sendMessage(chatId, messages.CITY_MESSAGE, {
            reply_markup: {
                inline_keyboard: keyboards.CITY_KEYBOARD,
             }
      });
    } else if (!store.eventDate) {
      bot.sendMessage(chatId, messages.CALENDAR_MESSAGE, {
        reply_markup: {
            inline_keyboard: helpers.generateEventCalendarKeyboard(),
         },
    });
    } else if (!store.eventType) {
        bot.sendMessage(chatId, messages.EVENT_TYPE_MESSAGE, {
            reply_markup: {
                inline_keyboard: keyboards.EVENT_TYPE_KEYBOARD,
             }
      });
    } else {
        bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq0phBqIyiEF3Z1Inf5lXICiNxoW_9gACdAAD2bxqGtx1qD4BXPEkIAQ');
        bot.sendMessage(chatId, messages.SEARCH_MESSAGE);
        const TARGET_URL  = `https://karabas.com/${store.eventDate}-${store.eventDate}`;
        let savedData = [];
        let mappedData = [];
        osmosis
            .get(TARGET_URL)
            .find('.events-list')
            .set({links:['.el-row .el-thin .el-info a:first-child@href'], dataTexts:['.el-row .el-thin']})
            .data((data) => {
              savedData.push(data);
            })
            .done(() => {
              mappedData = savedData.length ?  helpers.parsedDataToMergedEntity(savedData[0], store) : [];

              if (mappedData.length) {
                bot.sendMessage(chatId, `Я нашел ${mappedData.length} cобытий в ${store.city}e !`);
                bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq4FhBtn077L8JmXUYkSnDkU3DVrzcAACgQAD2bxqGoqBaM6k1UoiIAQ');
                store.events = mappedData.map(data => `Название: ${data.title}, Цена: ${data.price}, Детали по ссылке: ${data.link}`);
      
                setTimeout(() => {
                  store.events.slice(0,3).forEach(event => {
                    bot.sendMessage(chatId, event);
                    store.chunkIndex = 3;
                  })
                }, 2000)
              } else {
                helpers.handleNotFoundResponse(bot, chatId);
              }
            });

    }
})