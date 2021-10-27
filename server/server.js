const express= require('express');
const app=express();
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
require('dotenv').config()

const users=require('./routes/api/user')
const articles=require('./routes/api/article')
const {checkToken}=require('./middleware/auth');

mongoUri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(bodyParser.json());
app.use(checkToken)
app.use("/api/user",users)
app.use("/api/articles",articles)

const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})