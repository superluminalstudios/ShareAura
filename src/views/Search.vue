<template>
<ion-page>
<ion-content>
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

      <div :class="{ filterBlurOn: blur }">
<div class="fixed-search">
		<div class="search-wrapper">
			<img :src="search" class="search-icon"/>
            <form @submit.prevent="updateSearch">
      <input type="text" placeholder="Search for Books, Stationaries" ref="searchRef" v-model="searchModal" class="search-input"/>
    </form>
    </div>
  </div>
      
  <div class="lower-body">
        
   <div class="request-post" v-for="textbook in searchList" :key="textbook._id"  @click="
              openModal(
                textbook.username,
                textbook.usernumber,
                textbook.itemList
              )
            ">
            <img class="user-avatar-small" :src="`https://ui-avatars.com/api/?background=random&name=${textbook.username.charAt(0)}`"/>
            <div class="request-post-body">
              <h3 class="request-title">{{ textbook.username }}</h3>
              <h3 class="request-subtitle">
                {{ textbook.items }}
              </h3>
            </div>
          </div><br> 

  </div>
  </div>
  </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Search",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    var searchList = ref([])
    const search = require("../assets/search.png");
    var modalUsername = ref("");
    var modalItemList = ref([]);
    var modalUsernumber = ref("");
    var blur = ref(false);
    var searchModal = ref('')

    onMounted(() =>  searchModal.value = route.params.item.replace(':', ''))
    onMounted(() => 
        axios.get(`https://staiclientapi.jeswinsunsi.repl.co/search/${route.params.item.replace(':', '')}`)
        .then((data) => {
               
          for (let itemNum in data.data) {
            let value = data.data[itemNum];
            searchList.value.push(value);
            
            
          }
        })
    )

    function openModal(username, usernumber, itemList) {
      modalUsername.value = username;
      modalUsernumber.value = usernumber;
      modalItemList.value = itemList;
      blur.value = !blur.value;
    }

    function closeModal() {
      blur.value = false;
    }

    
    function updateSearch() {
            searchList.value.length = 0
        axios.get(`https://staiclientapi.jeswinsunsi.repl.co/search/${searchModal.value}`)
        .then((data) => { 
          for (let itemNum in data.data) {
            let value = data.data[itemNum];
            searchList.value.push(value);
          }
        })
    }

    return {
      router,
      route,
      searchList, 

      search, 
      modalUsername, 
      modalUsernumber, 
      blur,
      openModal, 
      closeModal, 
      modalItemList, 
      searchModal, 
      updateSearch,
  
    };
  },
});
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

.lower-body {
    padding-right: 0.8rem;
    padding-left: 0.8rem;
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

::placeholder {
    color: #8F8F97;
    opacity: 1;
}
</style>