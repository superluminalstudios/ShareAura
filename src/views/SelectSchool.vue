<template>
	<ion-page>
		<ion-content>
			<div class="sc-wrapper">
				<div class="sc-box">
					<div class="sc-words">
						<h1 class="sc-title">Just one more thing..</h1>
						<h3 class="sc-subtitle">Select a school before continuing. This will help us personalize your feed.</h3>
					</div>
					<div class="sc-options">
						<div class="sc-rad">
							<input type="radio" value="iss" name="school" v-model="scl" checked />
							<h6 class="sc-rad-text">Indian School Salalah</h6>
						</div>
						<div class="sc-rad">
							<input type="radio" value="ism" name="school" v-model="scl"/>
							<h6 class="sc-rad-text">Indian School Muscat</h6>
						</div>
						<div class="sc-rad">
							<input type="radio" value="isam" name="school" v-model="scl"/>
							<h6 class="sc-rad-text">Indian School Al Maabela</h6>
						</div>
						<div class="sc-rad">
							<input type="radio" value="iswk" name="school" v-model="scl"/>
							<h6 class="sc-rad-text">Indian School Wadi Kabir</h6>
						</div>
					</div>
					<div class="sc-ok-button" @click="addSchool">
						Proceed
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { ref, defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { Storage } from "@ionic/storage";

export default defineComponent({
	name: "SelectSchool",
	components: {
		IonContent,
		IonPage,
	},
	setup() {
        var scl = ref('ISS')
        const router = useRouter();
        const store = new Storage();

        const addSchool = async () => {
            await store.create();
            await store.set( "school", scl.value);
            return router.push({ name: 'Home', params: {school: `:${scl.value}`} });
        }
        return {
            scl, addSchool, router, store
        }
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
	background-color: #f6f7f9;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	padding: 0;
}

.sc-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.sc-box {
	height: 17rem;
	width: 85%;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
}

.sc-title {
	font-size: 1.5rem;
	margin-top: 0.5rem;
}

.sc-subtitle {
	font-size: 0.8rem;
	font-weight: 400;
	color: gray;
	margin-bottom: 1rem;
}

.sc-rad {
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
}

.sc-rad-text {
	font-weight: 400;
	margin-left: 0.2rem;
	font-size: 1rem;
	margin-bottom: -0.2rem;
}

.sc-ok-button {
	height: 2.5rem;
	width: 30%;
	color: white;
	background-color: #e83922;
	border-radius: 0.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	font-size: 1rem;
	margin-top: 1rem;
}
</style>
