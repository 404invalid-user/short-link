<template>
  <Alerts :alerts="alerts" @removeAlert="removeAlert"></Alerts>
  <LoadingScreen v-if="ready == false" />
  <div v-else-if="ready == true" class="page">
    <NavBar />
    <div class="page-wrapper">
      <!-- Page header -->
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <h2 class="page-title">
                Domains
              </h2>
            </div>
          </div>
        </div>
      </div>
      <!-- Page body -->
      <div class="page-body">
        <Table :table="table" @goto="tableGoToPage" />
        <Footer />
      </div>
    </div>
  </div>
</template>
  
<script>
// @ is an alias to /src
import LoadingScreen from '@/components/LoadingScreen.vue';
import Table from '@/components/Table-Domain/Table.vue';
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Alerts from '@/components/Alerts.vue';
//import axios from 'axios';
export default {
  name: 'DomainView',
  components: {
    Alerts,
    LoadingScreen,
    NavBar,
    Footer,
    Table
  },
  data() {
    return {
      ready: false,
      alerts: [],
      domains: [],
      table: {
        title: "aaa",
        currentPageNo: 1,
        countPerPage: 8,
        totalCount: 8,
        currentPage: [
          {
            id: "1",
            domain: "example",
            created: "0000000",
            status: "active",
            numberOfUrls: 0
          }
        ]
      }

    }
  },
  methods: {
    tableGoToPage(pg) {
      this.table.currentPageNo = pg;
      this.table.currentPage = largerArray.slice(this.table.currentPageNo, this.table.currentPageNo + this.table.countPerPage);
    },
    removeAlert(alertid) {
      for (var i = 0; i < this.alerts.length; i++) {
        var obj = this.alerts[i];
        if (obj.id == alertid) {
          this.alerts.splice(i, 1);
        }
      }

    },
    onChallengeExpire() {
      return this.alerts.push({ id: (this.alerts.length + 1).toString(), type: 'info', title: "hcaptcha expired", message: "your hcaptcha expired please do it again." });
    },
    onVerify(tokenStr, ekey) {
      this.form.hcaptchatoken = tokenStr;
      console.log(`Callback token: ${tokenStr}, ekey: ${ekey}`);
    },
    onSubmit() {
      if (this.form.hcaptchatoken == "") {
        return this.alerts.push({ id: (this.alerts.length + 1).toString(), type: 'warn', title: "verify with hcaptcha", message: "please click the hcaptcha check box to verify you are a human." });
      }
    }
  },
  async beforeMount() {
    try {

      this.ready = true;
    } catch {
      this.alerts.push({ id: (this.alerts.length + 1).toString(), type: 'danger', title: "could not fetch hcaptcha", message: "we failed to fetch the hcaptcha site key please reload the page" });
    }
  }
}
</script>
  