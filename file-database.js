const diskdb = require('diskdb');


let database = {

  generateId() {
    return Math.floor(Math.random() * Math.floor(1000000));
  },

  db : diskdb.connect('data', ['lists']),

  saveItem(listTitle, sublistId, item) {
    let list = this.getList(listTitle);
    let sublist = list.sublists.find(sub => sub._id == sublistId);
    console.log('saveItem sublist', sublist);
    console.log('saveItem item', item);
    
    if (item._id) {
      let index = sublist.items.findIndex(i => i._id == item._id);
      sublist.items[index] = item;
    }
    else {
      item._id = this.generateId();
      sublist.items.push(item);
    }
    
    this.db.lists.update({ _id : list._id }, list);
    
    /*
    // usar com mongo:
    this.db.lists.update(
      { _id : list._id }, 
      { $push: { "sublists.$[sublistId]" : item } }, 
      { arrayFilters: [ { sublistId: sublist._id } ], upsert: true  });*/
    
    return item;
  },
  
  
  saveSublist(listTitle, sublist) {
    let list = this.getList(listTitle);
    sublist._id = sublist._id || this.generateId();
    list.sublists.push(sublist);
    this.db.lists.update({ _id: list._id }, list, { upsert: true });
    this.db.lists.save(list);
    let savedSublist = this.getSublist(listTitle, sublist);
    console.log('saveSublist list', list);
    console.log('saveSublist sublist', sublist);
    console.log('saveSublist savedSublist', savedSublist);
    return savedSublist;
  },
  
  
  getSublist(listTitle, sublist) {
    return this.getList(listTitle).sublists.find(sub => sub._id === sublist._id);
  },
  
  
  getList(listTitle) {
    let list = this.db.lists.findOne({ title: listTitle });
    if (!list) {
      list = { title: listTitle, sublists: [] };
      this.db.lists.save([list]);
    }
    return list;
  },
  
  
  countOpenItems(listTitle) {
    let list = this.db.lists.findOne({ title: listTitle });
    return list ? list
      .reduce((count, sublist) => sublist.items.filter(item => !item.checked).length + count, 0) : 0;
  }
};


module.exports = database;

