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
      title: "Área do usuário(Após login)",
      items: [
        { id: 11, checked: false, text: 'Está faltando rodapé > Inserir o brasão da prefeitura' },
        { id: 12, checked: false, text: 'Opção "Novo processo" > Está sem ação' },
        { id: 13, checked: true,  text: 'Opção "Consultar processos"' },
        { id: 14, checked: false, text: 'Corrigir layout da área do usuário > Canto superior direito' },
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
