/* In this module, create three classes: Play, Act, and Scene. */

class Play {
    constructor(fetchedPlay) {
        this.acts = [];
        this.title = fetchedPlay.title;
        this.short = fetchedPlay.short;
        this.persona = fetchedPlay.persona.sort((p1, p2) => p1.player.localeCompare(p2.player), { case: false });

        fetchedPlay.acts.forEach(act => {
            this.acts.push(new Act(act));
        });
    }

    /**
     * Finds and returns the Act object based on the parameter
     * 
     * @param {string} currAct the current act being searched, default string is 'ACT I'
     * @returns {object} the searched Act object
     */
    getAct(currAct = "ACT I") {
        return this.acts.find(act => currAct == act.name);
    }

    /**
     * Populates all the play Actors options into a Select element
     */
    displayPlayerSelection() {
        const playerList = document.querySelector('#playerList');
        const placeholder = playerList.firstElementChild;

        playerList.replaceChildren();
        playerList.appendChild(placeholder);

        this.persona.forEach(p => {
            let opt = document.createElement('option');
            opt.textContent = p.player;
            opt.setAttribute('value', p.player);
            playerList.appendChild(opt);
        });


    }

    /**
     * Populates all Act options into a Select element
     */
    displayActSelection() {
        const actList = document.querySelector('#actList');
        const actArr = this.acts;
        actList.replaceChildren();

        actArr.forEach(act => {
            let opt = document.createElement('option');
            opt.textContent = act.name;
            opt.setAttribute('value', act.name);
            actList.appendChild(opt);
        })
    }
}

class Act {
    constructor(act) {
        this.name = act.name;
        this.scenes = [];

        act.scenes.forEach(scn => {
            this.scenes.push(new Scene(scn));
        });
    }

    /**
     * Finds and returns the Scene object based on the parameter
     * 
     * @param {string} currScn the current scene being searched, default string is 'SCENE I'
     * @returns the searched Scene object
     */
    getScene(currScn = "SCENE I") {
        return this.scenes.find(scn => currScn == scn.name);
    }

    /**
     * Populates all the Scenes into a Select element
     */
    displaySceneSelection() {
        const sceneList = document.querySelector('#sceneList');
        sceneList.replaceChildren();

        this.scenes.forEach(scn => {
            let opt = document.createElement('option');
            opt.textContent = scn.name;
            opt.value = scn.name;
            sceneList.appendChild(opt);
        });
    }
}

class Scene {
    constructor(scene) {
        this.speeches = scene.speeches;
        this.mainStageDirection = scene.stageDirection;
        this.title = scene.title;
        this.name = scene.name;
    }
}

export default Play;