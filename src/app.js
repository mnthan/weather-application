const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const request = require ('postman-request')
const geocode = require('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// Set up handlebars engine and views location
app.set('view engine','hbs')
app.set ('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        name : "manthan",
        title : "Weather"
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        name : "manthan",
        title : "About"
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText : "this is help text",
        title : 'Help',
        name : 'Manthan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({

            error : "provide the address"
        })
    }

    geocode(req.query.address,(error,{latitude,longtitude}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longtitude,(error,response)=>{
            if (error){
                return res.send({error})
            }
            res.send(response)
        })
    })
//     res.send({
//         forecast : "it is snowing",
//         location : req.query.address
//     })
})

// Practice 
app.get('/products',(req,res) =>{
    
    if (!req.query.search){
        return res.send({
            error : "provide the address"
        })
    }
    res.send({
        products : []
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title : "404",
        message : 'Help article not found',
        name : 'Manthan Patel'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : "404",
        message : 'Page not found',
        name : 'Manthan Patel'
    })
})


app.listen(3000,()=>{
    console.log("server is up on portt 30000")
})