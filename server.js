const express = require('express');
const ejs = require('ejs');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static('public'));//мы разрешаем испльзовать эту папку, или не будет работать
app.set('view engine', ejs);

app.get('/', (req,res)=>{
    
    res.render("index.ejs", {countryObject: ""});
});

app.post('/',(req, res) =>{
    let country = req.body.country;
    let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;

    axios.get(url)
    .then(function(response){
        let countryObject = response.data[0];
          console.log(countryObject.name);
          res.render("index.ejs", {countryObject: countryObject});
    })
    .catch(function(error){
        console.log(error);
    });
    
    //res.sendFile(__dirname+'/index.html');
});
app.listen(5000,()=>{
    console.log('Server is running on Port 5000.');
}); 