<template>
<suspense>
  <ion-app>
    <ion-router-outlet :key="$route.fullPath"/>
  </ion-app>
</suspense>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>
