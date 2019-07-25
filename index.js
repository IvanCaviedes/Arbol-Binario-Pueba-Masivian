const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexroutes = require('./routers/index');
const path = require('path');
const app = express();
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';
import webpack from 'webpack';
// CONFIGURANDO EL PUERTO
app.set('port',process.env.PORT || 3000);
// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(webpackDevMiddleware(webpack(webpackConfig)))
// RUTAS DEL SERVIDOR
app.use(indexroutes)
// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, "./src")))
// INICIANDO SERVIDOR
app.listen(app.get('port'), () => {
    console.log('Server runing on localhost:',app.get('port'));
});