const regEx = '([a-zA-Z]w+)W*';

export const corpusFunction = messages => {
  let collection = [];
  let wordArray = messages[0].text.split(' ');
  for (let i = 0; i < wordArray.length; i++) {
    collection.push({key: wordArray[i], value: 0});
  }

  collection.forEach(item => {
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] == item.key) {
        item.value++;
      }
    }
  });
  console.log(collection, '====================== COLLECTION');
};
