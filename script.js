function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

import { perguntas } from 'perguntas.js';

// Variáveis Globais
let indicesUsados = new Set();
let perguntasRespondidas = 0,
    acertos = 0,
    companyState = 50,
    TOTAL_PERGUNTAS = 10,
    perguntaAtual,
    personagemSelecionado = null,
    nomeJogador = "";

// Função para Embaralhar um Array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Atualiza a Barra de Progresso da Empresa
function updateCompanyBar() {
  document.getElementById("company-bar").style.width = companyState + "%";
}

// Seleciona uma Pergunta com Base no companyState
function selecionarPergunta() {
  let filtradas;
  if (Math.round(companyState) === 50) filtradas = perguntas;
  else if (companyState >= 70) filtradas = perguntas.filter(p => p.dificuldade === "dificil");
  else if (companyState >= 30) filtradas = perguntas.filter(p => p.dificuldade === "medio");
  else filtradas = perguntas.filter(p => p.dificuldade === "facil");

  let disponiveis = filtradas.filter(p => !indicesUsados.has(perguntas.indexOf(p)));
  if (disponiveis.length === 0) { indicesUsados.clear(); disponiveis = filtradas; }
  const escolha = disponiveis[Math.floor(Math.random() * disponiveis.length)];
  indicesUsados.add(perguntas.indexOf(escolha));
  return escolha;
}

// Inicia o Jogo (Mostra a Tela de Seleção de Personagem)
function iniciarJogo() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("personagem").classList.remove("hidden");
  document.getElementById("company-bar-container").classList.add("hidden");
}

// Atualiza o Progresso do Jogo
function updateProgress() {
  document.getElementById("progresso").textContent =
    "Pergunta " + (perguntasRespondidas + 1) + " de " + TOTAL_PERGUNTAS;
}

// Carrega a Próxima Pergunta
function carregarPergunta() {
  if (perguntasRespondidas >= TOTAL_PERGUNTAS) { exibirResultado(); return; }
  perguntaAtual = selecionarPergunta();
  let alternativas = perguntaAtual.opcoes.map((texto, i) => ({
    texto,
    explicacao: perguntaAtual.explicacoes ? perguntaAtual.explicacoes[i] : null,
    correta: i === perguntaAtual.correta
  }));
  shuffleArray(alternativas);
  perguntaAtual.opcoes = alternativas.map(a => a.texto);
  if (perguntaAtual.explicacoes) { 
    perguntaAtual.explicacoes = alternativas.map(a => a.explicacao); 
  }
  perguntaAtual.correta = alternativas.findIndex(a => a.correta);
  document.getElementById("cenario").textContent = perguntaAtual.cenario;
  document.getElementById("pergunta").textContent = perguntaAtual.pergunta;
  updateProgress();
  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";
  perguntaAtual.opcoes.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => verificarResposta(i, btn);
    opcoesDiv.appendChild(btn);
  });
}

// Verifica a Resposta do Jogador
function verificarResposta(i, btn) {
  Array.from(document.querySelectorAll("#opcoes button")).forEach(b => b.disabled = true);
  const correta = i === perguntaAtual.correta;
  if (correta) {
    acertos++;
    btn.classList.add("correct");
    let base = (perguntaAtual.dificuldade === "dificil") ? 15 :
               (perguntaAtual.dificuldade === "medio") ? 10 : 5;
    let fator = ((100 - companyState) / 100) * 0.5 + 0.5;
    companyState += base * fator;
  } else {
    btn.classList.add("incorrect");
    let base = (perguntaAtual.dificuldade === "facil") ? 10 :
               (perguntaAtual.dificuldade === "medio") ? 5 : 2;
    let fator = (companyState / 100) * 0.5 + 0.5;
    companyState -= base * fator;
  }
  companyState = Math.min(Math.max(companyState, 0), 100);
  updateCompanyBar();
  perguntasRespondidas++;
  setTimeout(() => {
    let textoExp = perguntaAtual.explicacoes ?
                   perguntaAtual.explicacoes[i] :
                   (correta ? perguntaAtual.detalhesCorreto : perguntaAtual.detalhesIncorreto);
    mostrarExplicacao(textoExp);
  }, 1000);
}

