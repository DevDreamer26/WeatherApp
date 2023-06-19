

const express = require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){

  const query=req.body.cityName;
  const apiKey="c2c4a4908858220f38e93c2870e23c12";
  const unit ="metric"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const wheatherData =JSON.parse(data)
      const temp = wheatherData.main.temp
      const wheatherDescription = wheatherData.weather[0].description
      const icon = wheatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The wheather is currently " +wheatherDescription +"</p>")
      res.write("<img src=" +imageURL+">")

      res.write("<h1>The temperature in "+query+" is " +temp+" degree celcius.</h1>");
      res.send();
    });
  });

})

// app.get("/bsh",function(req,res){
//   res.sendFile(__dirname+'/index.html')
// })
app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
