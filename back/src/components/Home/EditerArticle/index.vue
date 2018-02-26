<template>
  <div>
    <h1>修改文章</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="show">
        <el-radio-group v-model="ruleForm.show">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否推荐" prop="recommend">
        <el-radio-group v-model="ruleForm.recommend">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="导读" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" class="ml15"></el-input>
      </el-form-item>
      <el-form-item label="时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="内容" prop="content">
       <div>
        <!--editor的div为富文本的承载容器-->
          <div id="editor" class="ml15"></div>  
      </div> 
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'EditerArticle',
    data() {
      return {
        time: '',
        ruleForm: {
          title: JSON.parse(sessionStorage['updateContent']).article_name,
          date1: '',
          date2: '',
          show: JSON.parse(sessionStorage['updateContent']).art_show.toString(),
          recommend: JSON.parse(sessionStorage['updateContent']).recommend.toString(),
          author: JSON.parse(sessionStorage['updateContent']).editer,
          desc: JSON.parse(sessionStorage['updateContent']).daodu,
          editor: null,
          content: ''
        },
        rules: {
          title: [{
            required: true,
            message: '请输入文章标题',
            trigger: 'blur'
          }],
          author: [{
            required: true,
            message: '请输入文章作者',
            trigger: 'blur'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          show: [{
            required: true,
            message: '请选择是否显示',
            trigger: 'change'
          }],
          recommend: [{
            required: true,
            message: '请选择是否推荐',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请填写导读内容',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      getTime(date, times) {
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = new Date(times).getHours()
        let minute = new Date(times).getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        let time = y + '-' + m + '-' + d + ' ' + h + ':' + minute
        this.time = time
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          const content = this.editor.getContent()
          if (valid && content != '') {
            this.getTime(this.ruleForm.date1, this.ruleForm.date2)
            const postObj = {
              id: sessionStorage['updateId'],
              article_name: this.ruleForm.title,
              recommend: this.ruleForm.recommend,
              art_show: this.ruleForm.show,
              editer: this.ruleForm.author,
              daodu: this.ruleForm.desc,
              content: content,
              time: this.time,
              imgsrc: 'www.baidu.com',
              enname: 'abc'
            }
            this.axios.get('api/article/class').then((res) => {
            const obj = res.data.data.classListOne
            for (let i in obj) {
              if (sessionStorage['updateOneId'] === obj[i].id) {
                postObj.enname = obj[i].enname
                this.axios.post('api/article/update', postObj).then((res) => {
                  if (res.data.code === '1115') {
                    this.$message({
                      showClose: true,
                      message: '文章修改成功！',
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      showClose: true,
                      message: '文章修改失败！',
                      type: 'warning'
                    })
                  }
                })
              }
            }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请填写完整内容！',
              type: 'warning'
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
      this.editor = UE.getEditor('editor')
    }
  }

</script>

<style scoped>
  h1 {
    padding: 10px;
    font-size: 16px;
  }

  p {
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 70%;
  }

  .el-input {
    width: 80%;
    margin-left: 15px;
  }

  .el-input__inner {
    height: 35px!important;
  }

  .el-radio {
    margin-left: 15px;
    padding: 0;
  }

  .textarea {
    width: 80%;
    vertical-align: middle;
    margin-left: 15px;
  }

  .text-right {
    padding-left: 28px;
  }

  .el-date-picker {
    margin-left: 26px;
  }

  .el-button {
    height: 30px;
    line-height: 0;
    font-size: 12px;
  }

  .bottom {
    padding-left: 72px;
  }

  .el-select {
    margin-left: 15px;
  }

</style>
