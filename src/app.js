const path=require("path")
const express=require("express")
const hbs= require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

const app= express()

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebar engines and views location
app.set("view engine",'hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render("index",{
        title: 'Weather app',
        name: "Shubhi"
    })
 })

 app.get('/about',(req,res)=>{
    res.render("about",{
        title: 'About me',
        name: "Shubhi"
    })
 })

 app.get('/help',(req,res)=>{
    res.render("help",{
        title: 'Get Help',
        name: "Shubhi",
        helptext: "This is some helpful text"
    })
 })

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{ //setting empty object as default value
        if (error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({
                    error: error
                })
            }
        console.log(req.query)
        res.send({
            forecast:forecastData,
            location:location,
            address: req.query.address
            })
        })  
        })  
     })



app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title: "Error",
        error:"Help article not found",
        name: "Andrew"
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
    title: "Error",
    error:"Page not found",
    name: "Andrew"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})


// app.get('',(req,res)=>{
//     res.send("<h1>Hello Express!</h1>")
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Andrew',
//         age:27
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page!<h1>")
// })
