const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
//EXTRAS PARA LA PRUEBA CARGA DE FOTOS 
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash'); //------------------------------------
//PARA EL AUTENTICACIÓN REGISTER/LOGIN
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';



const mysql = require('mysql');
const connection = mysql.createConnection({
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
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

//EXTRAS PARA LA PRUEBA CARGA DE FOTOS 
app.use(fileUpload({
    createParentPath: true
}));

app.use(morgan('dev'));

//------------------------------------------------------


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
    let date = request.body.date
    let params = [nombre, descripcion, categoria, user_id, product_image, date]
    let sql = `INSERT INTO products (nombre, descripcion, categoria, user_id , product_image, date) VALUES ( ?, ?, ?, ?, ?, ?)`;
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
    let date = request.body.date
    let params = [nombre, descripcion, categoria, user_id , product_image, date]
    let sql = "UPDATE products SET nombre = ?, descripcion = ?, categoria = ?, user_id = ?, product_image = ?, date = ? WHERE product_id =" + product_id;
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


/* ---------------------------------FIN PRODUCTOS----------------------------------- */



/* ---------------------------------USUARIOS FUNCIONANDO----------------------------------- */
//Login y comparación de datos
app.post("/user/login", function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
  let params = [email];
  //let params = [email, password];
  //let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
  let sql = "SELECT * FROM user WHERE email = ?";
  if (email && password) {
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err)
      } else {
          console.log(result);
          if (result[0] === undefined) {
            response.status(403).send({ message: 'Something is wrong' });
            return;
          }
        console.log('Usuario Correcto')
        var user = result[0];
        console.log(user);
        const resultPassword = bcrypt.compareSync(password, user.password);
        console.log("el password es correcto?: " + resultPassword);
        if (resultPassword) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
    
            const tokenData = {
              accessToken: accessToken,
              expiresIn: expiresIn
            }
            console.log(tokenData);
            result.push(tokenData);
            insertToken(accessToken, email);
            // prueba
            if (verifyToken(accessToken,email)) {
                //ok
            } else {
                // no ok
            }
            response.send(result);
        } else {
            // password wrong
            response.status(403).send({ message: 'Something is wrong' });
        }
      }
    })
  }
});

const insertToken = (accessToken, email) => {
    console.log("insertando token");
    let params = [accessToken, email];
    let sql = "UPDATE user SET accessToken = ? WHERE email = ?";
    connection.query(sql, params, function(err, result){
        if (err) {
            console.log(err)
            console.log('error al insertar token')
            return false;
        } else {
            console.log('Token insertado')
            console.log(result)
            return true;
        }
    });
}

const verifyToken = (accessToken, email) => {
    console.log("verificando token");
    let params = [email];
    let sql = "SELECT accessToken FROM user WHERE email = ?";
    connection.query(sql, params, function(err, result){
        if (err) {
            console.log(err)
            console.log('error al verificar token')
            return false;
        } else {
            console.log(result)
            if (result[0].accessToken === accessToken) {
                console.log('Token verificado')
                return(true);
            } else {
                console.log('Token no válido')
                return(false);
            }
        }
    });
}

// GET /USERS/:USERID = Obtiene toda la información asociada al usuario 
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
    let name = request.body.name;
    let email = request.body.email;
    let password = bcrypt.hashSync(request.body.password);
    let comunidad = request.body.comunidad;
    let provincia = request.body.provincia;
    let localidad = request.body.localidad;
    let cp = request.body.cp;
    let user_image = request.body.user_image;
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
    let password = bcrypt.hashSync(request.body.password);
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

/* ---------------------------------FIN MENSAJES----------------------------------- */

/* ---------------------------------NOLES / SILES FUNCIONANDO----------------------------------- */
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

/* ---------------------------------FIN NOLES / SILES----------------------------------- */

/* ---------------------------------BUSCAR----------------------------------- */

app.get("/buscar/usuario/:nombre", function (request, response) {
    var nombre = request.params.nombre;
    console.log("buscando usuario ", nombre)
    let params = [nombre];
    let sql = "SELECT * FROM user WHERE name = ?";
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Usuario por nombre')
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
    if(categoria === "Todo"){
        params = [filtrar_user_id];
        sql = "SELECT * FROM products WHERE user_id != ?";
    }else{
        params = [categoria, filtrar_user_id]
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

// GET /buscar/ por nombre de producto
app.get("/buscar/", function (request, response) {
    let filtrar_user_id = request.query.filterUser;
    let filtrar_name = "%" + request.query.filterProductName + "%";
    console.log(filtrar_name)
    let params = [filtrar_user_id, filtrar_name, filtrar_name];
    let sql = "SELECT products.nombre, products.descripcion, products.product_image, products.user_id FROM products INNER JOIN user ON (user.user_id = products.user_id) WHERE user.user_id != ? AND (products.nombre LIKE ? OR products.descripcion LIKE ?) ORDER BY product_id DESC";
    console.log(sql);
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Buscar por Clave')
            console.log(result)
        } 
    response.send(result);
    })
});

