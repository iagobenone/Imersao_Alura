let imagemCenario;
let imagemPersonagem;//pegar a imagem da bruxa
let imagemInimigo;
let imagemInimigoGrande;
let imagemInimigoVoador;
let somPulo;
let imagemGameOver;

let cenario;
let somDoJogo;
let personagem;
let inimigo;
let inimigoGrande;
let inimigoVoador;
let potuacao;

var alt = 135;// variavel da altura do eixo X
var larg = 110;// variavel da largura do eixo Y

const inimigos = [];

const matrizInimigo = [
  [0, 0],
  [104, 0],
  [208, 0],
  [312, 0],
  [0, 104],
  [104, 104],
  [208, 104],
  [312, 104],
  [0, 208],
  [104, 208],
  [208, 208],
  [312, 208],
  [0, 312],
  [104, 312],
  [208, 312],
  [312, 312],
  [0, 418],
  [104, 418],
  [208, 418],
  [312, 418],
  [0, 522],
  [104, 522],
  [208, 522],
  [312, 522],
  [0, 626],
  [104, 626],
  [208, 626],
  [312, 626],
]
const matrizPersonagem = [
      [0, 0],
      [220, 0],
      [440, 0],
      [660, 0],
      [0, 270],
      [220, 270],
      [440, 270],
      [660, 270],
      [0, 540],
      [220, 540],
      [440, 540],
      [660, 540],
      [0, 810],
      [220, 810],
      [440, 810],
      [660, 810],
];
const matrizInimigoGrande = [
  [0,0],
  [400,0],
  [800,0],
  [1200,0],
  [1600,0],
  [0,400],
  [400,400],
  [800,400],
  [1200, 400],
  [1600, 400],
  [0,800],
  [400, 800],
  [800, 800],
  [1200, 800],
  [1600, 800],
  [0, 1200],
  [400, 1200],
  [800, 1200],
  [1200, 1200],
  [1600, 1200], 
  [0, 1600],
  [400, 1600],
  [800, 1600],
  [1200, 1600],
  [1600, 1600],
  [0, 2000],
  [400, 2000],
  [800, 2000],
]
const matrizInimigoVoador = [
  [0,0],
  [200, 0],
  [400, 0],
  [0, 150],
  [200, 150],
  [400, 150],
  [0, 300],
  [200, 300],
  [400, 300],
  [0, 450],
  [200, 450],
  [400, 450],
  [0, 600],
  [200, 600],
  [400, 600],
  [0, 750],
]

function preload(){
  imagemCenario = loadImage('imagens/cenario/floresta.png');//carregar o jogo
  imagemPersonagem = loadImage('imagens/personagem/correndo.png');//carregar a personagem
  imagemInimigo = loadImage('imagens/inimigos/gotinha.png');// carregar inimigo
  imagemInimigoGrande = loadImage('imagens/inimigos/troll.png');//carregar o troll
  imagemInimigoVoador = loadImage('imagens/inimigos/gotinha-voadora.png'); //carregar inimigo voador
  imagemGameOver = loadImage('imagens/assets/game-over.png');//carregar imagem de game-over
  somDoJogo = loadSound('sons/trilha_jogo.mp3');
  somPulo = loadSound('sons/somPulo.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cenario = new Cenario(imagemCenario, 3);
  pontuacao = new Pontuacao()
  
  personagem = new Personagem(matrizPersonagem, imagemPersonagem, 0,30, 110, 135, 220, 270 );
  
  const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52 , 30, 52, 52, 104, 104, 10, 200);
  
  const inimigoGrande = new Inimigo (matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 10, 2500);
  
  const inimigoVoador = new Inimigo (matrizInimigoVoador, imagemInimigoVoador, width - 52, 200, 100, 75, 200, 150, 10, 2000);
  
  inimigos.push(inimigo);
  inimigos.push(inimigoGrande);
  inimigos.push(inimigoVoador);
  
  frameRate(40);
  
  somDoJogo.loop();
  
}

function keyPressed(){
  if(key === 'ArrowUp') {
    personagem.pula();
    somPulo.play()
  }
}

function draw() {
  cenario.exibe();
  cenario.move();
  
  pontuacao.exibe();
  pontuacao.adicionarPonto();
  
  personagem.exibe();
  personagem.aplicaGravidade();
  
  inimigos.forEach(inimigo => {
    inimigo.exibe();
    inimigo.move();
    
  if(personagem.estaColidindo(inimigo)){
     image(imagemGameOver, width/2 - 200, height/3);
    noLoop();
     } 
  })  
}
