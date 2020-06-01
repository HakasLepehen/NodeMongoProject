const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const todoRoutes = require('./routes/todos');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server started on port: ' + PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start();

