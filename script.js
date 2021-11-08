const goodVoices = [0, 7, 10, 17, 20, 26, 28, 32, 36, 37, 40, 49, 50, 51]
const initialPanelists = 3;
let globalPatience = 7;
let topicsJSON;
let topics;
let addPanelistBtn;
let removePanelistBtn;
let panel; 
let panelistButton;
let voiceBox; 

function preload() {
  topicsJSON = loadJSON('topics.json');
  voiceBox = new p5.Speech();
}


function setup() {
  noCanvas();
  voiceBox.interrupt = true;
  topics = Object.values(topicsJSON);
  panel = new Panel();
  panelistButton = createButton('add panelist');
  panelistButton.position(10,10);
  panelistButton.mousePressed(() => {
    panel.addPanelist();
  });
  removePanelistBtn = createButton('remove panelist');
  removePanelistBtn.position(100,10);
  removePanelistBtn.mousePressed(() => {
    panel.removePanelist();
  });
  for (let i = 0; i < initialPanelists; i++) {
    panel.addPanelist();
  }
}

class Panel {
  constructor(topics) {
    this.panelists = [];
    this.div = createDiv();
    this.stage = createDiv();
    this.console = createDiv();
    this.stage.class('stage');
    this.console.class('console');
    this.div.class('panel');
    this.div.child(this.stage);
    this.div.child(this.console);
    this.speaker = null;
    this.currentText = ''
  }
  addPanelist() {
    const panelist = new Panelist(this, this.panelists.length);
    this.panelists.push(panelist);
    this.stage.child(panelist.div);
    if (!this.speaker) {
      this.speaker = panelist;
      this.speaker.img.addClass('speaking')
      this.update()
    }
  }
  removePanelist() {
    if (this.speaker === this.panelists[this.panelists.length-1]) {
      voiceBox.stop();
    }
    this.panelists[this.panelists.length-1].div.remove();
    this.panelists.pop();
    this.update();
  }
  update() {
    if (!this.speaker) {
      this.speaker = random(this.speakers)
    }
    this.panelists.forEach(p => {
      if (p !== this.speaker) {
          p.impatience++;
      }
      const interrupt = random(globalPatience)
      if (interrupt < p.impatience) {
        this.speaker.impatience = 0;
        this.speaker.img.removeClass('speaking')
        this.speaker = p;
        p.img.addClass('speaking')
      }
    })
    this.speaker.updateText();
    this.console.elt.innerText = `${this.speaker.name}: ${this.currentText}`;
    this.speaker.speakText();
    
  }
}

class Panelist {
  constructor(panel, index) {
    this.panel = panel;
    this.index = index;
    this.name = `Panelist ${this.index + 1}`
    const imageIndex = int(random(255));
    const imageString = `images/${imageIndex.toString().padStart(3, '0')}.jpg`;
    this.voice = random(goodVoices)
    this.topic = topics[int(random(topics.length))];
    this.div = createDiv();
    this.div.class('panelist');
    this.img = createImg(imageString, 'GAN generated surreal panelist photo');
    this.div.child(this.img)
    this.nameBadge = createDiv();
    this.nameBadge.class('nameBadge');
    this.div.child(this.nameBadge);
    this.nameBadge.elt.innerText = this.name;
    this.impatience = 0;
    this.graf = random(this.topic.grafs);
    this.line = 0;
  }
  updateText() {
   this.panel.currentText = this.graf[this.line];
   this.line++;
   if (this.line > this.graf.length - 1) {
    const oldGraf = this.graf;
    while (this.graf === oldGraf) {
      this.graf = random(this.topic.grafs);
    }
    this.line = 0;
   }
  }
  speakText() {
    voiceBox.onEnd = endFragment;
    voiceBox.setVoice(this.voice);
    voiceBox.speak(this.panel.currentText);
  }
}

function endFragment() {
  panel.update();
}