<template>
  <div class="login">
    <div class="main">
      <h1>后 台 管 理 系 统</h1>
      <ul>
        <li v-focus="user">
          <label for="user">用户名</label>
          <input v-model.lazy="user.value" placeholder="请输入用户名" type="text" id="user" @blur="changeState(user)" />
        </li>
        <li v-focus="pwd">
          <label for="pwd">密 码</label>
          <input v-model.lazy="pwd.value" placeholder="请输入密码" type="password" id="pwd" @blur="changeState(pwd)" />
        </li>
      </ul>
      <div class="bottom">
        <el-button type="success" @click="submit">登录</el-button>
        <el-button type="primary">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    BACK
  } from '../../store/modules'
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        user: {
          value: '',
          reg: /^[a-zA-Z]{4,10}$/,
          msg: '您输入的用户格式有误！',
          state: false,
          required: true
        },
        pwd: {
          value: '',
          reg: /[a-zA-Z0-9]{5,17}$/,
          msg: '您输入的密码格式有误！',
          state: false,
          required: true
        }
      }
    },
    directives: {
      'focus': {
        componentUpdated: (el, binding) => {
          let clearDom = () => {
            let $pp = el.getElementsByTagName('p')[0]
            if ($pp != undefined) {
              el.removeChild($pp)
            }
          }
          let testDom = () => {
            clearDom()      
            if (!binding.value.reg.test(binding.value.value)) {
              let $p = document.createElement('p')
              $p.innerHTML = binding.value.msg
              el.appendChild($p)
              $p.style.color = 'red'
            }
          }
          let testRequired = () => {
            if (binding.value.required) {
              let $p = document.createElement('p')
              $p.innerHTML = '内容不能为空！'
              el.appendChild($p)
              $p.style.color = 'red'
            } else {
              testDom()
            }
          }
          let testNull = () => {
            clearDom()      
            if (binding.value.value === '') {
              testRequired()
            } else {
              testDom()
            }
          }
          let testState = () => {
            if (binding.value.state) {
              testNull()
            }
          }
          testState()
        }
      }
    },
    methods: {
      ...mapActions([BACK.actionsType]),
      submit() {
        if (this.user.value !== '' && this.pwd.value !== '') {
          this.axios.post('api/user/login', {name: this.user.value, password: this.pwd.value}).then((res) => {
            if (res.data.code === '1113') {
              sessionStorage['success'] = '1'
              sessionStorage['userName'] = this.user.value
              sessionStorage['id'] = res.data.id
              this.$message({
                showClose: true,
                message: '登录成功！',
                type: 'success'
              })
              this.$router.push({
                name: 'Hello'
              })
            } else {
              this.open(res.data.msg, '操作成功')
            }
          })
        } else {
          this.open('内容不能为空！','操作失败')
        }
      },
      open(text, title) {
        this.$alert(text, title, {
          confirmButtonText: '确定'
        })
      },
      changeState(flag) {
        flag.state = true
      }
    }
  }

</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url('../../assets/img/banner.jpg');
    background-size: 100% 100%;
  }

  .main {
    width: 420px;
    height: 330px;
    background: rgba(0, 0, 0, .8);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 5px;
  }

  .main h1 {
    padding-top: 25px;
    text-align: center;
    font-size: 20px;
    padding-bottom: 10px;
    color: gray;
  }

  .main ul li {
    width: 80%;
    margin: 10px auto;
    font-size: 14px;
  }

  .main ul li p {
    text-align: center;
    margin-top: 5px;
    color: red;
  }

  .main ul li input {
    height: 40px;
    border: 1px solid #ccc;
    display: block;
    width: 100%;
    border-radius: 5px;
    padding-left: 10px;
    outline: none;
    margin-top: 5px;
  }

  .main ul li input:focus {
    border: 1px solid skyblue
  }

  .el-input {
    margin-top: 5px;
  }

  .bottom {
    text-align: center;
    margin-top: 25px;
  }

  .el-button {
    width: 37%;
  }

</style>
