<template>
	<ion-page>
		<ion-content v-for="item in data" :key="item._id">
			<div class="question-wrapper">
				<div class="question-top-wrapper">
					<h3 class="q-heading">{{ item.question }}</h3>
					<h5 class="q-subheading">
						Asked by <span class="q-orange">{{ item.username }}</span> on {{ item.date }}
					</h5>
					<h4 class="q-desc">{{ item.desc }}</h4>
				</div>

				<div class="question-bottom-wrapper">
					<div class="title-group-1">
						<h1 class="titleg1-1">Answers</h1>
						<h1 class="titleg1-2" @click="goBack">Back</h1>
					</div>

					<div class="user-ans-wrapper">
						<form @submit.prevent="addNewAnswer(item._id)">
							<input v-model="userAns" type="text" placeholder="Add an answer" class="q-input" />
						</form>
					</div>

					<div class="qanswer-post" v-for="answer in item.comments" :key="answer.id">
						<div class="qanswer-post-body">
							<h3 class="qanswer-title">{{ answer.username }} <span class="qanswer-span">answered</span></h3>
							<h3 class="qanswer-subtitle">{{ answer.answer }}</h3>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { Storage } from "@ionic/storage";

export default defineComponent({
	name: "Question",
	components: {
		IonContent,
		IonPage,
	},
	setup() {
		const route = useRoute();
		var data = ref([]);
		const router = useRouter();
		var userAns = ref("");
		const store = new Storage();

		onMounted(() => data.value.push(JSON.parse(route.params.q.replace(":", ""))));

		function goBack() {
			router.go(-1);
		}

		const addNewAnswer = async (idAns) => {
			await store.create();
			const nameData = await store.get("username");
			const schoolData = await store.get("school");
			axios.get(`https://staiclientapi.jeswinsunsi.repl.co/${schoolData}/addanswer/${nameData}/${idAns}/${encodeURIComponent(userAns.value)}`);
			userAns.value = "";
			createToast({ title: "Success", description: "Your answer has been posted" }, { type: "info", position: "bottom-right", transition: "slide", timeout: 3000 });
		};

		return {
			route,
			data,
			router,
			goBack,
			addNewAnswer,
			userAns,
			store,
		};
	},
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

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

.title-group-1 {
	display: flex;
	justify-content: space-between;
	align-items: -center;
	margin-top: 0.7rem;
	margin-left: 0.4rem;
	margin-right: 0.4rem;
	margin-bottom: 1.2rem;
}

.titleg1-1 {
	font-size: 1.2rem;
	padding: 0;
	margin: 0;
	color: #3a3e59;
}

.titleg1-2 {
	font-size: 1rem;
	padding: 0;
	margin: 0;
	color: #e83922;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	padding: 0;
	margin: 0;
}

.question-top-wrapper {
	background-color: #ffffff;
	padding-left: 0.8rem;
	padding-right: 0.8rem;
	border-bottom-left-radius: 2rem;
	border-bottom-right-radius: 2rem;
	height: min-content;
}

.q-heading {
	padding-top: 1rem;
	padding-bottom: 0;
}

.q-subheading {
	color: #3f3f3f;
	font-weight: 400;
	font-size: 0.7rem;
}

.q-desc {
	color: #101010;
	font-weight: 500;
	font-size: 0.8rem;
	margin-top: 1rem;
	padding-bottom: 1rem;
}

.q-orange {
	color: #a34100;
}

.question-bottom-wrapper {
	padding-left: 0.8rem;
	padding-right: 0.8rem;
}

.question-wrapper {
	background-color: #f6f7f9;
	height: 100%;
}

.user-ans-wrapper {
	height: 2.6rem;
	width: 100%;
	background-color: #ffffff;
	border-radius: 0.5rem;
	margin-bottom: 0.7rem;
}

.q-input {
	background-color: #ffffff;
	color: #494848;
	outline: none;
	border: none;
	height: 2.5rem;
	width: 95%;
	font-size: 0.99rem;
	margin-left: 0.3rem;
}

.qanswer-post {
	height: min-content;
	width: 100%;
	display: flex;
	align-items: center;
	background-color: #ffffff;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
}

.qanswer-title {
	padding: 0;
	padding-top: 0.5rem;
	padding-left: 0.5rem;
	margin: 0;
	margin-top: 0.1rem;
	margin-bottom: 0.3rem;
	font-size: 0.8rem;
	color: #a34100;
}

.qanswer-subtitle {
	padding: 0;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	padding-bottom: 0.5rem;
	margin: 0;
	font-size: 0.7rem;
	font-weight: 500;
	color: #5e6174;
	font-family: "Poppins", sans-serif;
}

.qanswer-post-body {
	display: flex;
	flex-direction: column;
	align-content: space-between;
}

.qanswer-span {
	font-size: 0.6rem;
	color: #000000;
}
</style>
