<template>
  <ion-page>
    <ion-content>
      <div class="signup-wrapper">
        <div class="signup-upper">
          <img
            :src="backIcon"
            @click="() => router.push('/')"
            class="left-arrow"
          />
          <Carousel :autoplay="4000" :wrap-around="true">
						<Slide v-for="slide in carousalList" :key="slide">
							<div class="carousel__item">
								<img class="carousal-image" :src="slide"/>
							</div>
						</Slide>
					</Carousel>
        </div>
        <div class="signup-lower">
          <form>
            <h1 class="signup-title">Create a new account</h1>
            <div class="signup-inputs">
              <div class="signup-input-wrapper">
                <input
                  type="text"
                  v-model="name"
                  placeholder="Full name"
                  class="signup-input"
                />
              </div>
              <div class="signup-input-wrapper marg">
                <input
                  type="number"
                  v-model="phone"
                  placeholder="Whatsapp Number"
                  class="signup-input"
                />
              </div>
              <div class="signup-input-wrapper marg">
                <input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  class="signup-input"
                />
              </div>
            </div>
            <h3 class="terms">
              By creating an account, you agree with our <br />
              <span class="underline">Terms of Service</span> &
              <span class="underline"> Privacy Policy </span>
            </h3>
            <div class="sign-wrapper">
              <div class="sign-button" @click="authApi">Let's Go!</div>
              <h3 class="sign-in">
                Already have an account?
                <span class="underline" @click="() => router.push('/signin')"
                  >Sign In
                </span>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, defineComponent } from "vue";
import axios from "axios";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { Storage } from "@ionic/storage";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Signup",
  components: {
    IonContent,
    IonPage,
    Carousel,
		Slide
  },
  setup() {
    const backIcon = require("../assets/back.svg");
    const name = ref("");
    const phone = ref("");
    const password = ref("");
    const router = useRouter();
    const store = new Storage();
    const sim1 = require("../assets/sim1.png");
		const sim2 = require("../assets/sim2.png");
		const sim3 = require("../assets/sim3.png");
    const carousalList = [sim1, sim2, sim3]

const storeUserData = async () => {
    await store.create();
    await store.set( "username", name.value);
    await store.set( "phone", phone.value);
}
    
    function authApi() {
      try {
        axios
          .get(
            `https://staiauthapi.jeswinsunsi.repl.co/signup/${phone.value}/${name.value}-break-${password.value}`
          )
          .then((data) => {
            if (data.data.proceed == "True") {
              console.log("Success");
              storeUserData()
              return router.push({ name: "SelectSchool" });
              
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    return {
      backIcon,
      router,
      name,
      phone,
      password,
      authApi,
      store, storeUserData, carousalList
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

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

.signup-wrapper {
  height: 100%;
  width: 100%;
  background-color: #f6f7f9;
}

h1,
h3 {
  padding: 0;
  margin: 0;
}

.signup-upper {
  height: 22.5rem;
  background-color: #ffffff;
  border-bottom-left-radius: 4rem;
  border-bottom-right-radius: 4rem;
}

.left-arrow {
  max-height: 1.5rem;
  max-width: 1.5rem;
  min-height: 1.5rem;
  min-width: 1.5rem;
  position: fixed;
  left: 1.4rem;
  top: 2rem;
}

.carousal-image {
	max-height: 13rem;
	max-width: 13rem;
}

.signup-lower {
  display: flex;
  flex-direction: column;
  background-color: #f6f7f9;
}

.signup-title {
  margin-left: 1.5rem;
  margin-top: 1.2rem;
  font-size: 1.7rem;
  color: #14142b;
  margin-bottom: 0.8rem;
}

.signup-inputs {
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  outline: none;
  background-color: transparent;
}

.signup-input-wrapper {
  margin-top: -0.1rem;
  height: 1.7rem;
  width: 90%;
  border-bottom: 1px solid #a7a7a7;
}

.marg {
  margin-top: 1.4rem;
}

.signup-input {
  margin-top: -0.4rem;
  height: 2rem;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.1rem;
  font-weight: 400;
  color: #3a3e59;
}

.signup-input::placeholder {
  color: #909090;
  font-weight: 300;
}

.terms,
.sign-in {
  text-align: center;
  font-weight: 300;
  font-size: 0.8rem;
  color: #808080;
  margin-top: 0.3rem;
}

.terms {
  margin-bottom: 1rem;
}

.underline {
  text-decoration: underline;
  color: #e83922;
}

.sign-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sign-button {
  height: 3.5rem;
  width: 85%;
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