// GET /buscar/ Obtiene los ultimos 4 productos agregados
app.get("/buscar-ultimos/", function (request, response) {
    let filtrar_user_id = request.query.filterUser;
    let filtrar_fecha = request.query.days;
    let params;
    let sql;
    if (filtrar_fecha != null) {
        date = new Date();
        date.setDate(date.getDate() - filtrar_fecha)
        console.log("fitrando dias", filtrar_fecha, date);
        params = [filtrar_user_id, date];
        sql = "SELECT * FROM products WHERE user_id != ? AND date > ? ORDER BY product_id DESC";
    } else {
        params = [filtrar_user_id];
        sql = "SELECT * FROM products WHERE user_id != ? ORDER BY product_id DESC LIMIT 4";
    }

    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Últimos productos añadidos')
            console.log(result)
        } 
    response.send(result);
    })
});

app.get("/buscar-cercanos/", function (request, response) {
    let filtrar_user_id = request.query.filterUser;
    let filtrar_where = request.query.filterWhere;
    let params = [filtrar_user_id, filtrar_where];
    console.log(filtrar_user_id,filtrar_where)
    let sql = "SELECT * FROM user INNER JOIN products ON (user.user_id=products.user_id) WHERE user.user_id != ? AND user.localidad = ? ORDER BY product_id DESC LIMIT 4"
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Productos cercanos añadidos')
            console.log(result)
        } 
    response.send(result);
    })
});

app.get("/buscar-cercanos/categoria/:categoria/:tipo_loc/:valor_loc", function (request, response) {
    var categoria = request.params.categoria;
    var tipo_loc = "user." + request.params.tipo_loc
    var valor_loc = request.params.valor_loc;
    let filtrar_user_id = request.query.filterUser;
    console.log(filtrar_user_id, categoria, tipo_loc, valor_loc)
    let sql;
    let params;
    if(categoria === "Todo"){
        params = [filtrar_user_id, valor_loc];
        sql = "SELECT products.nombre, products.descripcion, products.product_image, products.user_id FROM products INNER JOIN user ON (user.user_id = products.user_id) WHERE user.user_id != ? AND " + tipo_loc + " = ? ORDER BY products.product_id DESC";
    }else{
        params = [categoria, filtrar_user_id, tipo_loc, valor_loc];
        sql = "SELECT products.nombre, products.descripcion, products.product_image, products.user_id FROM products INNER JOIN user ON (user.user_id = products.user_id) WHERE categoria = ? AND user.user_id != ? AND ? = ? ORDER BY products.product_id DESC"; 
    }
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Productos cercanos por CP y Categoria')
            console.log(result)
        } 
    response.send(result);
    })
});

/* app.get("/buscar-cercanos/categoria/:categoria/cp/:cp", function (request, response) {
    var categoria = request.params.categoria;
    var cp = request.params.cp;
    let filtrar_user_id = request.query.filterUser;
    console.log(filtrar_user_id, categoria, cp)
    let sql;
    let params;
    if(categoria === "Todo"){
        params = [filtrar_user_id, cp];
        sql = "SELECT products.nombre, products.descripcion, products.product_image, products.user_id FROM products INNER JOIN user ON (user.user_id = products.user_id) WHERE user.user_id != ? AND user.cp = ? ORDER BY products.product_id";
    }else{
        params = [categoria, filtrar_user_id, cp];
        sql = "SELECT products.nombre, products.descripcion, products.product_image, products.user_id FROM products INNER JOIN user ON (user.user_id = products.user_id) WHERE categoria = ? AND user.user_id != ? AND user.cp = ? ORDER BY products.product_id"; 
    }
    connection.query(sql, params, function(err, result){
        if (err){
            console.log(err)
        }else{
            console.log('Productos cercanos por CP y Categoria')
            console.log(result)
        } 
    response.send(result);
    } )
}); */

/* ---------------------------------FIN BUSCAR----------------------------------- */


app.listen(3000);