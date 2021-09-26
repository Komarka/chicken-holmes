const helpers = require('./helpers.js');

const CITY_KEYBOARD  =  [
    [
      {
        text: 'Киев',
        callback_data: 'City@setCity:Киев',
      }
    ],
    [
      {
        text: 'Харьков',
        callback_data: 'City@setCity:Харьков',
      }
    ],
  ];

const EVENT_TYPE_KEYBOARD  =  [
    [
      {
        text: 'Все',
        callback_data: 'EventType@setEventType:all',
      }
    ],
    [
      {
        text: 'Фестивали',
        callback_data: 'EventType@setEventType:фестивали',
      }
    ],
    [
      {
        text: 'Экскурсии',
        callback_data: 'EventType@setEventType:экскурсии',
      }
    ],
    [
      {
        text: 'Концерты',
        callback_data: 'EventType@setEventType:концерты',
      }
    ],
    [
      {
        text: 'Stand-up',
        callback_data: 'EventType@setEventType:stand-up',
      }
    ],
    [
      {
        text: 'Кино',
        callback_data: 'EventType@setEventType:кино',
      }
    ],
    [
      {
        text: 'Выставки',
        callback_data: 'EventType@setEventType:выставки',
      }
    ],
  ];

const BUDGET_KEYBOARD  =  [
    [
      {
        text: 'до 500 грн',
        callback_data: 'Budget@lowBudgetHandler',
      }
    ],
    [
      {
        text: 'до 1000 грн',
        callback_data: 'Budget@mediumBudgetHandler'
      }
    ],
    [
      {
        text: 'от 1000 грн',
        callback_data: 'Budget@highBudgetHandler'
      }
    ]
  ];

  

  module.exports = {
    BUDGET_KEYBOARD,
    CITY_KEYBOARD,
    EVENT_TYPE_KEYBOARD,
    EVENT_DATE_KEYBOARD: helpers.generateEventTypeKeyboard(),
}