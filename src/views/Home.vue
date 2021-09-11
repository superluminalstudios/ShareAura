<template>
   <ion-page>
      <ion-content>
         <!--Add this in-->
         <transition name="fade">
            <div class="popup" v-show="blur">
               <div class="popup-top">
                  <img
                     :src="
                     `https://ui-avatars.com/api/?background=random&name=${modalUsername.charAt(
                     0
                     )}`
                     "
                     class="user-avatar-small"
                     />
                  <h3 class="request-title">{{ modalUsername }}</h3>
               </div>
               <div class="popup-mid-wrapper">
                  <div>
                     <h4
                        class="popup-mid"
                        v-for="item in modalItemList"
                        :key="item.index"
                        >
                        · {{ item }}
                     </h4>
                  </div>
                  <div class="popup-bottom-wrapper">
                     <div class="popup-bottom-unim" @click="closeModal">
                        Cancel
                     </div>
                     <a
                        target="_blank"
                        :href="
                        `https://api.whatsapp.com/send/?phone=%+968${modalUsernumber}&text=Hey, I've seen your post on ShareAura and I have the books you need. Let's share?`
                        "
                        @click="closeModal"
                        >
                        <div class="popup-bottom">
                           Contact
                        </div>
                     </a>
                  </div>
               </div>
            </div>
         </transition>
         <!--Add this in-->
         <div :class="{ filterBlurOn: blur }">

            <div class="fixed-search">
               <div class="search-wrapper">
                  <img :src="search" class="search-icon" />

                  <form @submit.prevent="goToSearch">
                    <input v-model="userSearchInput"
                      type="text"
                      placeholder="Search for Books, Stationaries"
                      class="search-input"
                    />
                  </form>

               </div>
            </div>

            <div class="upper-body">
               <div class="category-list">
                  <div class="cat-1" @click="changeHomeList('textbook')">
                     Textbooks
                  </div>
                  <div class="cat-line"></div>
                  <div class="cat-1" @click="changeHomeList('notebook')">
                     Notebooks
                  </div>
                  <div class="cat-line"></div>
                  <div class="cat-1" @click="changeHomeList('stationary')">
                     Stationaries
                  </div>
               </div>
            </div>
            <div class="lower-body">
               <div class="title-group-1">
                  <h1 class="titleg1-1">Requests</h1>
                  <h1 class="titleg1-2" @click="() => router.push('/AllRequests')">View All</h1>
               </div>
               <div
                  class="request-post"
                  v-for="textbook in homeList"
                  :key="textbook._id"
                  @click="
                  openModal(
                  textbook.username,
                  textbook.usernumber,
                  textbook.itemList
                  )
                  "
                  >
                  <img
                     class="user-avatar-small"
                     :src="
                     `https://ui-avatars.com/api/?background=random&name=${textbook.username.charAt(
                     0
                     )}`
                     "
                     />
                  <div class="request-post-body">
                     <h3 class="request-title">{{ textbook.username }}</h3>
                     <h3 class="request-subtitle">
                        {{ textbook.items }}
                     </h3>
                  </div>
               </div>
               <div class="create-wrapper">
                  <img class="create-image" :src="pattern" />
                  <div class="create-post-body">
                     <h3 class="create-title">Grow the Community</h3>
                     <h3 class="create-subtitle">
                        Need a textbook or want to find get notes? Make a request post
                        and source it from the community.
                     </h3>
                  </div>
                  <div class="create-buttons">
                     <div class="create-button" @click="() => router.push('/AddRequest')">Request Books</div>
                  </div>
               </div>
               <div class="title-group-1">
                  <h1 class="titleg1-1">Catalogue</h1>
                  <h1 class="titleg1-2">View All</h1>
               </div>
               <div class="request-post">
                  <img :src="pattern" class="book-cover" />
                  <div class="cat-post-body">
                     <div class="request-text">
                        <h3 class="request-title">RD Sharma Math Guide 11th</h3>
                        <h3 class="request-subtitle">RD Publications</h3>
                     </div>
                  </div>
                  <div class="cat-price">
                     <img class="cat-bell" :src="nosub" />
                  </div>
               </div>
               <br />
            </div>
         </div>
      </ion-content>
   </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const search = require("../assets/search.png");
    const pattern = require("../assets/pattern.svg");
    const nosub = require("../assets/nosub.svg");
    var homeList = ref([]);
    var modalUsername = ref("");
    var modalItemList = ref([]);
    var modalUsernumber = ref("");
    var blur = ref(false);
    const router = useRouter();
    var userSearchInput = ref('')

    onMounted(() =>
      axios
        .get(`https://staiclientapi.jeswinsunsi.repl.co/category/textbook/3`)
        .then((data) => {
          for (let itemNum in data.data) {
            let value = data.data[itemNum];
            homeList.value.push(value);
          }
        })
    );

    function changeHomeList(param) {
      homeList.value.length = 0; // Deletes everything in homeList array
      axios
        .get(`https://staiclientapi.jeswinsunsi.repl.co/category/${param}/3`)
        .then((data) => {
          for (let itemNum in data.data) {
            let value = data.data[itemNum];
            homeList.value.push(value);
          }
        });
    }

    function goToSearch(){
      router.push(`search:${userSearchInput.value}`)
    }

    function openModal(username, usernumber, itemList) {
      modalUsername.value = username;
      modalUsernumber.value = usernumber;
      modalItemList.value = itemList;
      blur.value = !blur.value;
    }

    function closeModal() {
      blur.value = false;
    }

    return {
      search,
      pattern,
      nosub,
      homeList,
      changeHomeList,
      openModal,
      modalUsername,
      modalUsernumber,
      modalItemList,
      blur,
      closeModal,
      router, userSearchInput, goToSearch
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");

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

.upper-body {
  height: 4rem;
  width: 100%;
  background-color: #ffffff;
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

.cat-1:hover {
  color: #e83922;
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
  background-color: transparent;
  color: black;
}

.category-list {
  height: 3rem;
  background-color: #eaedf2;
  margin-right: 0.8rem;
  margin-left: 0.8rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #5e6174;
}

.cat-line {
  height: 100%;
  width: 0.2rem;
  background-color: #f6f7f9;
}

.lower-body {
  padding-right: 0.8rem;
  padding-left: 0.8rem;
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
  font-weight: 600;
}

.titleg1-2 {
  font-size: 1rem;
  padding: 0;
  margin: 0;
  font-weight: 600;
  color: #e83922;
}

.request-post {
  height: 4.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
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
  color: #3a3e59;
  font-weight: 600;
}

.request-subtitle {
  padding: 0;
  margin: 0;
  font-size: 0.7rem;
  font-weight: 500;
  color: #5e6174;
  font-family: "Poppins", sans-serif;
}

.create-wrapper {
  margin-top: 2rem;
  width: 100%;
  height: 18rem;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
  align-items: center;
  margin-bottom: 2rem;
}

.create-image {
  max-height: 8.8rem;
  max-width: 100%;
  min-height: 8.8rem;
  min-width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
}

.create-post-body {
  display: flex;
  flex-direction: column;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}

.create-title {
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  font-size: medium;
  color: #3a3e59;
  font-weight: 600;
}

.create-subtitle {
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  font-weight: lighter;
  color: #5e6174;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0.6rem;
}

.request-post-body {
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

.create-buttons {
  height: 3rem;
  width: 95%;
  background-color: #fcebe7;
  border-radius: 0.3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.create-button {
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
  color: #d27e6e;
}

::placeholder {
  color: 8f8f97;
  opacity: 1;
}

.book-cover {
  max-height: 3.4rem;
  max-width: 3.4rem;
  min-height: 3.4rem;
  min-width: 3.4rem;
  margin-right: 0.7rem;
  margin-left: 0.4rem;
  border-radius: 0.5rem;
}

.cat-price {
  min-height: 3.2rem;
  min-width: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaedf2;
  margin-left: 0.6rem;
  margin-right: 0.3rem;
  border-radius: 0.3rem;
}

.cat-post-body {
  display: flex;
  flex-direction: row;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cat-bell {
  max-height: 3rem;
  max-width: 3rem;
}

.request-text {
  display: flex;
  flex-direction: column;
}

/*Add this in*/
.popup {
  width: 90%;
  background-color: #ffffff;
  height: min-content;
  border-radius: 0.5rem;
  padding-top: 0.7rem !important;
  box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
  margin-bottom: 0.5rem;
  z-index: 99;
  position: fixed;
  right: 0;
  left: 0;
  padding: 0.5rem;
  padding-left: 0.3rem !important;
  margin: 0 auto;
  top: 40%;
}

.popup-top {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.popup-mid {
  padding: 0;
  margin: 0;
  color: #5e6174;
  font-size: 0.8rem;
  line-height: 1.2rem;
  font-weight: 500;
  margin-left: 1rem;
}

.popup-bottom {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.5rem;
  background-color: #fcebe7;
  color: #d27e6e;
  width: min-content;
  height: min-content;
  margin-right: 0.7rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
}

a {
  text-decoration: none;
}

.popup-mid-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}

.popup-bottom-wrapper {
  display: flex;
  align-items: center;
}

.popup-bottom-unim {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.5rem;
  background-color: #dcdcdc;
  color: #2f4f4f;
  width: min-content;
  height: min-content;
  margin-right: 0.7rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.filterBlurOn {
  filter: blur(10px);
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  25% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
}
</style>
