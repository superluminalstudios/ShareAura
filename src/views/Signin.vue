<template>
	<ion-page>
		<ion-content>
			<div class="signup-wrapper">
				<div class="signup-upper">
					<img :src="backIcon" @click="() => router.push('/')" class="left-arrow" />
					<!--TODO: Carousal-->
					<Carousel :autoplay="4000" :wrap-around="true">
						<Slide v-for="slide in carousalList" :key="slide">
							<div class="carousel__item">
								<img class="carousal-image" :src="slide"/>
							</div>
						</Slide>
					</Carousel>
				</div>
				<div class="signup-lower">
					<h1 class="signin-title">Sign in to your account</h1>
					<div class="signup-inputs">
						<div :class="{ red: signInFailed }" class="signin-input-wrapper">
							<input type="number" v-model="phone" placeholder="Phone" class="signup-input" />
						</div>
						<div :class="{ red: signInFailed }" class="signin-input-wrapper marg">
							<input type="password" v-model="password" placeholder="Password" class="signup-input" />
						</div>
					</div>
					<h3 class="in-terms">
						By using our service, you agree with our <br />
						<span class="underline">Terms of Service</span> &
						<span class="underline"> Privacy Policy </span>
					</h3>
					<div class="sign-wrapper" @click="authApi">
						<div class="sign-button">Let's Go!</div>
						<h3 class="sign-in">
							Don't have an account?
							<span class="underline" @click="() => router.push('/signup')">Sign Up </span>
						</h3>
					</div>
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
	name: "Signin",
	components: {
		IonContent,
		IonPage,
		Carousel,
		Slide
	},
	setup() {
		const backIcon = require("../assets/back.svg");
		const sim1 = require("../assets/sim1.png");
		const sim2 = require("../assets/sim2.png");
		const sim3 = require("../assets/sim3.png");
		const phone = ref("");
		const password = ref("");
		const router = useRouter();
		const store = new Storage();
		const name = ref("");
		var signInFailed = ref(false);
		const carousalList = [sim1, sim2, sim3]

		const storeUserData = async () => {
			await store.create();
			await store.set("username", name.value);
			await store.set("phone", phone.value);
		};

		function authApi() {
			try {
				axios.get(`https://staiauthapi.jeswinsunsi.repl.co/signin/${phone.value}/${password.value}`).then((data) => {
					if (data.data.proceed == "True") {
						name.value = data.data.name;
						storeUserData();
						router.push({ name: "SelectSchool" });
					} else {
						signInFailed.value = true;
					}
				});
			} catch (err) {
				console.log(err);
			}
		}

		return {
			backIcon,
			router,
			phone,
			password,
			authApi,
			storeUserData,
			name,
			signInFailed,
			carousalList
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

.carousal-image {
	max-height: 13rem;
	max-width: 13rem;
}

.signup-upper {
	height: 22.5rem;
	background-color: #ffffff;
	border-bottom-left-radius: 4rem;
	border-bottom-right-radius: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
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

.signup-lower {
	display: flex;
	flex-direction: column;
	background-color: #f6f7f9;
}

.signin-title {
	margin-left: 1.5rem;
	margin-top: 1.2rem;
	font-size: 1.7rem;
	color: #14142b;
}

.signup-inputs {
	display: flex;
	flex-direction: column;
	margin-left: 1.5rem;
}

.signin-input-wrapper {
	margin-top: 2.25rem;
	height: 1.7rem;
	width: 90%;
	border-bottom: 1px solid #a7a7a7;
}

.red {
	border-bottom: 1.5px solid red !important;
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

.in-terms {
	text-align: center;
	font-weight: 300;
	font-size: 0.8rem;
	color: #808080;
	margin-bottom: 1rem;
	margin-top: 2rem;
}

.sign-in {
	text-align: center;
	font-weight: 300;
	font-size: 0.8rem;
	color: #808080;
	margin-top: 0.3rem;
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
