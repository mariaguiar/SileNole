var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let cors = require('cors')

let mysql = require('mysql');
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
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/* ---------------------------------PRODUCTOS FUNCIONANDO----------------------------------- */
// GET /SILES/:USERID = Obtiene el todos los siles creados por el usuario
app.get("/products/:user_id", function (request, response) {
    var user_id = request.params.user_id;
    let params = [user_id];
    let sql = "SELECT * FROM products WHERE user_id = ?";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos Propios')
            console.log(result)
        } 
    response.send(result);
    })
});
// GET /SILES= Obtiene todos los productos
app.get("/products", function (request, response) {
    let sql = "SELECT * FROM products"
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});

// POST /SILES/ = Añade un nuevo sile del usuario 
app.post("/products", function (request, response) {
    /* let product_id = request.body.product_id */
    let nombre = request.body.nombre
    let descripcion = request.body.descripcion
    let categoria = request.body.categoria
    let user_id  = request.body.user_id 
    let product_image = request.body.product_image
    let params = [nombre, descripcion, categoria, user_id, product_image]
    let sql = `INSERT INTO products (nombre, descripcion, categoria, user_id , product_image) VALUES ( ?, ?, ?, ?, ?)`;
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Nuevo producto Ingresado')
            console.log(result)
        } 
    response.send(result);
    })
});

// PUT /SILES/ = Actualiza un sile del usuario
app.put("/products", function (request, response) {
    let product_id = request.body.product_id
    let nombre = request.body.nombre
    let descripcion = request.body.descripcion
    let categoria = request.body.categoria
    let user_id  = request.body.user_id 
    let product_image = request.body.product_image
    let params = [nombre, descripcion, categoria, user_id , product_image]
    let sql = "UPDATE products SET nombre = ?, descripcion = ?, categoria = ?, user_id = ?, product_image = ? WHERE product_id ="+product_id;
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Producto Modificado')
            console.log(result)
        } 
    response.send(result);
    })
});
// DELETE PARA BORRAR UN PRODUCTO
app.delete("/products", function (request, response) {
    let product_id = request.body.product_id
    let params = [product_id]
    let sql = "DELETE FROM products WHERE product_id = ?"
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Producto Borrado')
            console.log(result)
        } 
    response.send(result);
    })
});
// GET BUSCAR/CATEGORIA Obtiene los productos segun categoria
app.get("/buscar/:categoria", function (request, response) {
    var categoria = request.params.categoria;
    var filtrar_user_id = request.query.filterUser;
    let sql;
    let params;
    if(categoria==="Todo"){
        params = [filtrar_user_id];
        sql = "SELECT * FROM products WHERE user_id != ?";
    }else{
        params= [categoria, filtrar_user_id]
        sql = "SELECT * FROM products WHERE categoria = ? AND user_id != ?"; 
    }
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
            console.log("hola desde api")
        }else{
            console.log('Objetos en la categoria ' + categoria)
            console.log(result)
        } 
    response.send(result);
    })
});
/* ---------------------------------PRODUCTOS SIN HACER----------------------------------- */
// GET /SILES/:DISTANCIA = Obtiene el todos los siles según distancia
/* app.get("/siles/:distancia", function (request, response) {
    var distancia = request.params.distancia;
    let sql = "SELECT * FROM user WHERE localidad ="+distancia;
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos Propios')
            console.log(result)
        } 
    response.send(result);
    })
}); */
// GET /SILES/:TIEMPO = Obtiene el todos los siles según tiempo
/* app.get("/siles/:tiempo", function (request, response) {
    var distancia = request.params.distancia;
    let sql = "SELECT * FROM user WHERE localidad ="+distancia;
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos Propios')
            console.log(result)
        } 
    response.send(result);
    })
}); */
/* ---------------------------------FIN PRODUCTOS----------------------------------- */



/* ---------------------------------USUARIOS FUNCIONANDO----------------------------------- */
//Login y comparación de datos
app.post("/user/login", function (request, response) {
    let email = request.body.email;
    let password = request.body.password;
    let params = [email, password]
    let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    if(email && password){
        connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Usuario Correcto')
            console.log(result)
        } 
    response.send(result);
    })
    }

});// GET /USERS/:USERID = Obtiene toda la información asociada al usuario 
app.get("/user/:id", function (request, response) {
    var id = request.params.id;
    let sql = "SELECT * FROM user WHERE user_id ="+id;
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Datos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});

