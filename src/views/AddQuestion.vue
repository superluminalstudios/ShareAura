<template>
	<ion-page>
		<ion-content>
			<div class="cp-wrapper">
				<div class="cp-upper-wrapper">
					<img :src="backIcon" class="left-arrow" @click="() => router.push('/home')"/>
					<h3 class="cp-title">Post a question</h3>
					<h3 class="cp-subtitle">Make use of the community to settle your doubts. Keep questions civil and concise. Avoid using uneccessary terms like 'Urgent' and 'Help'. Explicit content will be removed and the poster's account banned.</h3>
				</div>
				<div class="cp-lower-wrapper">
					<div class="q-search-wrapper">
						<input v-model="qtitle" class="q-search-input" placeholder="Question Title" type="text" />
					</div>
					<div class="q-search-wrapper">
						<textarea v-model="qdesc" class="qt-search-input" placeholder="Question Title" maxlength="125"></textarea>
					</div>
					<div class="cp-sign-button" @click="addQuestion">
						Confirm & Post
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import axios from "axios";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import { Storage } from "@ionic/storage";

export default defineComponent({
    name: "AddQuestion",
    components: {
        IonContent, IonPage
    },
    setup() {
        const backIcon = require("../assets/back.svg");
        const router = useRouter();
        var qtitle = ref('');
        var qdesc = ref ('');
        const store = new Storage();

        const addQuestion = async () => {
            await store.create();
			const nameData = await store.get("username");
            axios.get(`https://staiclientapi.jeswinsunsi.repl.co/addquestion/${nameData}/${qtitle.value}/${qdesc.value}`)
            qtitle.value = ''
            qdesc.value = ''
            router.push('/home')
            createToast({ title: "Success", description: "Your question has been posted" }, { type: "success", position: "bottom-right", transition: "slide", timeout: 3000 });

        }

        return {
            router, backIcon, qtitle, qdesc, addQuestion, store
        }
    }
})


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

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	padding: 0;
}

.cp-wrapper {
	height: 100%;
	width: 100%;
	background-color: #f6f7f9;
}

.cp-upper-wrapper {
	height: 14rem;
	width: 100%;
	border-bottom-left-radius: 3rem;
	border-bottom-right-radius: 3rem;
	background-color: #ffffff;
	margin-bottom: 1.75rem;
}

.cp-lower-wrapper {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
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

.cp-title {
	padding: 0;
	margin: 0;
	padding-top: 5.5rem;
	font-size: 1.75rem;
	color: #3a3e59;
	padding-left: 1.7rem;
}

.cp-subtitle {
	padding: 0;
	margin: 0;
	font-size: 0.8rem;
	font-weight: lighter;
	color: #5e6174;
	font-family: "Poppins", sans-serif;
	margin-bottom: 0.6rem;
	padding-left: 1.7rem;
	padding-right: 2rem;
}

.q-search-wrapper {
	width: 90%;
	display: flex;
	align-items: center;
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
	padding-left: 0.8rem;
	border-radius: 0.5rem;
	box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
	background-color: white;
	margin-bottom: 0.75rem;
}

.q-search-input {
	height: 2.3rem;
	width: 87%;
	font-size: medium;
	border: none;
	outline: transparent;
	padding-top: 0.2rem;
	background-color: white;
    color: #000000;
}

.qt-search-input {
	height: 6rem;
	width: 87%;
	font-size: medium;
	border: none;
	outline: transparent;
	padding-top: 0.2rem;
	background-color: white;
    color: #000000;
}

.cp-add {
	color: #e83922;
	text-decoration: underline;
}

.cp-sign-button {
	height: 3.5rem;
	width: 85%;
	color: white;
	background-color: #e83922;
	border-radius: 1.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	font-size: 1.25rem;
	margin-top: 2rem;
}
</style>
