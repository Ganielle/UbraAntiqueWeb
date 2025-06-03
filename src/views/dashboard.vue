<template>
  <div class="dashboard-container1">
    <app-navbar2
      logoSrc="/ubraantiquelogo-1500h.png"
      rootClassName="navbar2root-class-name"
    >
      <template v-slot:link3>
        <div class="dashboard-fragment1">
          <span class="dashboard-text10">JOB POSTING</span>
        </div>
      </template>
      <template v-slot:link4>
        <div class="dashboard-fragment2">
          <span class="dashboard-text11">SETTINGS</span>
        </div>
      </template>
      <template v-slot:link2>
        <div class="dashboard-fragment3">
          <span class="dashboard-text12">MANAGE USERS</span>
        </div>
      </template>
      <template v-slot:link5>
        <div class="dashboard-fragment4">
          <span class="dashboard-text13">LOGOUT</span>
        </div>
      </template>
      <template v-slot:link1>
        <div class="dashboard-fragment5">
          <span class="dashboard-text14">DASHBOARD</span>
        </div>
      </template>
    </app-navbar2>
    <h1 class="dashboard-text15">DASHBOARD</h1>
    <div class="dashboard-container2">
      <div class="dashboard-container3">
        <span class="dashboard-text16">TOTAL USER</span>
        <span class="dashboard-text17">2</span>
      </div>
      <div class="dashboard-container4">
        <span class="dashboard-text18">TOTAL EMPLOYEES</span>
        <span class="dashboard-text19">1</span>
      </div>
      <div class="dashboard-container5">
        <span class="dashboard-text20">TOTAL EMPLOYER</span>
        <span class="dashboard-text21">1</span>
      </div>
    </div>
    <div class="dashboard-container6">
      <div class="dashboard-container7">
        <span class="dashboard-text22">TOTAL JOB POSTED</span>
        <span class="dashboard-text23">5</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar2 from '../components/navbar2'

export default {
  name: 'Dashboard',
  props: {},
  components: {
    AppNavbar2,
  },
  metaInfo: {
    title: 'Dashboard - Kaleidoscopic Prize Kouprey',
    meta: [
      {
        property: 'og:title',
        content: 'Dashboard - Kaleidoscopic Prize Kouprey',
      },
    ],
  },
}
</script>

<style scoped>
.dashboard-container1 {
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
 
.dashboard-fragment1 {
  display: contents;
}
 
.dashboard-text10 {
  display: inline-block;
}
 
.dashboard-fragment2 {
  display: contents;
}
 
.dashboard-text11 {
  display: inline-block;
}
 
.dashboard-fragment3 {
  display: contents;
}
 
.dashboard-text12 {
  display: inline-block;
}
 
.dashboard-fragment4 {
  display: contents;
}
 
.dashboard-text13 {
  display: inline-block;
}
 
.dashboard-fragment5 {
  display: contents;
}
 
.dashboard-text14 {
  display: inline-block;
}
 
.dashboard-text15 {
  align-self: flex-start;
  margin-top: var(--dl-layout-space-sixunits);
  margin-left: var(--dl-layout-space-sixunits);
}
 
.dashboard-container2 {
  gap: var(--dl-layout-space-sixunits);
  width: 100%;
  height: 222px;
  display: flex;
  margin-top: var(--dl-layout-space-fourunits);
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.dashboard-container3 {
  width: 380px;
  height: 157px;
  display: flex;
  align-items: flex-start;
  border-radius: var(--dl-layout-radius-radius4);
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fd9961;
}
 
.dashboard-text16 {
  font-size: 25px;
  margin-top: var(--dl-layout-space-halfunit);
  margin-left: var(--dl-layout-space-halfunit);
}
 
.dashboard-text17 {
  font-size: 50px;
  align-self: center;
  margin-top: var(--dl-layout-space-oneandhalfunits);
  margin-left: 0px;
}
 
.dashboard-container4 {
  width: 380px;
  height: 157px;
  display: flex;
  align-items: flex-start;
  border-radius: var(--dl-layout-radius-radius4);
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fd9961;
}
 
.dashboard-text18 {
  font-size: 25px;
  margin-top: var(--dl-layout-space-halfunit);
  margin-left: var(--dl-layout-space-halfunit);
}
 
.dashboard-text19 {
  font-size: 50px;
  align-self: center;
  margin-top: var(--dl-layout-space-oneandhalfunits);
  margin-left: 0px;
}
 
.dashboard-container5 {
  width: 380px;
  height: 157px;
  display: flex;
  align-items: flex-start;
  border-radius: var(--dl-layout-radius-radius4);
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fd9961;
}
 
.dashboard-text20 {
  font-size: 25px;
  margin-top: var(--dl-layout-space-halfunit);
  margin-left: var(--dl-layout-space-halfunit);
}
 
.dashboard-text21 {
  font-size: 50px;
  align-self: center;
  margin-top: var(--dl-layout-space-oneandhalfunits);
  margin-left: 0px;
}
 
.dashboard-container6 {
  gap: var(--dl-layout-space-sixunits);
  width: 100%;
  height: 211px;
  display: flex;
  margin-top: var(--dl-layout-space-fourunits);
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.dashboard-container7 {
  width: 380px;
  height: 157px;
  display: flex;
  align-items: flex-start;
  border-radius: var(--dl-layout-radius-radius4);
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fd9961;
}
 
.dashboard-text22 {
  font-size: 25px;
  margin-top: var(--dl-layout-space-halfunit);
  margin-left: var(--dl-layout-space-halfunit);
}
 
.dashboard-text23 {
  font-size: 50px;
  align-self: center;
  margin-top: var(--dl-layout-space-oneandhalfunits);
  margin-left: 0px;
}
 
@media(max-width: 479px) {
  .dashboard-container2 {
    width: 80%;
    height: 100%;
  }
  .dashboard-container6 {
    width: 80%;
    height: 100%;
  }
}
</style>
