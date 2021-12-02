const request = require('postman-request')


const forecast = (coordinates,coordinates2,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=be9beba18d1971dc128eba94e247c1c6&query='+coordinates+','+coordinates2+'&units=f'
    
    request({url, json :true} , (error,{body}) =>{
        if (error){
            callback("can't connect",undefined)
        }else if(body.error){
            callback("can't find the place",undefined)
        }else{
            callback(undefined,`The temperature is currently ${body.current.temperature}.\nIt feels like ${body.current.feelslike}.\nThe humidity is ${body.current.humidity}`)
        }
    })
}
    


module.exports = forecast