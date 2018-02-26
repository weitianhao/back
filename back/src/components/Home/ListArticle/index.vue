<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column label="标题" width="210">
      <template slot-scope="scope">
        <span>{{ scope.row.article_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="作者" width="210">
      <template slot-scope="scope">
        <span>{{ scope.row.editer }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时间" width="210">
      <template slot-scope="scope">
        <span>{{ scope.row.time }}</span>
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
  name: 'ListArticle',
  data () {
    return {
      tableData: [],
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      len: 0,
      tep: 5,
      start: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.tableData = this.tableData2.slice((val - 1) * this.tep, (val - 1) * this.tep + 5)
    },
    handleDelete(index,rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('api/article/delete',{id:rows.id,oneId:rows.oneId,twoId:rows.twoId}).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData.splice(index,1)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })      
    },
    handleEdit(index,rows) {
      sessionStorage['updateId'] = rows.id
      sessionStorage['updateOneId'] = rows.oneId
      sessionStorage['updateContent'] = JSON.stringify(this.tableData[index])
      this.$router.push({name: 'EditerArticle'})
    }
  },
  mounted () {
    this.axios.post('api/article/getClassList').then((res) => {
        this.tableData = Array.from(res.data.data)
        this.tableData2 = Array.from(res.data.data)
        this.handleCurrentChange(1)
        this.len = this.tableData2.length
    })
  }
}
</script>

<style scoped>
.el-table{
  width: 85%!important;
}
.el-pagination{
  text-align: center;
  width: 80%;
  margin-top: 10px;
}

</style>
