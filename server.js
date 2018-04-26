const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const database = require('./file-database');

app.use(bodyParser.json());
app.use(cors());


app.get('/:listId', (req, res) => {
  let listId = req.params.listId.toUpperCase();
  console.log(`get ${listId}`);
  
  let list = database.getList(listId);
  
  res.send(JSON.stringify(list));
});


app.post('/:listId', (req, res) => { 
  let listId = req.params.listId;
  console.log(`post ${listId}: `, req.body); 
  
  let sublist = database.saveSublist(listId, req.body);
  
  res.send(JSON.stringify(sublist));
});


app.post('/:listId/:sublistId', (req, res) => { 
  let listId = req.params.listId;
  let sublistId = req.params.sublistId;
  console.log(`post ${listId}/${sublistId}: `, req.body); 
  
  let item = database.saveItem(listId, parseInt(sublistId), req.body);
  
  res.send(JSON.stringify(item));
});


app.get('/:listId/countOpenItems', (req, res) => {
  let listId = req.params.listId;
  console.log(`post ${listId}/countOpenItems: `); 
  
  res.send(200, database.countOpenItems(listId));
})


let port = 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));


