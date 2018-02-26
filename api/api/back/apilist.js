const express = require('express')
const router = express.Router()
const querystring  = require('querystring')
const url  = require('url')
const generateUUID = require('../common/Unique')
const createTime = require('../common/creatTime')
const {sqlHandle,readHandle,query} = require('../../config/db_connect')

//修改数据接口
router.post('/amend', (req,res) => {
  const sql = `update apilist set title='${req.body.title}',url='${req.body.url}',type='${req.body.type}',sendparams='${req.body.sendparams}',getparams='${req.body.getparams}', backorfont='${req.body.backorfont}',time='${createTime()}' where id='${req.body.id}'`
  query(sql).then((rows) => {
      res.send({
        code: '2202',
        msg: '数据修改成功'
      })
  }).catch((err) => {
    res.send({
      code: '2201',
      msg: '数据修改失败'
    })
  })
})

//增加数据接口
router.post('/', function(req, res, next) {
  const sql = `insert into apilist (id, title, url, type, sendparams, getparams, backorfont, time) value ('${generateUUID()}','${req.body.title}','${req.body.url}','${req.body.type}', '${req.body.sendparams}','${req.body.getparams}','${req.body.backorfont}','${createTime()}')`
  query(sql).then((rows) => {
      res.send({
        code: '2022',
        msg: '数据插入成功'
      })
  }).catch(() => {
    res.send({
      code: '2021',
      msg: '数据插入失败'
    })
  })
})

//查找数据接口
router.get('/list', (req,res) => {
  const sql = `select * from apilist`
  readHandle(sql).then((data) => {
      res.send({
        code: '2010',
        msg: '参数传递成功',
        data
      })
  }).catch((err) => {
    res.send({
      code: '2011',
      msg: '参数传递失败',
      err: null
    })
  })
})

router.post('/search', (req,res) => {
  const sql = `select * from apilist where id='${req.body.id}'`
  readHandle(sql).then((data) => {
      res.send({
        code: '2020',
        msg: '参数传递成功',
        data
      })
  }).catch((err) => {
    res.send({
      code: '2021',
      msg: '参数传递失败',
      err: null
    })
  })
})

//删除数据接口
router.post('/delete', (req,res) => {
  const sql = `delete from apilist where id='${req.body.id}'`
  sqlHandle(sql).then((rows) => {
    res.send({
      code: '2032',
      msg: '删除数据成功'
    })
  }).catch((err) => {
    res.send({
      code: '2031',
      msg: '删除数据失败',
      err
    })
  })
})
module.exports = router;