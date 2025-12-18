<template>
    <div>
        <br/>
        <button class="text-white" style="width: 100px; background-color: #f69d0b; height: 35px; border: none; border-radius: 4px; cursor: pointer;" @click="$emit('close')">
            <a>GO BACK</a>
        </button>
        <br/><br/>
       <p style="font-size: 1.7rem; font-weight: bolder;">JOB APPLICANTS</p>
       <br/>

       <div v-if="employees.length <= 0">No Applicants Yet!</div>

       <div v-else class="flex flex-wrap gap-2 items-stretch">
          <div v-for="employee in employees" :key="employee._id"
            class="w-full sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 min-h-[100px] p-5 relative flex flex-col"
          >
            <div class="bg-white border border-black rounded p-5" style="height: 100%;">
              <p class="text-lg font-bold mb-3">
                {{ employee.firstname + " " + employee.lastname }} ({{ employee.applicantStatus }})
              </p>

              <div class="text-xs font-bold mb-3">
                <p>Email: {{ employee.email }}</p>
                <p>Status:
                  <span v-if="employee.status === 'openforwork'" style="color: green;">Open for Work</span>
                  <span v-else style="color: red;">Not Available for Work</span>
                </p>
                <p>Registered Date: {{ formatDate(employee.createdAt) }}</p>
              </div>

              <div 
                v-if="employee.aboutme"
                v-html="truncatedDescription(employee.aboutme.replace(/\n/g, '<br>'))" 
                class="text-base mb-10 flex-grow"
              ></div>
              <div v-else>
                No about me available
              </div>

              <br/><br/><br/>

              <div style="position: absolute; bottom: 20px; right: 30px; display: flex; gap: 8px; margin-bottom: 20px;">
                <button v-if="jobstatus == 'Open'"
                    style="padding: 6px 12px; background-color: #1640b4; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    @click="$emit('selectemployee', employee.owner, employee.firstname + ' ' + employee.lastname)"
                    >
                    Select Employee
                </button>
                <button v-else-if="jobstatus == 'Close' && employee.applicantStatus == 'Selected'"
                    style="padding: 6px 12px; background-color: #1640b4; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    @click="$emit('message', employee.owner, employee.firstname + ' ' + employee.lastname)"
                    >
                    Message
                </button>
                <button
                    style="padding: 6px 12px; background-color: #22c55e; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    @click="openInNewTab(employee.owner)"
                    >
                    View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import htmlTruncate from 'html-truncate';
export default {
    name: "view-list-modal",
    props: {
        employees: Array,
        jobstatus: String
    },
    methods: {
        formatDate(isoString) {
            const date = new Date(isoString)
            return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",   // August
            day: "numeric",  // 27
            })
        },
        openInNewTab(employeeid) {
            const route = this.$router.resolve({
            path: '/employer/jobdescription/employee/profile',
            query: { employeeid }
            });

            window.open(route.href, '_blank'); // <-- opens in new tab
        },
        truncatedDescription(html) {
            return htmlTruncate(html, 450); // truncates to ~200 characters safely
        },
    }
};
</script>

<style>
    .adf{
        color: #1640b4
    }
</style>