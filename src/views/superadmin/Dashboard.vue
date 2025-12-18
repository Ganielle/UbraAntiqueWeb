<template>
  <div>
    <a
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      href="javascript:void(0)"
    >
      Admin Dashboard
    </a>
    <!-- Header -->
    <div class="relative pb-20 pt-8">
      <div class="px-4 md:px-10 mx-auto w-full">
        
        <!--#region WALLETS-->
        <div>
          <p class="text-lg font-semibold">POST</p>
          <hr style="border-color: black;">
          <br/>
          <!-- Card stats -->
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="TOTAL WORK OFFERED"
                :statTitle="totaljob"
                statIconName="fas fa-briefcase"
                statIconColor="bg-emerald-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="TOTAL FORUM DISCUSSIONS"
                :statTitle="totalforums"
                statIconName="fas fa-comments"
                statIconColor="bg-red-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="APPROVED WORK POSTED"
                :statTitle="totalapprovedjobs"
                statIconName="fas fa-check-to-slot"
                statIconColor="bg-pink-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="REJECTED WORK POSTED"
                :statTitle="totaldeniedjobs"
                statIconName="fas fa-xmark"
                statIconColor="bg-orange-500"
              />
            </div>
          </div>
        </div>
        <br/><br/>

        <!--#region USERS-->
        <div>
          <p class="text-lg font-semibold">USERS</p>
          <hr style="border-color: black;">
          <br/>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="TOTAL USERS"
                :statTitle="totalusers + totaladmin"
                statIconName="fas fa-user"
                statIconColor="bg-orange-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="USER"
                :statTitle="totaluser"
                statIconName="fas fa-user"
                statIconColor="bg-emerald-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="ADMIN"
                :statTitle="totaladmin"
                statIconName="fas fa-user"
                statIconColor="bg-red-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="EMPLOYER"
                :statTitle="totalemployer"
                statIconName="fas fa-user"
                statIconColor="bg-yellow-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardStats from "@/components/Cards/CardStats.vue";
export default {
  name: "dashboard-page",
  components: {
    CardStats,
  },
  data() {
    return {
      //  #region TOTAL INCOME

      loading:false,
      totaljob: 0,
      totalapprovedjobs: 0,
      totaldeniedjobs: 0,
      totalpendingjobs: 0,
      totalforums: 0,
      totalusers: 0,
      totaluser: 0,
      totalemployer: 0,
      totaladmin: 0
      //  #endregion
    }
  },
  methods: {
    async GetData(){
      this.loading = true

      const response = await fetch(`${process.env.VUE_APP_API_URL}/dashboard/sadashboard`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const responseData = await response.json();

      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })

        this.loanloading = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }

      this.totaljob = responseData.data.totaljob
      this.totalapprovedjobs = responseData.data.totalapprovedjobs
      this.totaldeniedjobs = responseData.data.totaldeniedjobs
      this.totalpendingjobs = responseData.data.totalpendingjobs
      this.totalforums = responseData.data.totalforums
      this.totalusers = responseData.data.totalusers
      this.totaluser = responseData.data.totaluser
      this.totalemployer = responseData.data.totalemployer
      this.totaladmin = responseData.data.totaladmin

      this.loading = true
    },
  },
  mounted(){
    this.GetData()
  }
};
</script>
