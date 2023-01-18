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

//===========================//
//===== Error Handlers =====//
//===========================//

app.all('/*',(request, response, next) => {
    
    response.status(404).send({message: `Page not found, please check your syntax. You entered: ${request.url}`})
});

app.use((error, request, response, next) => {
    
    response.status(400).send({message: 'Bad Request, your request may be out of range'});
    response.status(500).send({message: 'Generic Server Error, please check your request & try again, if this persists contact us.'});
});

//---------------------------//

module.exports = app;

//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
    Remember to keep error Handlers at the bottom. Especially 404.
*/