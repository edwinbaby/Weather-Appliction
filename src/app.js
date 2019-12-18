const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=> {

    res.render('index',{title:'Weather ',
       name:'Edwin'})
})

app.get('/about',(req,res)=> {

    res.render('about',{title:'About',name:'Edwin'})

})


app.get('/help',(req,res)=> {

    res.render('help',{title:"Help",text:'Look into the mirror and ask help',name:'Edwin'})
})

app.get('/weather',(req,res)=> {
    
    const location= req.query.address
    if(!location)
    {
       return res.send( {
            error:'You must provide an address'
        })
    }

    geocode(location,(error,{Latitude,Longitude,Place}={})=> {

        if(error)
        {
           return res.send({error})
        }
        
        forecast(Latitude,Longitude,(error,forecastdata)=> {
           if(error)
           {
              return res.send({ error })
     
           }
           
           res.send({
               Place,
               forecast:forecastdata,
               Address:location
           })
           
        })     
     }) 
     

    

})

app.get('/help/*',(req,res)=> {
    res.render('404page',{
        title:'404',
        name:'Edwin',
        errormsg:'Help article not found'
    })
})

app.get('*',(req,res)=> {

    res.render('404page',{
        title:'404',
        name:'Edwin',
        errormsg:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up and running in port 3000')
})