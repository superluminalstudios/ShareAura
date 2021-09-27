<template>
    <ion-page>
        <ion-content>
                
				<div class="fixed-search">
					<div class="search-wrapper">
						<img :src="search" class="search-icon" />
						<form @submit.prevent="goToSearch">
							<input type="text" v-model="userSearchInput" placeholder="Search for Books, Stationaries" class="search-input" />
						</form>
					</div>
				</div>
				<div class="upper-body">
					<div class="category-list">
						<div class="cat-1">Textbooks</div>
						<div class="cat-line"></div>
						<div class="cat-1">Notebooks</div>
						<div class="cat-line"></div>
						<div class="cat-1">Stationaries</div>
					</div>
				</div>
				<div class="lower-body">
					<div class="title-group-1">
						<h1 class="titleg1-1">Questions Feed</h1>
						<h1 class="titleg1-2" @click="() => router.go(-1)">Back</h1>
					</div>

					<div class="request-post" v-for="question in allQuesList" :key="question._id" @click="goToQues(question)">
						<img :src="`https://ui-avatars.com/api/?background=random&name=${question.username.charAt(0)}`" class="user-avatar-small" />
						<div class="request-post-body">
							<h3 class="request-title">{{ question.username }}</h3>
							<h3 class="questionsmall-subtitle">{{ question.question }}</h3>
						</div>
					</div>

					<br>
				</div>
	
        </ion-content>
    </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { Storage } from "@ionic/storage";

export default defineComponent({
    name: "AllQuestions",
    components: {
        IonContent,
        IonPage
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
		var allQuesList = ref([]);
		const search = require("../assets/search.png");
		var userSearchInput = ref("");
        const store = new Storage();


        onMounted(() =>
			axios.get(`https://staiclientapi.jeswinsunsi.repl.co/${route.params.school.replace(":", "")}/showquestions/15`).then((data) => {
				for (let itemNum in data.data) {
					let value = data.data[itemNum];
					allQuesList.value.push(value);
				}
			})
		);


        function goToSearch() {
			router.push(`search:${userSearchInput.value}`);
		}
        
        function goToQues(ques) {
			router.push(`question:${encodeURIComponent(JSON.stringify(ques))}`);
		}

        return {
            router, allQuesList, search, userSearchInput, goToSearch, goToQues, store, route
        }
    }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}

html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #F6F7F9;
}

.upper-body {
    height: 4rem;
    width: 100%;
    background-color: #ffffff;
}

.cat-1:hover {
  color: #e83922;
}

.questionsmall-subtitle {
	padding: 0;
	margin: 0;
	font-size: 0.8rem;
	font-weight: 500;
	color: #5e6174;
	font-family: "Poppins", sans-serif;
}

.search-icon {
    max-height: 1.5rem;
    max-width: 1.5rem;
    min-height: 1.5rem;
    min-width: 1.5rem;
    margin-right: 0.5rem;
}

.fixed-search {
    position: sticky;
    background-color: #ffffff;
    top: 0;
    height: 3.6rem;
    padding-top: 0.7rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
}

.search-wrapper {
    display: flex;
    align-items: center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
}

.search-input {
    height: 2rem;
    width: 87%;
    font-size: medium;
    border: none;
    outline: none;
    padding-top: 0.2rem;
}

.category-list {
    height: 3rem;
    background-color: #EAEDF2;
    margin-right: 0.8rem;
    margin-left: 0.8rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #5E6174;
}

.cat-line {
    height:100%;
    width: 0.2rem;
    background-color: #F6F7F9;
}

/* Todo - Remove This Line And Add it Dynamically Thru JS*/


.lower-body {
    padding-right: 0.8rem;
    padding-left: 0.8rem;
}

.title-group-1 {
    display: flex;
    justify-content: space-between;
    align-items:- center;
    margin-top: 0.7rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    margin-bottom: 1.2rem;
} 

.titleg1-1 {
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
    color: #3A3E59;
}

.titleg1-2 {
    font-size: 1rem;
    padding: 0;
    margin: 0;
    color: #E83922;
}

.request-post {
    height: 4.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    background-color:#ffffff;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
}

.user-avatar-small {
    border-radius: 50%;
    max-height: 2.7rem;
    max-width: 2.7rem;
    min-height: 2.7rem;
    min-width: 2.7rem;
    margin-right: 0.7rem;
    margin-left: 0.7rem;
}

.request-title {
    padding: 0;
    margin: 0;
    margin-top: 0.1rem;
    font-size: 0.8rem;
    color: #3A3E59;
}

.request-subtitle {
    padding: 0;
    margin: 0;    
    font-size: 0.7rem;
    font-weight: 500;
    color: #5E6174;
    font-family: 'Poppins', sans-serif;
}

.request-post-body {
    display: flex;
    flex-direction: column;
    align-content: space-between;
}

</style>