const request = require('request')


const forecast = (latitude,longitude,callback)=> {
    const url ='https://api.darksky.net/forecast/a8dfe6f16ba059fa22c76f09d19acee8/'+latitude+','+ longitude +'?units=si&limit=0'
    request({url,json:true},(error,{ body})=>{

        if(error)
        {
            callback('Unable to connect to darksky.net',undefined)        
        }
        else if(body.error)
        {
            callback('Invalid coordinates',undefined)
        }
        else{

            callback(undefined,body.daily.data[0].summary+" It is currently " +body.currently.temperature + " degrees out . High is "+body.daily.data[0].tempesratureHigh+" with low "+body.daily.data[0].temperatureLow +"."+" There is a "+body.currently.precipProbability +" chance of rain")
        }
    
    })
    

}

module.exports = forecast