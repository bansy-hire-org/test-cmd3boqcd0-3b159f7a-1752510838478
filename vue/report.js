import Vue from 'vue'

new Vue({
  el: '#vue-report',
  data: {
    tasks: []
  },
  mounted() {
     // Simulate fetching tasks from local storage
     const storedTasks = localStorage.getItem('tasks');
     this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  },
  computed: {
    weeklySummary() {
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        return d.toISOString().split('T')[0]; // YYYY-MM-DD
      });

      const summary = {};
      last7Days.forEach(date => {
        summary[date] = { created: 0, completed: 0 };
      });

      this.tasks.forEach(task => {
        const createdDate = new Date(task.id).toISOString().split('T')[0];
        if (last7Days.includes(createdDate)) {
          summary[createdDate].created++;
          if (task.completed) {
            summary[createdDate].completed++;
          }
        }
      });

      return Object.entries(summary).reverse().map(([date, counts]) => ({
        date, created: counts.created, completed: counts.completed
      }));
    }
  },
  template: `
    <div>
      <h3>Weekly Task Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Created</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in weeklySummary" :key="day.date">
            <td>{{ day.date }}</td>
            <td>{{ day.created }}</td>
            <td>{{ day.completed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
