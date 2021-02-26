const request=require("request")

const forecast= (latitude,longitude,callback) =>{
    const url="http://api.weatherstack.com/current?access_key=28f1a2d410692d30b7b4adffd210bc0f&query="+ latitude + ","+ longitude 
    request({ url , json :true}, (error,{body}) =>{
        if (error){
            callback("unable to connect to server",undefined)
        }else if(body.error){
            callback("Unable to find location")
        }else{
            callback(undefined,body.current.weather_descriptions+ ". It is currently "+body.current.temperature +" degrees out. There is a " +body.current.feelslike + '% chance of rain.')
        }
    })   
    }
module.exports=forecast

