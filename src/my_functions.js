import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'

const app = express()

const contact_file = fs.readFileSync("./src/contact.json", "utf8") || "[]";
let contacts = JSON.parse(contact_file);

app.use(bodyParser.urlencoded ({extanded : false}))
app.use(bodyParser.json())

export function startapp() {
  app.listen(7878, function () {
   console.log('Your app is listening on port : 7878')
  })
  app.get("/contact" , function ( req, res){
    console.log("contact get");
    res.send(contacts)
  });
  app.get("/contact/:index", function (req , res){
    if (contacts[req.params.index]){
      res.status(200).send(contacts[req.params.index]);
    } else {
      res.status(404).send("contact not found");
    }
  });
  app.post('/contact', function (req, res) {
    console.log(req.body);
    res.send(contacts);
  })
}

export function hello(name) {
    console.log('hello', name);
}
