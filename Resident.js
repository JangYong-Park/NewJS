const express = require('express');

const app = express();
//모두 허용
const cors = require('cors')
//일부만 허용 ( 안 쓴다. )
const corsOption = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
}

//cors 설정 ( 모두 허용 )
// app.use(cors(corsOption)); //corsOption 정의만큼 허용
app.use(cors());

const mysql = require('mysql2');
const connection = mysql.createConnection({

    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1234',
    database: 'mydb'
});
connection.connect();

//node의 기본 port는 3000, vue, react는 기본 port 3000
app.listen(3000, function(){
    console.log('node start');
})

//node 불러오는 방법
app.get('/',(req, res) => {
    console.log('page 실행');
    res.send('hello wolrd')

})

//db를 get방식으로 불러오기.
app.get('/db', (req, res) => {
    console.log('/db');
    connection.query('SELECT * FROM stu_resident', (err, rows) => {
        if(err){
            console.err('err: ',err);
        }
        else if(rows[0]){
            console.log(rows);
            let responseData = new Object();
            responseData.status = 200; //통신코드 200 - 성공을 의미, 404 - not found
            responseData.list = rows;
            res.json(responseData);
        }
    })

});

app.get('/get', (req, res) => {
    console.log('/get');
    console.log(req.query);
    //request 안에 query 안에 userId 
    let name = req.query.userId;
    console.log('name : '+name);

    connection.query('SELECT * FROM STU_SCORE WHERE NAME = ?' ,[name], (err, rows) => {
        if(err){
            console.err('err: ',err);
        }
        else if(rows[0]){
            console.log(rows);
            let responseData = new Object();
            responseData.status = 200; //통신코드 200 - 성공을 의미, 404 - not found
            responseData.list = rows;
            res.json(responseData);
        }
    })

});
/* 
    user_seq, user_id, user_pw, user_email, user_name, user_resudentid
*/ 
app.get('/resident', (req, res) => {
    console.log('/resident');
    console.log(req.query);
    //request 안에 query 안에 userId 
    let id = req.query.user_id;
    let pw = req.query.user_pw;
    let email = req.query.user_email;
    let name = req.query.user_name;
    let residentid = req.query.user_resudentid

    connection.query('insert into stu_resident(user_id, user_pw, user_email, user_name, user_resudentid)'+
        'values(?,?,?,?,?)' ,[id, pw, email, name, residentid], (err, rs) => {
            console.log(res);
        if(err){
            console.log('에러났음: ',err);
        }
        else if(rs){
            console.log(res);
            let responseData = new Object();
            responseData.status = 200; //통신코드 200 - 성공을 의미, 404 - not found
            responseData.list = rs;
            res.json(responseData);
        }
    })

});

app.post('/send1', (req, res) => {
    req.body; // post는 데이터를 body에 넣기 때문에, body 영역으로 갖고 와야 함
    // if(data != undefined && data.name != null){
    //     name = data.name;
    // }

    connection.query('SELECT * FROM STU_SCORE WHERE NAME = ?' ,[name], (err, rows) => {
        if(err){
            console.err('err: ',err);
        }
        else if(rows[0]){
            console.log(rows);
            let responseData = new Object();
            responseData.status = 200; //통신코드 200 - 성공을 의미, 404 - not found
            responseData.list = rows;
            res.json(responseData);
        }
    })

});

app.get('/login', (req, res) => {
    console.log('/login');
    // console.log(req.query);
    // //request 안에 query 안에 userId 
    // let id = req.query.user_id;
    // let pw = req.query.user_pw;
    // let email = req.query.user_email;
    // let name = req.query.user_name;
    // let residentid = req.query.user_resudentid

    // connection.query('insert into stu_resident(user_id, user_pw, user_email, user_name, user_resudentid)'+
    //     'values(?,?,?,?,?)' ,[id, pw, email, name, residentid], (err, rs) => {
    //         console.log(res);
    //     if(err){
    //         console.log('에러났음: ',err);
    //     }
    //     else if(rs){
    //         console.log(res);
    //         let responseData = new Object();
    //         responseData.status = 200; //통신코드 200 - 성공을 의미, 404 - not found
    //         responseData.list = rs;
    //         res.json(responseData);
    //     }
    // })

});




//나쁜 사례
// app.get('/get2', (req, res) => {
//     console.log('/get2');
//     console.log(req.query);
//     //request 안에 query 안에 userId 
//     let name = req.query.userId;
//     console.log('name : '+name);

//     connection.query('SELECT * FROM STU_SCORE WHERE NAME = \''+name+'\'', (err, rows) => {
//         if(err){
//             console.err('err: ',err);
//         }
//         else if(rows[0]){
//             console.log(rows);
//             let responseData = new Object();
//             responseData.status = 200; //통신코드 200 - 성공을 의미, 404 - not found
//             responseData.list = rows;
//             res.json(responseData);
//         }
//     })

// });