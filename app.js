const express = require('express')
const twig = require('twig')
const mysql = require('promise-mysql')
const bodyParser = require('body-parser')
// const User = require('./User')
const expressValidator = require('express-validator')
// connexion à la base de donée

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'samanke'
}).then((db)=>{
    console.log('connexion effectuer avec succès')
    let app = express()
    const User = require('./User')(db)
    app.use(expressValidator())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.set('view engine', 'twig')
    app.use(express.static(`${__dirname}/views`))
    app.get('/', (req,res)=>{
        res.render('projet.twig')
    })
    app.get('/restaurants', (req,res)=>{
        res.render('projet2.twig')
    })
    app.get('/about', (req,res)=>{
        res.render('projet3.twig')
    })
    app.get('/commandes', (req,res)=>{
        res.render('projet4.twig')
    })
    app.post('/commandes',async (req,res)=>{
        let element = req.body;
        let reservation = await User.reservation(element)
        console.log(reservation)
        if(reservation)
        {
            let success = true;
            res.render('projet4.twig',{success:success})
        }
    })
app.listen(8080,console.log("j'écoute sur le port 8080"))
})
.catch((error)=>{
    console.log("connexion échoué")
})