import Play from "./play-module.js";

document.addEventListener("DOMContentLoaded", function () {


   const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   var play;
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

   /**
    * Play list Event Listener
    */
   document.querySelector('#playList').addEventListener('change', async (e) => {

      const playList = document.querySelector('select option');
      playList.disabled = true;

      let playURL = url + "?name=" + e.target.value;

      play = new Play(await fetchPlay(playURL));

      play.displayPlayerSelection();
      play.displayActSelection();

      let currAct = getCurrAct();
      currAct.displaySceneSelection();

      createPlaySect();
   });

   /**
    * Act List Event Listener
    */
   document.querySelector('#actList').addEventListener('change', (e) => {
      let currAct = getCurrAct();

      currAct.displaySceneSelection();
      createActSect();
      createSceneSect();
   });

   /**
    * Scene List Event Listener
    */
   document.querySelector('#sceneList').addEventListener('change', (e) => {
      createSceneSect();
   });

   /**
    * Player and Text Filter Event Listener
    */
   document.querySelector('#btnHighlight').addEventListener('click', () => {
      const player = document.querySelector('#playerList').value;
      const txtHL = document.querySelector('#txtHighlight').value;

      createSceneSect(player, txtHL);
   });

   /**
    * Finds and return an Act object for the selected act
    * 
    * @returns {object} the current Act object
    */
   function getCurrAct() {
      const currActName = document.querySelector('#actList').value;

      return play.getAct(currActName);
   }

   /**
    * Finds and return a Scene object for the selected scene
    * 
    * @returns {object} the current Act object
    */
   function getCurrScene() {
      let currSceneName = document.querySelector('#sceneList').value;

      if (currSceneName !== "") {
         return getCurrAct().getScene(currSceneName);
      } else {
         return getCurrAct().getScene();
      }
   }

   /**
    * Creates the Play section container and relevant content
    */
   function createPlaySect() {
      const playHere = document.querySelector('#playHere');
      let actHere = document.createElement('article');

      playHere.replaceChildren();

      let h2 = document.createElement('h2');
      h2.textContent = play.title;

      actHere.setAttribute('id', 'actHere');

      playHere.appendChild(h2);
      playHere.appendChild(actHere);

      createActSect();
   }

   /**
    * Creates the Act section container and relevant content
    */
   function createActSect() {

      const actElem = document.querySelector('#actHere');
      const currentAct = getCurrAct();

      actElem.replaceChildren();

      let h3 = document.createElement('h3');
      h3.textContent = currentAct.name;

      let sceneHere = document.createElement('div');
      sceneHere.setAttribute('id', 'sceneHere');

      actElem.appendChild(h3);
      actElem.appendChild(sceneHere);

      createSceneSect();
   }

   /**
    * Creates the Act section container and relevant content 
    * @param {*} chosenPlayer A value to filter a specific Player. Default is a 0
    * @param {String} highlight The character(s) that needs to be filtered default is an empty strtng
    */
   function createSceneSect(chosenPlayer = 0, highlight) {
      const sceneHere = document.querySelector('#sceneHere');
      const currentScene = getCurrScene();

      sceneHere.replaceChildren();

      let h4 = document.createElement('h4');
      h4.textContent = currentScene.name;

      let scnTitle = document.createElement('p');
      scnTitle.setAttribute('class', 'title');
      scnTitle.textContent = currentScene.title;

      let stageDir = document.createElement('p');
      stageDir.setAttribute('class', 'direction');
      stageDir.textContent = currentScene.mainStageDirection;

      sceneHere.appendChild(h4);
      sceneHere.appendChild(scnTitle);
      sceneHere.appendChild(stageDir);

      currentScene.speeches.forEach(speech => {
         if (chosenPlayer == speech.speaker) {
            sceneHere.appendChild(createSpeech(speech, highlight));
         } else if (chosenPlayer == 0) {
            sceneHere.appendChild(createSpeech(speech, highlight));
         }
      });
   }

   /**
    * 
    * @param {Array} speech An array of lines from a speaker
    * @param {String} highlight The character(s) that needs to be filtered default is an empty strtng
    * @returns A div container with all relevant information for display
    */
   function createSpeech(speech, highlight = "") {
      let div = document.createElement('div');
      div.setAttribute('class', "speech");

      let span = document.createElement('span');

      span.textContent = speech.speaker;
      div.append(span);

      speech.lines.forEach(line => {

         if (highlight !== "") {
            let highlighted = highlightWord(line, highlight);
            div.appendChild(highlighted);

         } else {
            let p = document.createElement('p');
            p.textContent = line;
            div.appendChild(p);
         }
      });

      if (speech.stagedir != undefined) {
         let em = document.createElement('em');
         em.textContent = speech.stagedir;
         div.appendChild(em);
      }

      return div;
   }

   /**
    * 
    * @param {String} line A line from a speaker
    * @param {String} highlight The character(s) that needs to be filtered
    * @returns a p element
    */
   function highlightWord(line, highlight) {
      let p = document.createElement('p');
      p.textContent = "";

      let highlightedArr = [...line.toLowerCase().matchAll(highlight.toLowerCase())];
      let position = 0;

      highlightedArr.forEach(h => {
         let b = document.createElement('b');
         let l = document.createTextNode(line.substring(position, h.index));
         b.textContent = highlight;

         position = h.index + highlight.length;

         p.appendChild(l);
         p.appendChild(b);
      });

      let lastString = document.createTextNode(line.substring(position));
      p.appendChild(lastString);

      return p;
   }

   /**
    * Fetches the Play data from a URL
    * 
    * @param {String} url: The link of the play getting fetched 
    * @returns  {Object} the data from the fetch 
    */
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