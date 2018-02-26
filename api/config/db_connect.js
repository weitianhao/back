const mysql = require('mysql')
const config = require('./config')
const connection = mysql.createPool(config.sql_config)
const moment = require('moment')
const query = (sql) => {
  return new Promise((resolve,reject) => {
    connection.getConnection((err,connect) => {
      if(err){
        reject(err)
        return
      }
      connect.query(sql,(err,rows,fileds) => {
        resolve(rows)
        connect.release()
      })
    })
  })
}
const sqlHandle = (sql) => {
  return new Promise((resolve,reject) => {
    query(sql).then((data) => {
      if(data.affectedRows > 0){
        resolve('ok')
        connect.release()
      }else{
        reject(err)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
const readHandle = (sql) => {
  return new Promise((resolve,reject) => {
    query(sql).then((data) => {
      data = data.map((i) => {
        i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
        return i
      })
      resolve(data)
      connect.release()
    }).catch((err) => {
      reject(err)
    })
  })
}
const searchHandle =  (sql) => {
  return new Promise((resolve,reject) => {
    query(sql).then((data) => {
      if(data.length > 0){
        reject('此值已存在!')
      } else {
        resolve('ok')
      }
    })
  })
}
module.exports = {
  sqlHandle,
  readHandle,
  searchHandle,
  query
}