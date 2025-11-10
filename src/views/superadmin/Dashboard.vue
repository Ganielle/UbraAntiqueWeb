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
                :statTitle="`${totalincome + loan.loanincome}`"
                statIconName="fas fa-briefcase"
                statIconColor="bg-emerald-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="TOTAL FORUM DISCUSSIONS"
                statTitle="0.00"
                statIconName="fas fa-comments"
                statIconColor="bg-red-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="APPROVED WORK POSTED"
                :statTitle="`${loan.loanincome}`"
                statIconName="fas fa-check-to-slot"
                statIconColor="bg-pink-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="REJECTED WORK POSTED"
                :statTitle="`${loan.loanincome}`"
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
                :statTitle="totaluser.user + totaluser.admin + totaluser.customersupport + totaluser.finance"
                statIconName="fas fa-user"
                statIconColor="bg-orange-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="USER"
                :statTitle="totaluser.user"
                statIconName="fas fa-user"
                statIconColor="bg-emerald-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="ADMIN"
                :statTitle="totaluser.admin"
                statIconName="fas fa-user"
                statIconColor="bg-red-500"
              />
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <card-stats
                statSubtitle="EMPLOYER"
                :statTitle="totaluser.finance"
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

      incomeloading: false,
      totalincome: 0,

      //  #endregion

      //  #region LOAN
      loanloading: false,
      loan: {
        activeloan: {
            totalAmount: 0,
            totalWith5Percent: 0
        },
        finishedloan: {
            totalAmount: 0,
            totalWith5Percent: 0
        },
        loanincome: 0
      },
      //  #endregion
    
      //  #region TOTAL USERS

      totaluserloading: false,
      totaluser: {
        user: 0,
        admin: 0,
        customersupport: 0,
        finance: 0
      }

      //  #endregion
    }
  },
  methods: {
    async GetLoanData(){
      this.loanloading = true

      const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/getloansadashboard`, {
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

      this.loan = responseData.data
      this.loanloading = false
    },
    async GetTotalIncomeData(){
      this.incomeloading = true

      const response = await fetch(`${process.env.VUE_APP_API_URL}/cashin/gettotalincome`, {
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

        this.incomeloading = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }

      this.totalincome = responseData.data.totalincome
      this.incomeloading = false
    },
    async GetTotalUsers(){
      this.totaluserloading = true

      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/gettotalusers`, {
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

        this.totaluserloading = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }

      this.totaluser = responseData.data
      this.totaluserloading = false
    },
  },
  mounted(){
    this.GetLoanData()
    this.GetTotalIncomeData()
    this.GetTotalUsers()
  }
};
</script>
