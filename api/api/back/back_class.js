const express = require('express')
const router = express.Router()
const generateUUID = require('../common/Unique')
const createTime = require('../common/creatTime')
const {sqlHandle,readHandle,searchHandle,query} = require('../../config/db_connect')
//增加一、二级菜单接口
router.post('/add_class_one',(req,res) => {
  const parent_id = generateUUID()
  const sqlSelOne = `select id from one_class where enname='${req.body.enname_one}'`
  const sqlSelTwo = `select article_num  from two_class where enname='${req.body.enname_two}'`
  const sqlInsertOne = `insert into one_class (id, enname, cnname, time) value ('${parent_id}','${req.body.enname_one}','${req.body.cnname_one}','${createTime()}')`
  const sqlInsertTwo = `insert into two_class (id, parent_id, enname, cnname, article_num, time) value ('${generateUUID()}','${parent_id}','${req.body.enname_two}','${req.body.cnname_two}',0,'${createTime()}')`
  const createTable = `CREATE TABLE ${req.body.enname_one} (LIST INT(11) UNIQUE NOT NULL AUTO_INCREMENT, id VARCHAR(255) PRIMARY KEY, oneId VARCHAR(255), twoId VARCHAR(255), article_name VARCHAR(255), editer VARCHAR(255), content LONGTEXT, TIME DATETIME, visitors INT, daodu VARCHAR(255), imgsrc VARCHAR(255), recommend TINYINT, art_show TINYINT, enname_one VARCHAR(255), cnname_one VARCHAR(255), enname_two VARCHAR(255), cnname_two VARCHAR(255))`
  const asyncInsertOne = async function (params) {
    const sqlSel1 = await searchHandle(sqlSelOne)
    const sqlSel2 = await searchHandle(sqlSelTwo)
    const sqlInsert1 = await query(sqlInsertOne)
    const sqlInsert2 = await query(sqlInsertTwo)
    const sqlcreateTable = await query(createTable)
    return 'ok'
  }
  asyncInsertOne().then((data) => {
    res.send({
      code: '1014',
      msg: '数据插入成功'
    })
  }).catch((err) => {
    res.send({
      code: '1013',
      msg: '数据插入失败',
      err
    })
  })
})

//查找一级菜单接口
router.post('/getOneClass',(req,res) => {
  const sql = `select * from one_class`
  readHandle(sql).then((data) => {
    res.send({
      code: '1122',
      msg: '获取一级类名成功',
      data
    })
  }).catch((err) => {
    res.send({
      code: '1123',
      msg: '获取一级类名失败',
      err
    })
  })
})

//插入二级类名接口
router.post('/inserTowClass',(req,res) => {
  const sqlSelTwo = `select article_num  from two_class where enname='${req.body.enname}'`
  const sqlInsertTwo = `insert into two_class (id, parent_id, enname, cnname, article_num, time) values ('${generateUUID()}','${req.body.oneId}','${req.body.enname}','${req.body.cnname}',0,'${createTime()}')`
  console.log(req.body)
  const asyncTwoInsert = async function () {
    const sqlSel2 = await searchHandle(sqlSelTwo)
    const sqlInsert2 = await sqlHandle(sqlInsertTwo)
    return 'ok'
  }
  asyncTwoInsert().then((data) => {
    res.send({
      code: '1123',
      msg: '数据插入成功'
    })
  }).catch((err) => {
    res.send({
      code: '1124',
      msg: '数据插入失败',
      err
    })
  })
})

//获取结构树形数据接口
router.get('/getClassList',(req,res) => {
  const sqlOne = `select * from one_class`
  const sqlTwo = `select * from two_class`
  const asyncClassList = async function () {
    const classOneList = await readHandle(sqlOne)
    const classTwoList = await readHandle(sqlTwo)
    return {classOneList,classTwoList}
  }
  asyncClassList().then((data) => {
    let result = []
    data.classOneList.forEach(i => {
      let obj = {
        oneClass: i,
        twoClass: []
      }
      data.classTwoList.forEach(k => {
        if(i.id === k.parent_id){
          obj.twoClass.push(k)
        }
      })
      result.push(obj)
    })
    res.send({
      code: '1131',
      msg: '数据查找成功',
      result
    })
  }).catch((err) => {
    res.send({
      code: '1132',
      msg: '数据查找失败',
      err
    })
  })
})

//修改一级类名接口
router.post('/amendClassOne',(req,res) => {
  const updateSql = `update one_class set enname='${req.body.enname}', cnname='${req.body.cnname}', time='${createTime()}' where enname='${req.body.id}'`
  const updateTab = `alter table ${req.body.oldenname} rename ${req.body.enname}`
  const asyncClassUpdate = async function () {
    const classUpdateSql = await query(updateSql)
    const classUpdateTab = await query(updateTab)
    return 'ok'
  }
  asyncClassUpdate().then((data) => {
    res.send({
      code: '1133',
      msg: '数据修改成功'
    })
  }).catch((err) => {
    res.send({
      code: '1134',
      msg: '数据修改失败',
      err
    })
  })
})

//修改二级类名接口
router.post('/amendClassTwo',(req,res) => {
  const updateSql = `update two_class set enname='${req.body.enname}', cnname='${req.body.cnname}', time='${createTime()}' where id='${req.body.id}'`
  query(updateSql).then((data) => {
    res.send({
      code: '1143',
      msg: '数据修改成功'
    })
  }).catch((err) => {
    res.send({
      code: '1144',
      msg: '数据修改失败',
      err
    })
  })
})

//删除一级菜单接口
router.post('/deleteClassOne', (req,res) => {
  const deleteSql = `delete from one_class where enname='${req.body.enname}'`
  const deleteTab = `DROP TABLE ${req.body.enname}`
  asyncDeteleOne = async function () {
    const deleteOneSql = await query(deleteSql)
    const deleteOneTab = await query(deleteTab)
    return 'ok'
  }
  asyncDeteleOne().then((data) => {
    res.send({
      code: '1151',
      msg: '数据删除成功'
    })
  }).catch((err) => {
    res.send({
      code: '1152',
      msg: '数据删除失败',
      err
    })
  })
})

//删除二级菜单接口
router.post('/deleteClassTwo', (req,res) => {
  const deleteSql = `delete from two_class where id='${req.body.id}'`
  query(deleteSql).then((data) => {
    res.send({
      code: '1161',
      msg: '数据删除成功'
    })
  }).catch((err) => {
    res.send({
      code: '1162',
      msg: '数据删除失败',
      err
    })
  })
})
//精确查找一级类名
router.post('/searchOneClass',(req,res) => {
  const sql = `select * from one_class where id='${req.body.parent_id}'`
  readHandle(sql).then((data) => {
    res.send({
      code: '1142',
      msg: '获取一级类名成功',
      data: data[0]
    })
  }).catch((err) => {
    res.send({
      code: '1143',
      msg: '获取一级类名失败',
      err
    })
  })
})
module.exports = router