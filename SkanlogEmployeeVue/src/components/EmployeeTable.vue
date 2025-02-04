<template>
  <el-table :data="employees" style="width: 100%" border stripe>
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="position" label="Position" />
    <el-table-column prop="salary" label="Salary" />
    <el-table-column prop="sssNumber" label="SSS Number" />
    <el-table-column prop="pagIbigNumber" label="Pag-Ibig Number" />
    <el-table-column label="Action">
      <template #default="{ row }">
        <el-button type="danger" @click="deleteEmployee(row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    employees: Array,
    deleteEmployee: Function,
  },
})
</script>

<style scoped>
.el-button {
  width: 100%;
  font-weight: bold;
  background-color: rgb(240, 153, 168);
  border: palevioletred;
}

.el-button:hover {
  background-color: rgb(204, 41, 111);
}
</style>

<!-- <template>
  <el-table :data="employees" style="width: 100%" border stripe>
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="position" label="Position" />
    <el-table-column prop="salary" label="Salary" />
    <el-table-column prop="sssNumber" label="SSS Number" />
    <el-table-column prop="pagIbigNumber" label="Pag-Ibig Number" />
    <el-table-column label="Action">
      <template #default="{ row }">
        <el-button type="primary" @click="editEmployee(row)">Update</el-button>
        <el-button type="danger" @click="deleteEmployee(row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="isEditing" title="Update Employee" @close="closeDialog">
    <el-form>
      <el-form-item label="Name">
        <el-input v-model="editingEmployee.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="editingEmployee.email" />
      </el-form-item>
      <el-form-item label="Position">
        <el-input v-model="editingEmployee.position" />
      </el-form-item>
      <el-form-item label="Salary">
        <el-input v-model="editingEmployee.salary" type="number" />
      </el-form-item>
      <el-form-item label="SSS Number">
        <el-input v-model="editingEmployee.sssNumber" />
      </el-form-item>
      <el-form-item label="Pag-Ibig Number">
        <el-input v-model="editingEmployee.pagIbigNumber" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="saveUpdate">Save</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  props: {
    employees: Array,
    deleteEmployee: Function,
  },
  emits: ['updateEmployee'],
  setup(props, { emit }) {
    const isEditing = ref(false)
    const editingEmployee = ref(null)

    const editEmployee = (employee) => {
      editingEmployee.value = { ...employee }
      isEditing.value = true
    }

    const closeDialog = () => {
      isEditing.value = false
      editingEmployee.value = null
    }

    const saveUpdate = async () => {
      try {
        await axios.put(
          `http://localhost:5141/api/Employee/${editingEmployee.value.id}`,
          editingEmployee.value,
        )

        // Notify parent of update
        emit('updateEmployee', editingEmployee.value)
        closeDialog()
      } catch (error) {
        console.error('Update failed:', error.response?.data || error.message)
      }
    }

    return {
      isEditing,
      editingEmployee,
      editEmployee,
      closeDialog,
      saveUpdate,
    }
  },
})
</script>

<style scoped>
.el-button {
  width: 100%;
  font-weight: bold;
  background-color: rgb(240, 153, 168);
  border: palevioletred;
}

.el-button:hover {
  background-color: rgb(204, 41, 111);
}
</style> -->
