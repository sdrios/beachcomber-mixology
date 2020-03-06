const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.port || 8080;

app.get('api/hello', (req,res)=>{
    res.send('my api route');
})

app.use(express.static(path.join(__dirname,'build')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'build/index.html'));
})

app.listen(PORT, ()=>{

    console.log('server listening on port:' + PORT);
})