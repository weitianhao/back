<template>
  <div>
    <h1>增加文章</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="一级类名" prop="selVal1">
        <el-select v-model="ruleForm.selVal1" placeholder="请选" @change="changeSel(ruleForm.selVal1)">
          <el-option v-for="item in options.classListOne" :key="item.id" 
          :label="item.cnname" 
          :value="item.id">
          <span @click="on(item)">{{ item.cnname }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级类名" prop="selVal2">
        <el-select v-model="ruleForm.selVal2" placeholder="请选">
          <el-option v-for="item in selTwo" :key="item.id" :label="item.cnname" :value="item.id">
            <span @click="two(item)">{{ item.cnname }}</span>
          </el-option>
        </el-select>
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
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
          <div id="editor" v-text="ruleForm.content"></div>  
        </div>
        <span @click="btn">点击</span>
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
    name: 'AddArticle',
    data() {
      return {
        options: [],
        selTwo: [],
        time: '',
        oneClass: '',
        editor: null,
        cnname_one: '',
        enname_one: '',
        cnname_two: '',
        enname_two: '',  
        ruleForm: {
          title: '',
          selVal1: '',
          selVal2: '',
          date1: '',
          date2: '',
          delivery: false,
          recommend: '',
          author: '',
          desc: '',
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
          selVal1: this.$route.query.add == undefined ? [{
            required: true,
            message: '请选择一级类名',
            trigger: 'change'
          }] : undefined,
          selVal2:  this.$route.query.add == undefined ? [{
            required: true,
            message: '请选择二级类名',
            trigger: 'change'
          }] : undefined,
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
    mounted() {
      this.editor = UE.getEditor('editor')
      this.axios.get('api/article/class').then((res) => {
        this.options = Object.assign({}, res.data.data)
      })
    },
    methods: {
      changeSel(id) {
        console.log(this.ruleForm.selVal1)
        this.selTwo = []
        this.ruleForm.selVal2 = ''
        for (let i = 0; i < this.options.classListTwo.length; i++) {
          if (this.options.classListTwo[i].parent_id === id) {
            this.selTwo.push(this.options.classListTwo[i])
          }
        }
        for (let i = 0; i < this.options.classListOne.length; i++) {
          if (this.options.classListOne[i].id === id) {
            this.oneClass = this.options.classListOne[i].enname
          }
        }
      },
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
            let obj = {
                article_name: this.ruleForm.title,
                recommend: this.ruleForm.recommend,
                art_show: this.ruleForm.show,
                editer: this.ruleForm.author,
                daodu: this.ruleForm.desc,
                content: content,
                oneId: this.ruleForm.selVal1,
                twoId: this.ruleForm.selVal2,
                time: this.time,
                imgsrc: 'www.baidu.com',
                enname: this.oneClass,
                enname_one: this.enname_one,
                cnname_one: this.cnname_one,
                enname_two: this.enname_two,
                cnname_two: this.cnname_two
            }
            this.axios.post('api/article/insert', obj).then(() => {
                this.$message({
                  showClose: true,
                  message: '文章添加成功！',
                  type: 'success'
                })
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
      },
      on (item) {
        this.cnname_one = item.cnname
        this.enname_one = item.enname
      },
      two (item) {
        this.cnname_two = item.cnname
        this.enname_two = item.enname
      },
      btn () {
        console.log(this.editor.getContent())
      }
    },
    destroyed() {
      // 将editor进行销毁
      this.editor.destroy();
    }

  }

</script>

<style scoped>
  h1 {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
  }

  ul li {
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 70%;
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


  .bottom {
    padding-left: 72px;
  }

  .el-select-dropdown__item span {
    width: 100px!important;
    height: 40px!important;
    line-height: 100%!important;
    display: block!important;
  }
</style>
