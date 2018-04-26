let database = {

  repo : {
    'CON-67' : [
      {
        id: 1,
        title: "lista 1",
        items: [
          { id: 11, checked: false, text: 'item 1.1' },
          { id: 12, checked: false, text: 'item 1.2' },
          { id: 13, checked: true,  text: 'item 1.3' },
          { id: 14, checked: false, text: 'item 1.4' },
        ]
      }, {
        id: 2,
        title: "lista 2",
        items: [
          { id: 21, checked: false, text: 'item 2.1' },
          { id: 22, checked: false, text: 'item 2.2' },
        ]
      }
    ]
  },
  
  generateId() {
    return Math.floor(Math.random() * Math.floor(1000000));
  },
  
  
  saveItem(listId, sublistId, item) {
    let sublist = this.repo[listId].find(sublist => sublist.id === sublistId);
    
    console.log(`sublist ${sublistId}`, sublist);
    console.log('saving item', item);
    
    if (!item.id) {
      item.id = this.generateId();
      sublist.items.push(item);
    }
    else {
      let index = sublist.items.findIndex(i => { console.log('procurando', typeof(i.id), i.id, typeof(item.id), item.id); return i.id === item.id });
      sublist.items[index] = item;
    }
    
    return item;
  },
  
  
  saveSublist(listId, sublist) {
    if (!sublist.id) {
      sublist.id = this.generateId();
    }
    
    if (this.repo[listId]) {
      this.repo[listId].push(sublist);
    }
    else {
      this.repo[listId] = [sublist];
    }
    
    return sublist;
  },
  
  
  getList(listId) {
    let list = this.repo[listId];
    if (!list) {
      list = this.repo[listId] = [];
    }
    return list;
  }
}


module.exports = database;
