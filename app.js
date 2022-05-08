const express = require('express')
const mongoose = require('mongoose') 
const router = require('./routers')

const db = 'mongodb+srv://nazar:soket775@cluster0.lmpdw.mongodb.net/autorizetion_redux?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(router)

async function start() {
    try {
        app.listen(PORT, ()=> {
            console.log(`Sever works ${PORT}...`);
        })
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connent to DB');

    } catch (error) {
        console.log(error);
    }
}

start()