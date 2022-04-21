//node 连接数据库 nom i mysql
const mysql = require('mysql');
const config = require('./default')

//创建线程池
let pool = mysql.createPool({
    host:config.dataBase.HOST,
    user:config.dataBase.USERNAME,
    password:config.dataBase.PASSWORD,
    database:config.dataBase.DATABASE,
    port:config.dataBase.PORT
})

//连接线程池
let allServers = {
    query:function (sql,values) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if(err) {
                    reject(err);
                }else {
                    //mysql自带的qurry
                    connection.query(sql,values,(err,rows)=> {
                        if (err) {
                           reject(err) 
                        }else {
                            resolve(rows)
                        }
                        connection.release() //释放连接，必要
                    })
                }
            })
        })
    }
}

//用户登入
let userLgoin = function (username,userpwd) {
    let _sql = `select * from users where username='${username}' and userpwd='${userpwd}';`
   return allServers.query(_sql)
}

//查找用户
let findUsers = function (username) {
    let _sql = `select * from users where username='${username}';`
    return allServers.query(_sql)
}

//用户注册,value为数组
let insertUsers = function (value) {
    let _sql = `insert into users set username=?,userpwd=?,nickname=?`
    return allServers.query(_sql,value)
}

//获取数据content
let findData = function (note_type) {
    let _sql = `select * from note where note_type='${note_type}';`
    return allServers.query(_sql)
}

//获取数据id
let findDetail = function (id) {
    let _sql = `select * from note where id='${id}';`
    return allServers.query(_sql)
}

//发表笔记
let insertNote = function (value) {
    console.log(123);
    let _sql = `insert into note set useId=?,title=?,note_type=?,note_content=?,head_img=?,c_time=?,m_time=?,nickname=?` 
    return allServers.query(_sql,value)
}

module.exports = {
    userLgoin: userLgoin,
    findUsers,
    insertUsers,
    findData,
    findDetail,
    insertNote
}
