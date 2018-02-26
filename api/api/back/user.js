const express = require('express')
const router = express.Router()
const generateUUID = require('../common/Unique')
const createTime = require('../common/creatTime')
const {sqlHandle,readHandle,query} = require('../../config/db_connect')

//注册用户名
router.post('/newUser',(req,res) => {
  const sqlSel = `select * from user where name='${req.body.name}'`
  const sqlInsert = `insert into user (id, name, password, privilege) values ('${generateUUID()}','${req.body.name}','${req.body.password}',0)`
  asyncNewUser = async function () {
    await query(sqlSel)
    await query(sqlInsert)
    return
  }
  asyncNewUser().then(() => {
    res.send({
      code: '1121',
      msg: '注册成功'
    })
  }).catch((err) => {
    res.send({
      code: '1122',
      msg: '用户已存在！',
      err
    })
  })
})

//登录页面
router.post('/login',(req,res) => {
  const sqlSel = `select * from user where name='${req.body.name}'`
  query(sqlSel).then((data) => {
    if (data.length === 0) {
      res.send({
        code: '1115',
        msg: '用户不存在！'
      })
    }
    if (data[0].password == req.body.password) {
      res.send({
        code: '1113',
        msg: '登录成功',
        id: data[0].id
      })
    } else {
      res.send({
        code: '1114',
        msg: '密码错误！'
      })
    }
  }).catch((err) => {
    res.send({
      code: '1116',
      msg: '操作有误！'
    })
  })
})

router.post('/search', (req,res) => {
  const sqlSel = `select * from user where id='${req.body.id}'`
  query(sqlSel).then((data) => {
    if (data.length !== 0) {
      res.send({
        code: '1117',
        msg: '登录成功！'
      })
    } else {
        res.send({
          code: '1118',
          msg: '用户不存在！'
        })
    }
  })
})

module.exports = router





