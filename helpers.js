const generateDateInProperFormat = (dd) => {
    let today = new Date();
  
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd='0'+dd;
    } 
  
    if (mm < 10) {
        mm='0'+mm;
    } 
  
    return `${dd}.${mm}.${yyyy}`;
  }

  const generateEventCalendarKeyboard = () => {
    const keyboardChunkArray1 = [];
    const keyboardChunkArray2 = [];
    const keyboardChunkArray3 = [];
    const keyboardChunkArray4 = [];



    const dt = new Date();
    const daysInMonthArray = Array.from({ length: new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate() });

    daysInMonthArray.forEach((_, index) => {

      const day = (index + 1).toString();
      const dateValue = generateDateInProperFormat(day);
      const keyboardItem = {
          text: day,
          callback_data: `EventDate@setEventDate:${dateValue}`,
      }
      if (day <= 8) {
        keyboardChunkArray1.push(keyboardItem);
      } else if (day > 8 && day <= 16) {
        keyboardChunkArray2.push(keyboardItem);
      } else if (day > 16 && day <= 24) {
        keyboardChunkArray3.push(keyboardItem);
      } else {
        keyboardChunkArray4.push(keyboardItem);
      }
    })
    return [keyboardChunkArray1, keyboardChunkArray2, keyboardChunkArray3, keyboardChunkArray4];
  };
  
  const parsedDataToMergedEntity = (savedData, store) => {
    return savedData.dataTexts.reduce((acc, dataText, index) => {
      const [title, category, city, status, price] = dataText.split('\n\n');
      const link = savedData.links[index];
  
  
      const mappedData = {
        link,
        title: title.trim(),
        category: category.trim().replace(/\n/g,''),
        city: city.split(',')[0],
        status: status ? status.trim().replace(/\n/g,'') : '',
        price: price ? price.trim() : '',
      }
  
      
      if (price && !isNaN(price[0])) {
        const priceArr = mappedData.price.split('-');
        const properPriceCheck = priceArr.length === 2 ?
         +priceArr[1] <= store.budgetDiapasone
          && +price[0] <= store.budgetDiapasone
         : +priceArr[0] <= store.budgetDiapasone;
         const categoryCheck = store.eventType === 'all' ? true : mappedData.category.toLowerCase().includes(store.eventType);
  
        if (mappedData.city == store.city && properPriceCheck && categoryCheck) {
          acc.push(mappedData);
        }
      }
  
      return acc;
    }, [])
  }

  const handleNotFoundResponse = (bot, chatId) => {
    bot.sendMessage(chatId, `Я ничего не смог найти`);
    bot.sendSticker(chatId, 'CAACAgIAAxkBAAEC23hhNJBXz7EE3Ly2rN6VYdu4kdK9PQACdgAD2bxqGnA5M-Aeehp6IAQ');
  }

  module.exports = {
    generateDateInProperFormat,
    parsedDataToMergedEntity,
    generateEventCalendarKeyboard,
    handleNotFoundResponse,
}