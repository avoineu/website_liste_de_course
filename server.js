import express from 'express';
import Database from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const colonnes = await Database.loadMany();
  res.render('listTasks.ejs', { colonnes });
});

app.post("/add", async function (req, res) {
  const newcolonnes = new Database();
  newcolonnes.name = req.body.name
  newcolonnes.quantity = req.body.quantity
  newcolonnes.purchased = 0
  await newcolonnes.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Database.delete({ id: req.params.id });
  res.redirect('/');
});

app.get("/bought/:id", async function(req,res){
  const colonne = await Database.load({id_item : req.params.id})
  colonne.purchased = 1
  await colonne.save()
  res.redirect("/")
})

app.get("/addanarticle", async function(req,res){
  res.render("addArticle.ejs") 
})

app.use(express.static('public'))
app.listen(5001);