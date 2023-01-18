const express = require ("express");
const boardGameRoutes = require('./src/routes');
const app = express();


app.use(express.json());

app.get('/', (request, response) => {
    response.send(
        `Welcome. The valid route is /api/`
    )
})

app.use('/api/', boardGameRoutes);



module.exports = app;
