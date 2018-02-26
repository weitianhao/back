<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm pt20">
      <el-form-item label="中文类名" prop="twoCninput" class="pt15">
        <el-input v-model="ruleForm.twoCninput" placeholder="请输入二级中文类名"></el-input>
      </el-form-item>
      <el-form-item label="英文类名" prop="twoEninput" class="pt15">
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
    name: 'EditerTwo',
    data () {
      return {
        ruleForm: {
          twoCninput: JSON.parse(sessionStorage['articleUpdate']).cnname,
          twoEninput: JSON.parse(sessionStorage['articleUpdate']).enname
        },
        rules: {
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
              id: JSON.parse(sessionStorage['articleUpdate']).id,
              enname: this.ruleForm.twoEninput,
              cnname: this.ruleForm.twoCninput
            }
            console.log(obj)
            this.axios.post('api/back_class/amendClassTwo', obj).then((data) => {
              if (data.data.code === '1143') {
                this.$message({
                  showClose: true,
                  message: '类名修改成功！',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '类名修改失败！',
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


</style>
