<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h1>一级分类添加</h1>
      <el-form-item label="中文类名" prop="oneCninput">
        <el-input v-model="ruleForm.oneCninput" placeholder="请输入一级中文类名"></el-input>
      </el-form-item>
      <el-form-item label="英文类名" prop="oneEninput">
        <el-input v-model="ruleForm.oneEninput" placeholder="请输入一级英文类名"></el-input>
      </el-form-item>
      <h1>二级分类添加</h1>
      <el-form-item label="中文类名" prop="twoCninput">
        <el-input v-model="ruleForm.twoCninput" placeholder="请输入二级中文类名"></el-input>
      </el-form-item>
      <el-form-item label="英文类名" prop="twoEninput">
        <el-input v-model="ruleForm.twoEninput" placeholder="请输入二级英文类名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'AddOneList',
    data() {
      return {
        ruleForm: {
          oneCninput: '',
          oneEninput: '',
          twoCninput: '',
          twoEninput: '',
        },
        rules: {
          oneCninput: [{
            required: true,
            message: '请输入一级中文类名',
            trigger: 'blur'
          }],
          oneEninput: [{
            required: true,
            message: '请输入一级英文类名',
            trigger: 'blur'
          }],
          twoCninput: [{
            required: true,
            message: '请输入二级中文类名',
            trigger: 'blur'
          }],
          twoEninput: [{
            required: true,
            message: '请输入二级英文类名',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const obj = {
              enname_one: this.ruleForm.oneEninput,
              cnname_one: this.ruleForm.oneCninput,
              enname_two: this.ruleForm.twoEninput,
              cnname_two: this.ruleForm.twoCninput
            }
            this.axios.post('api/back_class/add_class_one', obj).then((data) => {
              if (data.data.code === '1014') {
                this.$message({
                  showClose: true,
                  message: '类名添加成功！',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '类名添加失败！',
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

<style scoped>
  h1 {
    font-size: 16px;
    padding-top: 20px;
    padding-left: 10px;
    margin-bottom: 20px;
  }

  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .el-form-item {
    width: 100%;
  }

  .el-input {
    width: 40%;
    margin-left: 15px;
  }

  .el-button {
    height: 30px;
    line-height: 0;
    font-size: 12px;
  }

  .bottom {
    padding-left: 85px;
    margin-top: 20px;
  }

</style>
