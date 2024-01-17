import {Play} from "./play-module.js";

document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   let play;
   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */

   //Play Selector
   document.querySelector('#playList').addEventListener('change', (e) => {
      console.log(e.target.value);

      let playURL = url + "?name=" + e.target.value;
      
      play = new Play (fetchPlay(playURL));

      //display Play Content
   });

   //Act Selector
   document.querySelector('#actList').addEventListener('change', (e) => {

   });
   
   //Scene Selector
   this.documentElement.querySelector('#sceneList').addEventListener('change', (e) => {

   });


   // fetch play info
   async function fetchPlay(url) {

      try {
         const response = await fetch(url);
         const data = await response.json();
         return data;
      } catch (err) {
         console.log(err);
      }
   }
});