// POST /USERS/REGISTER = Introduce a un usuario en la base de datos.
app.post("/user/register", function (request, response) {
    let name = request.body.name
    let email = request.body.email
    let password = request.body.password
    let comunidad = request.body.comunidad
    let provincia = request.body.provincia
    let localidad = request.body.localidad
    let cp = request.body.cp
    let user_image = request.body.user_image
    let params = [name, email, password, comunidad, provincia, localidad, cp, user_image]
    let sql = "INSERT INTO user (name, email, password, comunidad, provincia, localidad, cp, user_image) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Nuevo usuario Ingresado')
            console.log(result)
        } 
    response.send(result);
    })
});
// PUT /USERS/:USERID = Actualiza la información asociada al usuario. 
app.put("/user", function (request, response) {
    let user_id = request.body.user_id
    let name = request.body.name
    let email = request.body.email
    let password = request.body.password
    let comunidad = request.body.comunidad
    let provincia = request.body.provincia
    let localidad = request.body.localidad
    let cp = request.body.cp
    let user_image = request.body.user_image
    let params = [name, email, password, comunidad, provincia, localidad, cp, user_image]
    let sql = "UPDATE user SET name = ?, email = ?, password = ?, comunidad = ?, provincia = ?, localidad = ?, cp = ?, user_image = ? WHERE user_id ="+user_id;
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Usuario Modificado')
            console.log(result)
        } 
    response.send(result);
    })
});
// DELETE PARA BORRAR UN USUARIO
app.delete("/user", function (request, response) {
    let user_id = request.body.user_id
    let params = [user_id]
    let sql = "DELETE FROM user WHERE user_id = ?";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Usuario eliminado')
            console.log(result)
        } 
    response.send(result);
    })
});
/* app.delete("/user", function (request, response) {
    let email = request.body.email
    let password = request.body.password
    let params = [email, password]
    let sql = "DELETE FROM user WHERE email = ? AND password = ?";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Usuario eliminado')
            console.log(result)
        } 
    response.send(result);
    })
}); */

/* ---------------------------------USUARIOS SIN HACER----------------------------------- */


/* ---------------------------------FIN USUARIOS----------------------------------- */

/* ---------------------------------MENSAJES FUNCIONANDO----------------------------------- */
// POST /MESSAGES/ = Añade un nuevo mensaje.
app.post("/messages", function (request, response) {
    let chat_id = request.body.chat_id
    let sender_id  = request.body.sender_id 
    let product_id = request.body.product_id 
    let text = request.body.text
    let date = request.body.date
    let params = [chat_id, sender_id , product_id ,text ,date]
    let sql = "INSERT INTO messages (chat_id, sender_id, product_id ,text ,date) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Mensaje Ingresado')
            console.log(result)
        } 
    response.send(result);
    })
});

// GET /MESSAGES/: USERID/:OWNERID= Obtiene todos los mensajes intercambiados entre el usuario y el propietario del nole 
 app.get("/messages/:chat_id", function (request, response) {
    var chat_id = request.params.chat_id;
    let params = [chat_id]
    let sql = "SELECT user.name, messages.text, messages.date FROM messages INNER JOIN user ON (messages.sender_id = user.user_id)  WHERE messages.chat_id = ? ORDER BY messages.date";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});
/* ---------------------------------MENSAJES SIN HACER----------------------------------- */
// GET /MESSAGES/: USERID/:OWNERID= Obtiene todos los mensajes intercambiados entre el usuario y el propietario del nole 
/* app.get("/messages/:user_id/:user_id2/:product_id", function (request, response) {
    var id = request.params.user_id;
    var id2 = request.params.user_id2;
    var id3 = request.params.product_id;
    let sql = "SELECT text FROM messages WHERE user_id ="+id+ "OR user_id2 ="+id2+"ORDER BY message_id";
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
}); */
/* ---------------------------------FIN MENSAJES----------------------------------- */

/* ---------------------------------NOLES FUNCIONANDO----------------------------------- */
// POST /NOLES/ inserta la relacion entre usuario y producto //PARA MENSAJES
app.post("/noles/", function (request, response) {
    let uid  = request.body.user_id 
    let pid = request.body.product_id 
    let chat_id = request.body.chat_id
    let params = [uid , pid, chat_id]
    let sql = "INSERT INTO noles (user_id, product_id, chat_id ) VALUES (?, ?, ?)";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Relación Nole creada')
            console.log(result)
        } 
    response.send(result);
    })
});

// GET /NOLES= Obtiene todos los productos
app.get("/noles/:user_id", function (request, response) {
    var user_id = request.params.user_id;
    let params = [user_id];
    let sql = "SELECT products.nombre, products.descripcion, products.product_image, noles.product_id, noles.chat_id FROM noles INNER JOIN products ON (noles.product_id = products.product_id) WHERE noles.user_id = ?"
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});

// GET /SILES= Obtiene todos los productos
app.get("/siles/:user_id", function (request, response) {
    var user_id = request.params.user_id;
    let params = [user_id];
    let sql = "SELECT products.nombre, products.descripcion, products.product_image, noles.product_id, noles.chat_id FROM noles INNER JOIN products ON (noles.product_id = products.product_id) WHERE products.user_id = ?"
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});

/* ---------------------------------FIN NOLES----------------------------------- */
// HACER
// GET /buscar/ Obtiene los ultimos 4 productos agregados
app.get("/buscar/", function (request, response) {
    var id = request.params.id;
    let sql = "SELECT * FROM products ORDER BY product_id DESC LIMIT 4";
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});
// HACER
// GET /buscar/:categoria = Obtiene todos los noles solicitados segun categoria
app.get("/buscar/:id", function (request, response) {
    var id = request.params.id;
    let sql = "SELECT * FROM products WHERE categoria ="+id;
    connection.query(sql, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Objetos del Usuario')
            console.log(result)
        } 
    response.send(result);
    })
});



// PARA BORRAR UN USUARIO
/* app.post("/user/delete", function (request, response) {
    let email = request.body.email
    let password = request.body.password
    let params = [email, password]
    let sql = "DELETE FROM user WHERE email = ? AND password = ?"
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Usuario eliminado')
            console.log(result)
        } 
    response.send(result);
    })
}); */


app.listen(3000);