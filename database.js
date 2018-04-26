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
    
    if (!item.id) {
      item.id = this.generateId();
      sublist.items.push(item);
    }
    else {
      let index = sublist.items.findIndex(i => i.id === item.id);
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
  },
  
  
  countOpenItems(listId) {
    let list = this.getList(listId);
    return list ? list
      .reduce((count, sublist) => sublist.items.filter(item => !item.checked).length + count, 0) : 0;
  }
}


module.exports = database;
