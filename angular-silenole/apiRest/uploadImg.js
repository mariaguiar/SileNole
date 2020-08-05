var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let cors = require('cors')
//EXTRAS PARA LA PRUEBA CARGA DE FOTOS 
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash'); //------------------------------------


/* let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: null,
    database: 'silenole'
});
connection.connect(function(error){
    if(error)
    console.log(error)
    else
    console.log('Conexión correcta')
}); */

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//EXTRAS PARA LA PRUEBA CARGA DE FOTOS 
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static('uploads'));
//start app 
const port = process.env.PORT || 3100;
app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);


app.post('/upload-img', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let user_image = req.files.user_image;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            user_image.mv('./uploads/' + user_image.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: user_image.name,
                    mimetype: user_image.mimetype,
                    size: user_image.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
app.post('/upload-imgProduct', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let product_image = req.files.product_image;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            product_image.mv('./uploads/' + product_image.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: product_image.name,
                    mimetype: product_image.mimetype,
                    size: product_image.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});