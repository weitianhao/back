<template>
  <div>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.twoClass" style="width: 100%">
            <el-table-column label="中文标识" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.cnname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="英文标识" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.enname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="180">
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
        </template>
      </el-table-column>
      <el-table-column label="中文名称" prop="oneClass.cnname">
      </el-table-column>
      <el-table-column label="英文名称" prop="oneClass.enname">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'AllList',
    data() {
      return {
        tableData5: []
      }
    },
    mounted() {
      this.axios.get('api/back_class/getClassList').then((res) => {
        this.tableData5 = Array.from(res.data.result)
        this.tableData5.forEach((i) => {
          return i.twoClass = Array.from(i.twoClass)
        })
      })
    },
    methods: {
      handleDelete (index,rows) {
        this.axios.post('api/back_class/deleteClassTwo',{id: rows.id}).then((res) => {
          location.reload()
        })
      },
      handleEdit (index,rows) {
        sessionStorage['articleUpdate'] = JSON.stringify(rows)
        sessionStorage['articleOneId'] = rows.parent_id
        this.$router.push({name: 'EditerTwo'})
      }
    }
  }

</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
