/* In this module, create three classes: Play, Act, and Scene. */

class Play {
    constructor(fetchedPlay){
        this.acts = [];
        this.title = fetchedPlay.title;
        this.short = fetchedPlay.short;
        this.persona = fetchedPlay.persona;

        fetchedPlay.acts.forEach( act => {
            this.acts.push(new Act(act));
        })
    }

    displayFirstAct() {

    }
}

class Act {
    constructor(act){
        this.name = act.name;
        this.scenes = [];

        act.scenes.forEach( scn => {
            this.scenes.push(new Scene(scn));
        });
    }

    displayFirstScene() {
        const sceneDiv = document.querySelector('#sceneHere');
        const sceneName = document.querySelector('#sceneHere h4');
        const sceneTitle = document.querySelector("#sceneHere .title");
        const stageDir = document.querySelector('.direction');
        //const scene

        this.scenes.forEach( (scene) => {
            if(scene.name == "SCENE I") {
                sceneName.textContent = scene.name;
                sceneTitle.textContent = scene.title;
                stageDir.textContent = scene.stageDirection;

                scene.speeches.forEach( speech => {
                    sceneDiv.append(createSpeech(speech.speaker, speech.lines));
                });

            }
        });
    }
}

class Scene {
    constructor(scene){
        this.speeches = scene.speeches;
        this.stageDirection = scene.stageDirection;
        this.title = scene.title;
        this.name = scene.name;
    }

    createSpeech(speaker, lines) {
        const div = document.createElement('div');
        const span = document.createElement('span').textContent = speaker;
        
        div.setAttribute('class', "speech");
        div.append(span);

        lines.forEach(line => {
            const p = document.createElement('p').textContent = line;
            div.append(p);
        });




        return div;
    }

}

export {Play}