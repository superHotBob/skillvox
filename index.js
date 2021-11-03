const path = require('path');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const expressGraphQL = require('express-graphql')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname,'public');

app.use(cors());


 

// const httpServer = http.createServer(app);
app.use(express.static(__dirname + '/public'));

app.get('/summary',(req,res) => {
    res.sendFile(path.join(__dirname, 'summary.json'));
});
app.get('/summary_brand',(req,res) => {
    res.sendFile(path.join(__dirname, 'summary_brand.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
// async function start() {
// await server.start();
// server.applyMiddleware({ app, path: '/graphql' });
// };
// start();
// app.use('/graphql', expressGraphQL({
//     schema,
//     graphiql: true
// }))
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});