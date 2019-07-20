const http = require('http');
const app=require('./app');
const port = process.env.PORT ||3000;
// const cors=require('cors');
// var corsOptions={
//     origin:'*',
//     optionSuccessStatus:200,
// }
const server= http.createServer(app);
//server.use(cors(corsOptions));
server.listen(port);
