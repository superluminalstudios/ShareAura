<template>
  <ion-page>
    <ion-content>
      <div class="cp-wrapper">
        <div class="cp-upper-wrapper">
          <img :src="backIcon" class="left-arrow" @click="() => router.push('/home')"/>
          <h3 class="cp-title">Create a request</h3>
          <h3 class="cp-subtitle">
            Creating a request helps peers that have the books you need find you
            without hassle. Your contact number will be shared across our
            service.
          </h3>
        </div>

        <div class="cp-lower-wrapper">
          <div class="cp-search-wrapper">
            <input
              v-model="input1"
              class="cp-search-input"
              placeholder="Find and Add items."
              list="items"
            />
          </div>
          <div class="cp-search-wrapper" v-if="inputNumber >= 2">
            <input
              v-model="input2"
              class="cp-search-input"
              placeholder="Find and Add items."
              list="items"
            />
          </div>
          <div class="cp-search-wrapper" v-if="inputNumber >= 3">
            <input
              v-model="input3"
              class="cp-search-input"
              placeholder="Find and Add items."
              list="items"
            />
          </div>

          <datalist id="items">
            <option value="Phy 11"> </option>
            <option value="Maths 11"> </option>
            <option value="Chem 11"> </option>
            <option value="Bio 11"> </option>
            <option value="CS 11 P.1"> </option>
            <option value="Applied Maths 11"> </option>
            <option value="Math 11 CW"> </option>
            <option value="Chem 11 CW"> </option>
            <option value="Bio 11 CW"> </option>
            <option value="Phy 11 CW"> </option>
            <option value="Color Pastels"> </option>
            <option value="Geometry Box"> </option>
          </datalist>

          <span class="cp-temp" v-if="inputNumber < 3">
            <h3 class="cp-subtitle cp-add" @click="addInput">
              Add another item
            </h3></span
          >
          <div class="cp-sign-button" @click="addRequest">
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
  name: "AddRequest",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const backIcon = require("../assets/back.svg");
    const router = useRouter();
    var inputNumber = ref(1);
    const store = new Storage();
    var input1 = ref('')
    var input2 = ref('')
    var input3 = ref('')

  
    function addInput() {
      inputNumber.value++;
    }

    const addRequest = async () => {
      await store.create();
      const phoneData = await store.get("phone")
      const nameData = await store.get("username")
      
      if (
        inputNumber.value==3
      ) {
        axios
          .get(
            `https://staiclientapi.jeswinsunsi.repl.co/add/${nameData}/${phoneData}/${input1.value}+${input2.value}+${input3.value}`
          )
          .then((data) => {
            console.log(data.data);
          });
        router.push("/home");
        input1.value = "";
        input2.value = "";
        input3.value = "";
        inputNumber.value=1
        createToast({ title: 'Success', description: 'Your request has been posted'}, {type: 'success', position: 'bottom-right', transition: 'slide', timeout: 3000})
      } else if (inputNumber.value==2) {
        axios
          .get(
            `https://staiclientapi.jeswinsunsi.repl.co/add/${nameData}/${phoneData}/${input1.value}+${input2.value}`
          )
          .then((data) => {
            console.log(data.data);
          });
        router.push("/home");
        input1.value = "";
        input2.value = "";
        inputNumber.value=1
        createToast({ title: 'Success', description: 'Your request has been posted'}, {type: 'success', position: 'bottom-right', transition: 'slide', timeout: 3000})
      } else {
        axios
          .get(
            `https://staiclientapi.jeswinsunsi.repl.co/add/${nameData}/${phoneData}/${input1.value}`
          )
          .then((data) => {
            console.log(data.data);
          });
        router.push("/home");
        input1.value = "";
        inputNumber.value=1
        createToast({ title: 'Success', description: 'Your request has been posted'}, {type: 'success', position: 'bottom-right', transition: 'slide', timeout: 3000})
      }
    }

    return {
      router,
      backIcon,
      inputNumber,
      addInput,
      addRequest, input1, input2, input3
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

.cp-search-wrapper {
  width: 90%;
  display: flex;
  align-items: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.8rem;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 10px 4px rgba(101, 85, 85, 0.1);
  background-color: white;
  margin-bottom: 0.75rem;
}

.cp-search-input {
  height: 2.5rem;
  width: 87%;
  font-size: medium;
  border: none;
  outline: transparent;
  padding-top: 0.2rem;
  background-color: white;
  color: black;
}

.cp-temp {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