// Mostra a Explicação da Resposta
function mostrarExplicacao(texto) {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("explicacao").classList.remove("hidden");
  document.getElementById("explicacaoTexto").textContent = texto;
  document.getElementById("btnContinuar").textContent = (perguntasRespondidas >= TOTAL_PERGUNTAS)
    ? "Resultado" : "Próxima Pergunta";
}

// Avança para a Próxima Pergunta ou Resultado
function proximaPergunta() {
  document.getElementById("explicacao").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  carregarPergunta();
}

// Exibe o Resultado Final
function exibirResultado() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("resultado").classList.remove("hidden");
  document.getElementById("mensagem").innerHTML = `
    ${nomeJogador}, ${acertos >= 7 ?
    "Parabéns! Sua gestão melhorou a empresa!" :
    "Sua empresa enfrentou dificuldades. Tente novamente!"}
  `;
  document.getElementById("pontuacao").textContent =
    "Você acertou " + acertos + " de " + TOTAL_PERGUNTAS + " perguntas.";

  // Remove ranking antigo, se existir, para evitar duplicação
  const rankingAntigo = document.getElementById("ranking");
  if (rankingAntigo) rankingAntigo.remove();

  // Envia o score para o servidor e busca o ranking
  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: acertos })
  })
  .then(res => res.json())
  .then(() => fetch('http://localhost:3000/ranking?score=' + acertos))
  .then(res => res.json())
  .then(data => mostrarRanking(data.percentile))
  .catch(err => console.error(err));
}

// Mostra o Ranking do Jogador
function mostrarRanking(percentile) {
  const rankingDiv = document.createElement("div");
  rankingDiv.id = "ranking";
  rankingDiv.innerHTML = `
    <svg width="120" height="120">
      <circle cx="60" cy="60" r="50" stroke="#ddd" stroke-width="10" fill="none" />
      <circle cx="60" cy="60" r="50" stroke="#27AE60" stroke-width="10" fill="none"
         stroke-dasharray="314" stroke-dashoffset="${314 - (percentile / 100) * 314}"
         transform="rotate(-90 60 60)" />
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="24" fill="#2C3E50">${percentile}%</text>
    </svg>
    <p>Você superou ${percentile}% dos jogadores.</p>
  `;
  document.getElementById("resultado").appendChild(rankingDiv);
}

// Reinicia o Jogo
function reiniciarJogo() {
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("intro").classList.remove("hidden");
}

// Event Listeners para Novas Telas (Personagem e Nome)
document.querySelectorAll('.personagem-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.personagem-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    personagemSelecionado = card.querySelector('p').textContent;
  });
});

document.getElementById('btnConfirmarPersonagem').addEventListener('click', () => {
  if (personagemSelecionado) {
    document.getElementById("personagem").classList.add("hidden");
    document.getElementById("nome").classList.remove("hidden");
  } else {
    alert("Selecione um personagem!");
  }
});

document.getElementById('btnConfirmarNome').addEventListener('click', () => {
  nomeJogador = document.getElementById('inputNome').value.trim();
  if (nomeJogador) {
    document.getElementById("nome").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("company-bar-container").classList.remove("hidden");
    perguntasRespondidas = 0;
    acertos = 0;
    companyState = 50;
    indicesUsados.clear();
    updateCompanyBar();
    carregarPergunta();
  } else {
    alert("Digite seu nome!");
  }
});

// Event Listeners Originais
document.getElementById("btnIniciar").addEventListener("click", iniciarJogo);
document.getElementById("btnReiniciar").addEventListener("click", reiniciarJogo);
document.getElementById("btnContinuar").addEventListener("click", proximaPergunta);
