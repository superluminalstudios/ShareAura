<template>
  <ion-page>
    <ion-content>
      <div class="flex-wrapper">
        <div class="main-wrapper">
          <img :src="welcome" class="welcome-image" />
          <div class="content">
            <h1 class="welcome-heading">Welcome</h1>
            <h3 class="welcome-subtitle">
              Glad you’re here. Answer a <br />
              few short questions to get <br />
              started.
            </h3>
          </div>
          <div class="welcome-button" @click="() => router.push('/signup')">
            Let's Go!
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Welcome",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const welcome = require("../assets/welcome.svg");
    const router = useRouter();
    return {
      welcome,
      router,
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex-wrapper {
  height: 100%;
  width: 100%;
  background-color: #f6f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: -3rem;
}

h1,
h3 {
  padding: 0;
  margin: 0;
}

.welcome-heading {
  font-weight: 700;
  font-size: 2.5rem;
  margin-top: -4.4rem;
  margin-bottom: 0.3rem;
  color: #14142b;
}

.welcome-subtitle {
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 4.2rem;
  color: #4e4b66;
}

.welcome-image {
  min-height: 22rem;
  min-width: 22rem;
  max-height: 22rem;
  max-width: 22rem;
}

.welcome-button {
  height: 3.5rem;
  width: 13rem;
  color: white;
  background-color: #e83922;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
}
</style>
