// Create web server using Node.js

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Initialize express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for custom logger
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

// Set routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
});

app.post('/contact/send-message', (req, res) => {
    const { author, sender, title, message } = req.body;

    if (author && sender && title && message) {
        fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
            if (err) throw err;

            const messages = JSON.parse(data);

            messages.push({ author, sender, title, message });

            fs.writeFile('./data/messages.json', JSON.stringify(messages), err => {
                if (err) throw err;

                res.render('contact', {
                    title: 'Contact',
                    isSent: true
                });
            });
        });
    } else {
        res.render('contact', {
            title: 'Contact',
            isError: true
        });
    }
});

app.get('/messages', (req, res) => {
    fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
        if (err) throw err;

        const messages = JSON.parse(data);

        res.render('messages', {
            title: 'Messages',
            messages
        });
    });
});

app.get('/messages/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
        if (err) throw err;

        const messages = JSON.parse(data);

        const


