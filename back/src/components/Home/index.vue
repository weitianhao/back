<template>
  <div class="wrap">
    <header class="header">
      个人后台管理
      <main>
        <span>用户名：</span>
        {{ this.userName }}
      </main>
    </header>
    <div class="main">
      <div class="left">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" class="left_list"></el-tree>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        userName: sessionStorage['userName'],
        data: [
          {
            label: '文章操作',
            children: [
              {
                label: '添加文章'
              },
              {
                label: '文章列表'
              }
            ]
        }, 
        {
          label: '分类操作',
          children: [{
            label: '一级分类添加'
          },
          {
            label: '二级分类添加'
          },
          {
            label: '分类列表'
          }]
        }, {
          label: '接口操作',
          children: [{
            label: '添加接口'
          }, {
            label: '前台接口'
          }, {
            label: '后台接口'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        switch(data.label) {
          case '添加文章':
          this.$router.push('/home/addArticle')
          break
          case '文章列表':
          this.$router.push('/home/listArticle')
          break
          case '一级分类添加':
          this.$router.push('/home/addOneList')
          break
          case '二级分类添加':
          this.$router.push('/home/addTwoList')
          break
          case '分类列表':
          this.$router.push('/home/allList')
          break
          case '后台接口':
          this.$router.push({path: '/home/backPort', query: {font: 'back'}})
          break
          case '前台接口':
          this.$router.push({path: '/home/fontPort', query: {font: 'font'}})
          break
          case '添加接口':
          this.$router.push('/home/addPort')
          break
        }
      }
    }
  }

</script>

<style>


</style>
