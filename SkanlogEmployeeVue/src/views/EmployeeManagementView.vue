<template>
  <div>
    <h1 class="title">
      <el-icon class="icon"><Avatar /></el-icon>
      Skanlog Employee Management System
    </h1>

    <el-alert v-if="error" type="error" :closable="false" show-icon>{{ error }}</el-alert>

    <div class="content">
      <div class="form-container">
        <EmployeeForm :newEmployee="newEmployee" :addEmployee="addEmployee" />
      </div>

      <div class="table-container">
        <EmployeeTable :employees="employees" :deleteEmployee="deleteEmployee" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import EmployeeForm from '../components/EmployeeForm.vue'
import EmployeeTable from '../components/EmployeeTable.vue'
import { Avatar } from '@element-plus/icons-vue'

export default defineComponent({
  components: { EmployeeForm, EmployeeTable, Avatar },
  data() {
    return {
      employees: [],
      newEmployee: {
        name: '',
        email: '',
        position: '',
        salary: '',
        sssNumber: '',
        pagIbigNumber: '',
      },
      error: '',
    }
  },
  methods: {
    // Fetch Employees
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:5141/api/Employee')
        this.employees = response.data
      } catch {
        this.error = 'Failed to fetch employees.'
      }
    },

    // Add Employee (Receives employee object from child)
    async addEmployee(employeeData) {
      try {
        const response = await axios.post('http://localhost:5141/api/Employee', {
          name: employeeData.name,
          email: employeeData.email,
          position: employeeData.position,
          salary: parseFloat(employeeData.salary),
          sssNumber: employeeData.sssNumber,
          pagIbigNumber: employeeData.pagIbigNumber,
        })
        this.employees.push(response.data)
      } catch (err) {
        console.error(err.response?.data || err.message)
        this.error = 'Failed to add employee. Ensure all fields are correctly formatted.'
      }
    },

    // Delete Employee
    async deleteEmployee(id) {
      try {
        await axios.delete(`http://localhost:5141/api/Employee/${id}`)
        this.employees = this.employees.filter((emp) => emp.id !== id)
      } catch (err) {
        console.error(err.response?.data || err.message)
        this.error = 'Failed to delete employee.'
      }
    },
  },
  mounted() {
    this.fetchEmployees()
  },
})
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
  margin-top: 30px;
}

.icon {
  font-size: 32px;
  color: rgb(204, 41, 111);
}

.content {
  display: flex;
  width: 112%;
  gap: 20px;
}

.form-container {
  width: 25%;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid pink;
}

.table-container {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid pink;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
  .form-container,
  .table-container {
    width: 100%;
  }
}
</style>

<!-- INCLUDES UPDATE -->
<!-- <template>
  <div>
    <h1 class="title">
      <el-icon class="icon"><Avatar /></el-icon>
      Skanlog Employee Management System
    </h1>

    <el-alert v-if="error" type="error" :closable="false" show-icon>{{ error }}</el-alert>

    <div class="content">
      <div class="form-container">
        <EmployeeForm
          :newEmployee="newEmployee"
          :addEmployee="addEmployee"
          :updateEmployee="updateEmployee"
          :editingEmployee="editingEmployee"
        />
      </div>

      <div class="table-container">
        <EmployeeTable
          :employees="employees"
          :deleteEmployee="deleteEmployee"
          :editEmployee="editEmployee"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import EmployeeForm from '../components/EmployeeForm.vue'
import EmployeeTable from '../components/EmployeeTable.vue'
import { Avatar } from '@element-plus/icons-vue'

export default defineComponent({
  components: { EmployeeForm, EmployeeTable, Avatar },
  data() {
    return {
      employees: [],
      newEmployee: {
        name: '',
        email: '',
        position: '',
        salary: '',
        sssNumber: '',
        pagIbigNumber: '',
      },
      error: '',
      editingEmployee: null, // Track employee being edited
    }
  },
  methods: {
    // Fetch Employees
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:5141/api/Employee')
        this.employees = response.data
      } catch {
        this.error = 'Failed to fetch employees.'
      }
    },

    // Add Employee
    async addEmployee(employeeData) {
      try {
        const response = await axios.post('http://localhost:5141/api/Employee', {
          name: employeeData.name,
          email: employeeData.email,
          position: employeeData.position,
          salary: parseFloat(employeeData.salary),
          sssNumber: employeeData.sssNumber,
          pagIbigNumber: employeeData.pagIbigNumber,
        })
        this.employees.push(response.data)
      } catch (err) {
        console.error(err.response?.data || err.message)
        this.error = 'Failed to add employee. Ensure all fields are correctly formatted.'
      }
    },

    async updateEmployee(employeeData) {
      try {
        if (!employeeData.id) {
          console.error('Employee ID is missing!')
          this.error = 'Failed to update: Missing employee ID.'
          return
        }

        const response = await axios.put(
          `http://localhost:5141/api/Employee/${employeeData.id}`,
          employeeData,
        )

        // Find and update the employee in the list
        const index = this.employees.findIndex((emp) => emp.id === employeeData.id)
        if (index !== -1) {
          this.employees[index] = response.data
        }
        this.editingEmployee = null // Clear editing mode
      } catch (err) {
        console.error('Failed to update employee:', err.response?.data || err.message)
        this.error = 'Failed to update employee. Ensure all fields are correctly formatted.'
      }
    },

    // Delete Employee
    async deleteEmployee(id) {
      try {
        await axios.delete(`http://localhost:5141/api/Employee/${id}`)
        this.employees = this.employees.filter((emp) => emp.id !== id)
      } catch (err) {
        console.error(err.response?.data || err.message)
        this.error = 'Failed to delete employee.'
      }
    },

    // Edit Employee (pre-fill the form)
    editEmployee(employee) {
      this.editingEmployee = { ...employee }
      this.newEmployee = { ...employee } // Pre-fill the form with employee data for editing
    },
  },
  mounted() {
    this.fetchEmployees()
  },
})
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
  margin-top: 30px;
}

.icon {
  font-size: 32px;
  color: rgb(204, 41, 111);
}

.content {
  display: flex;
  width: 112%;
  gap: 20px;
}

.form-container {
  width: 25%;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid pink;
}

.table-container {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid pink;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
  .form-container,
  .table-container {
    width: 100%;
  }
}
</style> -->
