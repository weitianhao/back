<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="标题" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="前后端分类" width="180">
        <template slot-scope="scope">
          <span>
            {{ scope.row.backorfont }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="180">
        <template slot-scope="scope">
          <span>
            {{ scope.row.time }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="len">
  </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'BackPort',
    data() {
      return {
        tableData: [],
        len: 0,
        tep: 5,
        currentPage1: 1,
        start: 1,
        tableData2: [],
        font: this.$route.query.font
      }
    },
    methods: {
      handleEdit(index, data) {
        sessionStorage['portUpdate'] = JSON.stringify(this.tableData[index])
        this.$router.push({name: 'EditPort'})
      },
      handleDelete(index, row) {
        
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('api/apilist/delete',{id: row.id}).then((res) => {  
            if(res.data.code === '2032') {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.$router.go(0)
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败！'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      },
      handleCurrentChange(val) {
        this.tableData = this.tableData2.slice((val - 1) * this.tep, (val - 1) * this.tep + 5)
      }
    },
    mounted () {
      this.axios.get('api/apilist/list').then((res) => {
        this.tableData = Array.from(res.data.data)
        const tableData2 = Array.from(res.data.data)
        tableData2.forEach((i) => {
          if (i.backorfont === this.font) {
            this.tableData2.push(i)
          }
        })
        console.log(this.font)
        this.handleCurrentChange(1)
        this.len = this.tableData2.length
      })
    }
  }

</script>

<style scoped>
.el-pagination{
  text-align: center;
  width: 70%;
  margin-top: 10px;
}

</style>
