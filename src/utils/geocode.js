const request = require('request')


const geocode = (address,callback)=> {

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZWR3aW5iYWJ5MjAxMiIsImEiOiJjancwdmtibmIwZTI5NDdwbHJ3dTh4MjdnIn0.fMNfdgey_6xYWUQk9CYmyg'
    
    request({url,json:true},(error,{ body})=> {
 
      if(error)
      {
       callback('Unable to connect to mapbox services',undefined)
      }
      else if(body.features.length === 0)
      {
       callback('Invalid place',undefined)
      }
      else{
 
       const Latitude = body.features[0].center[1]
       const Longitude = body.features[0].center[0]
       const Place = body.features[0].place_name
       callback(undefined,{
           Latitude,
           Longitude,
           Place
       })
      } 
 
    })
 
 }


 module.exports = geocode