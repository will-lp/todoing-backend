const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


app.get('/:listId', (req, res) => {
  console.log(`listId received: '${req.params.listId}'`);
  res.send(JSON.stringify(database[req.params.listId]));
})


let port = 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));

let database = {
  echo : [
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
}
