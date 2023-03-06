<template>
    <div class="alerts">


        <div v-for="alert of alerts" :key="alert.id" :class="'alert alert-' + alert.type + ' alert-dismissible'" role="alert">
            <div class="d-flex">
                <div>
                    <!-- Download SVG icon from http://tabler-icons.io/i/alert-triangle -->

                    <svg v-if="alert.type == 'warning'" xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 9v2m0 4v.01" />
                        <path
                            d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                    </svg>
                    <svg v-else-if="alert.type == 'danger'" xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 8l0 4" /><path d="M12 16l.01 0" /></svg>
                    <svg v-else-if="alert.type == 'info'" xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 8l.01 0" /><path d="M11 12l1 0l0 4l1 0" /></svg>
                    <svg v-else-if="alert.type == 'sucess'" xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
    
                </div>
                <div>
                    <h4 class="alert-title">{{alert.title}}</h4>
                    <div class="text-muted">{{alert.message}}</div>
                </div>
            </div>
            <a class="btn-close" @click="$emit('remove-alert', alert.id)" data-bs-dismiss="alert" aria-label="close"></a>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Alerts-things',
    props: {
        alerts: Object
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>.alerts {
    position: fixed;
    overflow-y: scroll;
    max-height: 100%;
    z-index: 4;
    right: 0;
    top: 0;
}</style>
  