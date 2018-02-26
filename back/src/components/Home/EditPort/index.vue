<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm pt20">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="接口地址" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="backorfont">
        <el-select v-model="ruleForm.backorfont" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求参数" prop="sendparams">
        <el-input 
          type="textarea" 
          autosize 
          v-model="ruleForm.sendparams"
          class="ml15"></el-input>
      </el-form-item>
      <el-form-item label="响应数据" prop="getparams">
        <el-input 
          type="textarea"
          autosize
          v-model="ruleForm.getparams"
          class="ml15"></el-input>
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
    name: 'AddPort',
    data() {
      return {
        options: [{
          value: 'back',
          label: '后台接口'
        }, {
          value: 'font',
          label: '前台接口'
        }],
        options1: [{
          value: 'post',
          label: 'post'
        }, {
          value: 'get',
          label: 'get'
        }],
        ruleForm: {
          title: JSON.parse(sessionStorage['portUpdate']).title,
          url: JSON.parse(sessionStorage['portUpdate']).url,
          backorfont: JSON.parse(sessionStorage['portUpdate']).backorfont,
          type: JSON.parse(sessionStorage['portUpdate']).type,
          sendparams: JSON.parse(sessionStorage['portUpdate']).sendparams,
          getparams: JSON.parse(sessionStorage['portUpdate']).getparams
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入文章作者', trigger: 'blur' }
          ],
          backorfont: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择参数类型', trigger: 'change' }
          ],
          sendparams: [
            { required: true, message: '请填写请求数据', trigger: 'blur' }
          ],
          getparams: [
            { required: true, message: '请填写响应数据', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const obj = {
              id: JSON.parse(sessionStorage['portUpdate']).id,
              title: this.ruleForm.title,
              url: this.ruleForm.url,
              type: this.ruleForm.type,
              backorfont: this.ruleForm.backorfont,
              sendparams: this.ruleForm.sendparams,
              getparams: this.ruleForm.getparams
            }
            this.axios.post('api/apilist/amend',obj).then((res) => {
              if (res.data.code === '2202') {
                this.$message({
                  showClose: true,
                  message: '接口修改成功！',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '接口修改失败！',
                  type: 'warning'
                })
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
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style>
  h1 {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
  }
  p {
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 50%;
  }

  .el-input {
    width: 60%;
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
    width: 70%;
  }

  .pl {
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
</style>
