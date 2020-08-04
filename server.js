const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(cors())
app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Established Connection'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;

const usersRouter = require('./routers/users');
const adminRouter = require('./routers/admin');

app.use('/users', usersRouter);
app.use('/admin', adminRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Server started on port ${port}`));