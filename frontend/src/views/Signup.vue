<template>
    <Alerts :alerts="alerts" @removeAlert="removeAlert"></Alerts>
    <LoadingScreen v-if="ready == false" />
    <div v-else-if="ready == true" class="page page-center">
        <div class="container container-tight py-4">
            <div class="text-center mb-4">
                <a href="." class="navbar-brand navbar-brand-autodark"><img src="/static/logo.svg" height="36" alt=""></a>
            </div>
            <div class="card card-md" action="/adminsettings/signup" method="get" autocomplete="off" novalidate>
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">Create new account</h2>
                    <div class="mb-3">
                        <label class="form-label">username</label>
                        <input v-model="form.username" type="text" class="form-control" placeholder="Enter username">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                        <input v-model="form.email" type="email" class="form-control" placeholder="Enter email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <div class="input-group input-group-flat">
                            <input v-model="form.password" type="password" class="form-control" placeholder="Password"
                                autocomplete="off">
                            <span class="input-group-text">
                                <a href="#" class="link-secondary" title="Show password"
                                    data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                        <path
                                            d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                                    </svg>
                                </a>
                            </span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Verify Password</label>
                        <div class="input-group input-group-flat">
                            <input v-model="form.verifypassword" type="password" class="form-control"
                                placeholder="Verify Password" autocomplete="off">

                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-check">
                            <input type="checkbox" class="form-check-input" />
                            <span class="form-check-label">Agree the <a href="/adminsettings/terms-of-service"
                                    tabindex="-1">terms
                                    and policy</a>.</span>
                        </label>
                    </div>
                    <vue-hcaptcha style="display: flex;align-items: center;justify-content: center;" :sitekey="hcaptchaKey"
                        @verify="onVerify" @expired="onExpire" @challenge-expired="onChallengeExpire" @error="onError" />
                    <div class="form-footer">
                        <button type="submit" @click="onSubmit" class="btn btn-primary w-100">Create new account</button>
                    </div>
                </div>
            </div>
            <div class="text-center text-muted mt-3">
                Already have account? <a href="/adminsettings/signin" tabindex="-1">Sign in</a>
            </div>
        </div>
    </div>
</template>
  
<script>
// @ is an alias to /src
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import LoadingScreen from '@/components/LoadingScreen.vue';
import Alerts from '@/components/Alerts.vue';
import axios from 'axios';
export default {
    name: 'Sign-up',
    components: {
        Alerts,
        VueHcaptcha,
        LoadingScreen
    },
    data() {
        return {
            ready: false,
            hcaptchaKey: "0",
            alerts: [],
            form: {
                username: "",
                email: "",
                password: "",
                verifypassword: "",
                hcaptchatoken: ""
            }
        }
    },
    methods: {
        removeAlert(alertid) {
            for (var i = 0; i < this.alerts.length; i++) {
                var obj = this.alerts[i];
                if (obj.id == alertid) {
                    this.alerts.splice(i, 1);
                }
            }
        },
        newAlert(type, title, message) {
            this.alerts.push({ id: (this.alerts.length + 1).toString(), type: type, title: title, message: message });

        },
        onChallengeExpire() {
            return this.newAlert('info', "hcaptcha expired", "your hcaptcha expired please do it again.");
        },
        onVerify(tokenStr, ekey) {
            this.form.hcaptchatoken = tokenStr;
            console.log(`Callback token: ${tokenStr}, ekey: ${ekey}`);
        },
        async onSubmit() {
            if (this.form.hcaptchatoken == "") {
                return newAlert('warn', "verify with hcaptcha", "please click the hcaptcha check box to verify you are a human.");
                }
            try {
                const loginres = await axios.post('/adminsettings/signup', this.form);
                if (loginres.data.error !=null) {
                    return this.newAlert('error', loginres.data.error, loginres.data.message);
                } else {
                    return this.newAlert('success', loginres.data.success, loginres.data.message);
                    setTimeout(()=>{
                        window.location.href="/adminsettings/login";
                    },600)
                }
            } catch (err) {
                console.log(err.stack || err);
                return this.newAlert('warn', "Signup failed", "you could not sign up because of an unknown reason.");
            }
        }
    },
    async beforeMount() {
        try {
            const res = await axios.get('/adminsettings/api/hcaptcha-sitekey');
            this.hcaptchaKey = res.data.key;
            this.ready = true;
        } catch {
            this.alerts.push({ id: (this.alerts.length + 1).toString(), type: 'danger', title: "could not fetch hcaptcha", message: "we failed to fetch the hcaptcha site key please reload the page" });
        }
    }
}
</script>
  