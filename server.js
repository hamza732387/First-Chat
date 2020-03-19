const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    soc = require('socket.io')
    mysql = require('mysql'),
    DB_NAME = 'sql12328364',
    // trainee = require('./api/trainee'),
    port = process.env.PORT || 3000
;
// 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/frontend"));

let con = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
        user: 'sql12328364',
        password: '85cjTRCdCX',
        database: DB_NAME,
}) 
app.post('/' , (req , res)=>{
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let sql = `insert into ${DB_NAME}.test (name , email , password) value ('${name}','${email}','${password}')`
    con.query(sql , (err , data)=>{
        console.log(data)
    if(err){
        console.log(err)
    }
        
    res.send(data)
    })
})

app.post('/log' , (req , res)=>{
    let email = req.body.email
    let password = req.body.password
    let sql = `select * from ${DB_NAME}.test where email = '${email}' and password = '${password}'`
    con.query(sql , (err , data)=>{
        console.log(data)
    if(err){
        console.log(err)
    }
    if(data.length >  0) {
        res.send({status : 200 , result : data})
    }else{
        res.send({status : 404})
    }
    
    
    
    })
})


// app.get('/free/:id' , (req , res)=>{
//     let id = req.params.id
//     let sql = `select name from test where id = '${id}'`;
//     con.query(sql , (err , result)=>{
//         if(err){
//             console.log(err)
//         }
            
//         res.send(result)
//     })
// })


// app.use(express.json({limit:'50mb'}));



app.get("/" , (req , res)=>{
    res.sendFile(__dirname + '/frontend/home/index.html')
})

let server = app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

let soi = soc(server)
soi.on('connection' , e=>{
    console.log("id : " , e.id)
    // localStorage.setItem('id_user' , e.id)
    e.on('hamza' , e=>{
        console.log(e)
        soi.sockets.emit('new_hamza' , e)
    })
})