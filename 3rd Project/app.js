const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}, { useUnifiedTopology: true });
const app = express();
const port = 8000;

//Define Mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

var Contact = mongoose.model('contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use(express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//ENDPOINTS
app.get('/', (req, res)=>{
    const parans = { }
    res.status(200).render('home.pug', parans);
})

app.get('/contact', (req, res)=>{
    const parans = { }
    res.status(200).render('contact.pug', parans);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
  
    // res.status(200).render('contact.pug')
})
//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on ${port}`);
});
