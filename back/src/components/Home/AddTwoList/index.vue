<template>
  <div>
    <!-- <h1>一级分类选择</h1>
    <main>
      <p>一级中文类名<el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :label="item.cnname" :value="item.id">
        </el-option>
      </el-select></p>
    </main>
    <h1>二级分类添加</h1>
    <main>
      <p>二级中文类名
        <el-input v-model="twoCninput" placeholder="请输入内容"></el-input>
      </p>
      <p>二级英文类名
        <el-input v-model="twoEninput" placeholder="请输入内容"></el-input>
      </p>
    </main>
    <div class="bottom">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button>取消</el-button>
    </div> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h1>一级分类选择</h1>
      <el-form-item label="一级类名" prop="value">
        <el-select v-model="ruleForm.value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.cnname" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <h1>二级分类添加</h1>
      <el-form-item label="中文类名" prop="twoCninput">
        <el-input v-model="ruleForm.twoCninput" placeholder="请输入二级中文类名"></el-input>
      </el-form-item>
      <el-form-item label="英文类名" prop="twoEninput">
        <el-input v-model="ruleForm.twoEninput" placeholder="请输入二级英文类名"></el-input>
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
    name: 'AddTwoList',
    data() {
      return {
        options: [],
        value: '',
        ruleForm: {
          value: '',
          twoCninput: '',
          twoEninput: '',
        },
        rules: {
          value: [
            { required: true, message: '请选择一级类名', trigger: 'change' }
          ],
          twoCninput: [{
            required: true,
            message: '请输入二级英文类名',
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
      submit () {
        
        this.axios.post('api/back_class/inserTowClass',obj).then((data) => {
          if (data.data.code === '1123') {
            that.open('二级类名添加成功！','操作成功')
          } else {
            that.open(data.data.err,'操作失败')
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const obj = {
              oneId: this.ruleForm.value,
              cnname: this.ruleForm.twoCninput,
              enname: this.ruleForm.twoEninput
            } 
            this.axios.post('api/back_class/inserTowClass', obj).then((data) => {
              if (data.data.code === '1123') {
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
    },
    mounted() {
      this.axios.post('api/back_class/getOneClass').then((res) => {
        this.options = res.data.data
      })
    }
  }

</script>

<style scoped>
h1{
  font-size: 16px;
  padding-top: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
}
p{
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-input{
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
.el-select{
  margin-left: 15px;
  width: 40%;
}
</style>

