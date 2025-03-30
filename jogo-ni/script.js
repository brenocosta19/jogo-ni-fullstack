const storyText = document.getElementById("story-text");
const phaseTitle = document.getElementById("phase-title");
const choicesDiv = document.getElementById("choices");
const livesText = document.getElementById("lives-text");
const heartsContainer = document.getElementById("hearts-container");
const relicsText = document.getElementById("relics-text");
const restartBtn = document.getElementById("restart");

let lives = 5;
let relics = 0;
let currentPhase = 0;

const phases = [
    {
        id: 0,
        title: "O chamado de Ixchel",
        text: "O ar pesa como uma profecia antiga. À sua frente, o Templo de Ixchel ergue-se sob um céu cor de sangue. Três relíquias dormem em seu interior: a Chave que não é chave, o Prisma que tudo vê e o Crânio do Primeiro Guardião. O portal está aberto...",
        choices: [
            { text: "Avançar pelo portal principal", nextPhase: 1 },
            { text: "Leia os glifos na parede", nextPhase: 2 },
            { text: "Examine as redondezas do templo", nextPhase: 3 },
        ]
    },
    {
        id: 1,
        title: "O Altar dos 3 Sóis",
        text: "Três altares de pedra representam os sóis maias do passado, presente e futuro. Uma voz ecoa: 'Para provar seu valor, decifre o enigma da deusa...'",
        choices: [
            { text: "Resolver o Enigma do Altar", nextPhase: 4 },
            { text: "Ignorar os altares e achar uma saída", nextPhase: 5 },
        ]
    },
    {
        id: 2,
        title: "Sabedoria para a Jornada",
        text: "1. Jamais roube as vestes de mortos, 2. Se não sabe para onde ir, vá pelo meio, 3. Armadilhas não atacam animais.",
        choices: [
            { text: "Voltar à entrada principal", nextPhase: 0 }
        ]
    },
    {
        id: 3,
        title: "Armadilhas Acionadas !!",
        text: "Flechas são lançadas, você perde uma vida",
        choices: [
            { text: "Volte a entrada principal e busque por sabedoria nas escrituras", nextPhase: 0, loseLife: true }
        ]
    },
    {
        id: 4,
        title: "O Enigma dos 3 Sóis",
        text: "Cada altar tem um símbolo: 1. Sol Jaguar (Passado) 2. Sol de Sangue (Presente) 3. Sol Serpente (Futuro). Inscrição: 'O que ontem caçava, hoje governa e amanhã voará?'",
        choices: [
            { text: "Tocar no Sol Jaguar → Sol de Sangue → Sol Serpente", nextPhase: 6 },
            { text: "Tocar apenas no Sol Serpente", nextPhase: 7 },
            { text: "Tocar nos três ao mesmo tempo", nextPhase: 8 }
        ]
    },
    {
        id: 5,
        title: "Maldição",
        text: "Não tente ser esperto. A deusa lança uma maldição e você perde uma vida",
        choices: [
            { text: "Voltar e resolver o enigma", nextPhase: 1, loseLife: true }
        ]
    },
    {
        id: 6,
        title: "O Prisma que tudo Vê",
        text: "Uma porta se abre e você vê um prisma na sua frente. Parabéns! A sua primeira conquista.",
        choices: [
            { text: "Seguir adiante", nextPhase: 9 }
        ]
    },
    {
        id: 7,
        title: "Maldição",
        text: "A Deusa suspeita que você não é tão sábio assim. Perdeu uma vida",
        choices: [
            { text: "Voltar e resolver o enigma", nextPhase: 4, loseLife: true }
        ]
    },
    {
        id: 8,
        title: "Maldição",
        text: "A Deusa suspeita que você não é tão sábio assim. Perdeu uma vida.",
        choices: [
            { text: "Voltar e resolver o enigma", nextPhase: 4, loseLife: true }
        ]
    },
    {
        id: 9,
        title: "O Salão Hexagonal",
        text: "Você entra em um salão com diversas esqueletos de guerreiros com pele de onça em suas costas. Ao analisar a porta à sua frente, se depara com uma escrita Maia, mas devido ao prisma que você possuí, é fácil entender aquele idioma.",
        choices: [
            { text: "Usar o prismar para ler", nextPhase: 10 },
            { text: "Antes de ler, se equipe com o arsenal dos esqueletos", nextPhase: 11 }
        ]
    },
    {
        id: 10,
        title: "O Salão Hexagonal",
        text: "Entalhado na parede está escrito : 'De dia, eu sou um guia; de noite, eu sou um enigma. Minha casa é um ponto fixo, mas me movo a cada instante. O que sou?",
        choices: [
            { text: "Estrela", nextPhase: 12 },
            { text: "O Sol", nextPhase: 13 },
            { text: "A lua", nextPhase: 14 }
        ]
    },
    {
        id: 11,
        title: "Horda Demoníaca",
        text: "Você irritou o guerreiro e ele te atinge com a lança. Menos uma vida",
        choices: [
            { text: "Voltar", nextPhase: 9, loseLife: true }
        ]
    },
    {
        id: 12,
        title: "A Chave-Lua",
        text: "Parabéns! Você acertou o enigma. Conquistou a Chave-Lua.",
        choices: [
            { text: "Avançar", nextPhase: 15 }
        ]
    },
    {
        id: 13,
        title: "Maldição",
        text: "Resposta incorreta! A Deusa fica desapontada. Perde uma vida.",
        choices: [
            { text: "Voltar e tentar novamente", nextPhase: 10, loseLife: true }
        ]
    },
    {
        id: 14,
        title: "Maldição",
        text: "Resposta incorreta! A Deusa fica desapontada. Perde uma vida.",
        choices: [
            { text: "Voltar e tentar novamente", nextPhase: 10, loseLife: true }
        ]
    },
    {
        id: 15,
        title: "O Último Desafio",
        text: "Após pegar a chave, encontra 3 portas. Percebe que a fechadura é a mesma. O que você faz?",
        choices: [
            { text: "Abrir a porta da esquerda", nextPhase: 16, loseLife: true },
            { text: "Abrir a porta do meio", nextPhase: 17 },
            { text: "Abrir a porta da direita", nextPhase: 18, loseLife: true }
        ]
    },
    {
        id: 17,
        title: "Ó Último Guardião",
        text: "A sua frente você percebe um esqueleto de um caçador com a cabeça de uma onça aos seus pés, e logo percebe que aquele foi o primeiro guardião.Você sabe que precisa de seu crânio",
        choices: [
            { text: "Sobe no trono e tenta arrancar o seu crânio", nextPhase: 19 },
            { text: "Veste a cabeça de onça e caminha até o crânio", nextPhase: 20 },
        ]
    },
    {
        id: 20,
        title: "Finalmente!",
        text: "As armadilhas não reagiram à cabeça do animal. Que sorte. O crânio é seu, assim como toda a glória de Ixchel ! Uma porta se abre",
        choices: [
            { text: "Adentre ela", nextPhase: 21 }
        ]
    },
    {
        id: 21,
        title: "A Sabedoria e os Mistérios Mundanos",
        text: "Ixchel aparece na sua frente, em um grande esplendor. Ela te pergunta: 'Apenas o mais sábio de todos conseguiria chegar aqui. Quer saber qual é a verdade deste mundo?'",
        choices: [
            { text: "Sim", nextPhase: 22 },
        ]
    },
    {
        id: 22,
        title: "A Verdade!",
        text: "O PALMEIRAS É O MAIOR DO MUNDO",
        choices: [
            { text: "Concordar", nextPhase: 23 },
            { text: "Discordar", nextPhase: 24 }
        ]
    },
    {
        id: 23,
        title: "VITÓRIA",
        text: "Você agora é o mais sábio entre todos! Parabéns.",
        choices: []
    },
    {
        id: 24,
        title: "Game Over",
        text: "Jamais discorde de um Deus. Você perdeu todas as vidas! Fim de jogo.",
        choices: []
    }
];

