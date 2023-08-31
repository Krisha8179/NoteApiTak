const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


const userRoutes = require('./routes/user');
const notesRoutes = require('./routes/notes');

const cors = require('cors');
const User = require('./models/User');
const Notes = require('./models/Notes');
const sequelize = require('./util/database');

const app = express();
app.use(bodyParser.json({extended: false}));



app.use(cors());

app.use(userRoutes);
app.use(notesRoutes);

User.hasMany(Notes);
Notes.belongsTo(User);

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
});