const request = require("postman-request")

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibW50aGFuIiwiYSI6ImNrdWlrZHVzcjJvd2UydW84bjJlNmF4eHQifQ.jioiODW46NIV-udWSk5Zpw&limit=1"
    request({url,json:true},(error,{body})=>{
        if (error){
            callback("Can't Connect , Please Try Again",undefined)
        }
        else if(body.features.length == 0){
            callback("Can't Find The Place . Please Provide A Valid Address.",undefined)
        }
        else{
            const latitude = body.features[0].center[1]
            const longtitude = body.features[0].center[0]
            const location = body.features[0].place_name
            const coordinates  = {latitude ,longtitude,location}
            callback(undefined, coordinates)
        }
    })

}

module.exports = geocode