function updateGame() {
    const phase = phases.find(p => p.id === currentPhase);
    phaseTitle.textContent = phase.title;
    storyText.textContent = phase.text;
    choicesDiv.innerHTML = "";

    phase.choices.forEach(choice => {
        const button = document.createElement("button");
        button.className = "action-button";
        button.textContent = choice.text;
        button.onclick = () => {
            if (choice.loseLife) {
                lives--;
                updateLives();
                if (lives <= 0) {
                    gameOver();
                    return;
                }
            }
            currentPhase = choice.nextPhase;
            updateGame();
        };
        choicesDiv.appendChild(button);
    });

    // Atualiza contador de relíquias quando obtidas
    if (currentPhase === 6) relics = 1; // Prisma
    if (currentPhase === 12) relics = 2; // Chave-Lua
    if (currentPhase === 20) relics = 3; // Crânio
    relicsText.textContent = `Relíquias: ${relics}/3`;
}

function updateLives() {
    livesText.textContent = `Vidas: ${lives}`;
    heartsContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement("span");
        heart.className = "heart";
        heartsContainer.appendChild(heart);
    }
}

function gameOver() {
    phaseTitle.textContent = phases[currentPhase].title;
    storyText.textContent = phases[currentPhase].text;
    choicesDiv.innerHTML = "";
    restartBtn.style.display = "block";
}

restartBtn.onclick = () => {
    lives = 5;
    relics = 0;
    updateLives();
    currentPhase = 0;
    restartBtn.style.display = "none";
    updateGame();
};

// Inicia o jogo
updateGame();