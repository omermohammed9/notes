import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// log("Before Execute")

//console.log("After Execute");


// myPromise.then(response =>{
//     console.log(response);
// }).catch(error=>{
//     console.log(error);
// })

// function sendPromise() {
//     return new Promise((resolve, reject) => {
//         let condition = true;
//         if (condition) {
//             setTimeout(() => {
//                 resolve("ok, I resolved and delivered by promise")
//             }, 2000);
//         } else {
//             reject("Sorry I couldn't");
//         }
//     })
// }
// async function main() {
//     // sendPromise().then(response => {
//     //     console.log(response);
//     // }).catch(error => {
//     //     console.log(error);
//     // })

//     try {

//         let response = await sendPromise();
//         console.log(response);
//     } catch (error) {
//         console.log(`This is the error ${error}`);
//     }

//     function successHandler(response)
// }

// main()