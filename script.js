// Variáveis Globais
let indicesUsados = new Set();
let perguntasRespondidas = 0,
    acertos = 0,
    companyState = 50,
    TOTAL_PERGUNTAS = 10,
    perguntaAtual,
    personagemSelecionado = null,
    nomeJogador = "";

const perguntas = [
  // QUESTÕES FÁCEIS (14 questões)
  {
    pergunta: "Qual o principal objetivo da gestão de estoque em uma empresa?",
    cenario: "Equilibrar o capital investido e a continuidade da produção.",
    opcoes: [
      "Minimizar o capital empatado, garantindo a continuidade da produção.",
      "Manter altos níveis para evitar faltas.",
      "Eliminar completamente os estoques."
    ],
    correta: 0,
    detalhesCorreto: "Reflete o equilíbrio essencial na gestão de estoque.",
    detalhesIncorreto: "Manter estoques altos gera custos desnecessários.",
    dificuldade: "facil"
  },
  {
    pergunta: "Qual é o foco principal da filosofia Lean Manufacturing?",
    cenario: "O objetivo é otimizar processos e eliminar desperdícios.",
    opcoes: [
      "Redução de desperdícios e otimização de processos.",
      "Aumento da produção sem considerar a qualidade.",
      "Centralização das decisões na alta administração."
    ],
    correta: 0,
    detalhesCorreto: "O Lean busca eliminar desperdícios e melhorar continuamente.",
    detalhesIncorreto: "As outras alternativas não correspondem aos princípios do Lean.",
    dificuldade: "facil"
  },
  {
    pergunta: "No método 5S, o que significa o 'Seiri'?",
    cenario: "Organizar o ambiente de trabalho.",
    opcoes: [
      "Eliminar itens desnecessários e manter o essencial.",
      "Organizar os itens necessários de forma lógica.",
      "Manter o ambiente limpo."
    ],
    correta: 0,
    detalhesCorreto: "'Seiri' significa separar o necessário do supérfluo.",
    detalhesIncorreto: "As outras alternativas referem-se a outros S.",
    dificuldade: "facil"
  },
  {
    pergunta: "O que é o Kaizen?",
    cenario: "Busca por melhorias contínuas na empresa.",
    opcoes: [
      "Melhoria contínua por pequenas mudanças.",
      "Corte de custos com demissões.",
      "Mudanças radicais imediatas."
    ],
    correta: 0,
    detalhesCorreto: "Kaizen enfatiza melhorias incrementais constantes.",
    detalhesIncorreto: "As demais alternativas não correspondem ao conceito.",
    dificuldade: "facil"
  },
  {
    pergunta: "Em Lean Manufacturing, qual termo designa atividades sem valor agregado?",
    cenario: "Identifique desperdícios.",
    opcoes: [
      "Muda",
      "Kanban",
      "Poka-yoke"
    ],
    correta: 0,
    explicacoes: [
      "Correta. 'Muda' designa desperdício.",
      "Incorreta. Kanban é uma ferramenta de controle visual.",
      "Incorreta. Poka-yoke previne erros."
    ],
    dificuldade: "facil"
  },
  {
    pergunta: "Qual dos seguintes itens NÃO faz parte dos 5S?",
    cenario: "Identifique o item que não pertence ao método 5S.",
    opcoes: [
      "Seiri (Senso de Utilização)",
      "Seiketsu (Padronização)",
      "Seiritsu (Organização Física)"
    ],
    correta: 2,
    explicacoes: [
      "Incorreta. Seiri é o primeiro S.",
      "Incorreta. Seiketsu é o quarto S.",
      "Correta. 'Seiritsu' não faz parte dos 5S."
    ],
    dificuldade: "facil"
  },
  {
    pergunta: "Qual é o principal objetivo do método 5S?",
    cenario: "Melhorar a organização e a limpeza do ambiente.",
    opcoes: [
      "Melhorar organização e limpeza.",
      "Aumentar a produção sem preocupação com qualidade.",
      "Incentivar o trabalho individual."
    ],
    correta: 0,
    detalhesCorreto: "Cria um ambiente mais organizado e seguro.",
    detalhesIncorreto: "Não foca em produção à custa da qualidade.",
    dificuldade: "facil"
  },
  {
    pergunta: "Por que é essencial a participação de todos na filosofia Kaizen?",
    cenario: "O sucesso do Kaizen depende da colaboração de todos os colaboradores.",
    opcoes: [
      "Porque a melhoria contínua depende do envolvimento de todos.",
      "Porque apenas os gerentes devem propor melhorias.",
      "Porque a mudança vem somente de consultores externos."
    ],
    correta: 0,
    detalhesCorreto: "A participação de todos é crucial.",
    detalhesIncorreto: "Restringir a participação prejudica o processo.",
    dificuldade: "facil"
  },
  {
    pergunta: "O que é o estoque de segurança?",
    cenario: "Protege a empresa contra imprevistos na demanda.",
    opcoes: [
      "Um estoque adicional para prevenir faltas.",
      "Um estoque extra para promoções.",
      "Um estoque que nunca é utilizado."
    ],
    correta: 0,
    detalhesCorreto: "Funciona como um colchão contra imprevistos.",
    detalhesIncorreto: "Não tem finalidade promocional.",
    dificuldade: "facil"
  },
  {
    pergunta: "O conceito 'Just in Time' é aplicado para:",
    cenario: "Reduzir desperdícios e sincronizar a produção com a demanda.",
    opcoes: [
      "Reduzir os níveis de estoque e aumentar a eficiência.",
      "Aumentar os estoques para evitar faltas.",
      "Produzir sem considerar a demanda real."
    ],
    correta: 0,
    detalhesCorreto: "O JIT sincroniza a produção com a demanda.",
    detalhesIncorreto: "As outras alternativas não se aplicam.",
    dificuldade: "facil"
  },
  {
    pergunta: "O que é o sistema Kanban no contexto do Lean Manufacturing?",
    cenario: "Gerenciar o fluxo de produção de forma visual.",
    opcoes: [
      "Uma ferramenta de controle visual para a produção.",
      "Um sistema de contabilidade de custos.",
      "Uma técnica de limpeza industrial."
    ],
    correta: 0,
    explicacoes: [
      "Correta. Utiliza sinais visuais para controlar o fluxo.",
      "Incorreta. Não está relacionado à contabilidade.",
      "Incorreta. Não é uma técnica de limpeza."
    ],
    dificuldade: "facil"
  },
  {
    pergunta: "No método 5S, qual S corresponde à padronização?",
    cenario: "Identifique o S responsável pela padronização.",
    opcoes: [
      "Seiketsu",
      "Seiri",
      "Seiton"
    ],
    correta: 0,
    explicacoes: [
      "Correta. Seiketsu significa padronização.",
      "Incorreta. Seiri é sobre separar o necessário.",
      "Incorreta. Seiton se refere à organização física."
    ],
    dificuldade: "facil"
  },
  {
    pergunta: "Como o 5S contribui para a segurança no ambiente de trabalho?",
    cenario: "A organização pode reduzir riscos e acidentes.",
    opcoes: [
      "Ao organizar e manter o ambiente limpo.",
      "Ao incentivar a sobrecarga de trabalho.",
      "Ao priorizar apenas a estética."
    ],
    correta: 0,
    explicacoes: [
      "Correta. Um ambiente organizado facilita a identificação de riscos.",
      "Incorreta. Não aumenta a sobrecarga.",
      "Incorreta. Estética sem organização não garante segurança."
    ],
    dificuldade: "facil"
  },
  {
    pergunta: "Qual é o impacto do 5S na produtividade de uma empresa?",
    cenario: "O 5S pode aumentar a eficiência e reduzir desperdícios.",
    opcoes: [
      "Melhora a eficiência ao reduzir o tempo de busca por ferramentas.",
      "Diminui a produtividade ao impor regras rígidas.",
      "Não tem impacto na produtividade."
    ],
    correta: 0,
    explicacoes: [
      "Correta. A organização aumenta a eficiência.",
      "Incorreta. A aplicação correta do 5S não prejudica a produtividade.",
      "Incorreta. A prática dos 5S aumenta a eficiência operacional."
    ],
    dificuldade: "facil"
  },

  // QUESTÕES MÉDIAS (10 questões)
  {
    pergunta: "Qual técnica é utilizada para reduzir os custos associados à manutenção de estoques?",
    cenario: "Sua empresa busca métodos para reduzir custos e equilibrar a produção.",
    opcoes: [
      "Just in Time (JIT).",
      "Sistema push.",
      "Aumento dos lotes de produção."
    ],
    correta: 0,
    detalhesCorreto: "O JIT ajusta a produção com a demanda.",
    detalhesIncorreto: "Outros métodos podem levar a excesso de estoque.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual dos seguintes princípios não é um dos fundamentos do Lean Manufacturing?",
    cenario: "Evite práticas ineficientes conhecendo os fundamentos do Lean.",
    opcoes: [
      "Fluxo contínuo.",
      "Produção em massa sem padronização.",
      "Melhoria contínua."
    ],
    correta: 1,
    detalhesCorreto: "Produção sem padronização vai contra o Lean.",
    detalhesIncorreto: "Os outros são pilares do Lean.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual é a sequência correta dos 5S?",
    cenario: "Defina a ordem correta para implementar os 5S.",
    opcoes: [
      "Seiri, Seiton, Seiso, Seiketsu, Shitsuke.",
      "Seiso, Seiketsu, Shitsuke, Seiri, Seiton.",
      "Shitsuke, Seiri, Seiso, Seiketsu, Seiton."
    ],
    correta: 0,
    detalhesCorreto: "A sequência correta é: Seiri, Seiton, Seiso, Seiketsu, Shitsuke.",
    detalhesIncorreto: "As outras sequências não seguem o método 5S.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual alternativa representa melhor a aplicação prática do Kaizen?",
    cenario: "A participação de todos é essencial para o Kaizen.",
    opcoes: [
      "Envolvimento de todos para implementar melhorias.",
      "Mudanças apenas pela alta administração.",
      "Medidas de curto prazo focadas em resultados financeiros."
    ],
    correta: 0,
    detalhesCorreto: "O Kaizen envolve todos os níveis na melhoria contínua.",
    detalhesIncorreto: "As outras opções restringem a participação.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual método de controle de estoque busca operar com níveis mínimos?",
    cenario: "Avalie a alternativa que permite operar com estoques reduzidos.",
    opcoes: [
      "Just in Time (JIT)",
      "Estoque de Segurança",
      "Lote Econômico de Compra"
    ],
    correta: 0,
    explicacoes: [
      "Correta. O JIT sincroniza a produção com a demanda.",
      "Incorreta. O estoque de segurança atua como buffer.",
      "Incorreta. O lote econômico não visa níveis mínimos."
    ],
    dificuldade: "medio"
  },
  {
    pergunta: "Qual é o objetivo principal da implementação do Lean Manufacturing?",
    cenario: "Reflita sobre como o Lean impacta os processos produtivos.",
    opcoes: [
      "Eliminar desperdícios e aumentar a eficiência.",
      "Aumentar a burocracia e o controle interno.",
      "Expandir a produção sem análise dos processos."
    ],
    correta: 0,
    detalhesCorreto: "O Lean foca na eliminação de desperdícios e na melhoria contínua.",
    detalhesIncorreto: "As outras alternativas não se aplicam.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual é a vantagem de um controle de estoque bem gerenciado?",
    cenario: "Avalie os benefícios de um controle eficiente.",
    opcoes: [
      "Redução de custos operacionais e de armazenagem.",
      "Aumento dos custos com grandes quantidades de estoque.",
      "Redução na disponibilidade de produtos."
    ],
    correta: 0,
    detalhesCorreto: "Um bom controle reduz custos e desperdícios.",
    detalhesIncorreto: "As outras opções indicam má gestão.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual é a relação entre Lean Manufacturing e a melhoria de processos?",
    cenario: "Como o Lean contribui para a evolução dos processos produtivos?",
    opcoes: [
      "Lean busca constantemente aprimorar os processos, eliminando desperdícios.",
      "Lean foca apenas na mecanização.",
      "Lean é incompatível com a melhoria contínua."
    ],
    correta: 0,
    detalhesCorreto: "O Lean enfatiza a melhoria contínua e a eliminação de desperdícios.",
    detalhesIncorreto: "As outras opções não se aplicam.",
    dificuldade: "medio"
  },
  {
    pergunta: "Qual é a abordagem do Kaizen em relação aos erros nos processos?",
    cenario: "Como o Kaizen utiliza os erros?",
    opcoes: [
      "Encarar os erros como oportunidades de aprendizado.",
      "Punir os responsáveis sem buscar soluções.",
      "Ignorar os erros para manter a rotina."
    ],
    correta: 0,
    detalhesCorreto: "O Kaizen vê os erros como oportunidades para melhorar.",
    detalhesIncorreto: "As outras alternativas não promovem melhoria.",
    dificuldade: "medio"
  },
  {
    pergunta: "Como a integração entre gestão de estoque e Lean Manufacturing beneficia a produção?",
    cenario: "Considere os ganhos da sinergia entre essas abordagens.",
    opcoes: [
      "Reduzindo desperdícios e otimizando o fluxo de materiais.",
      "Aumentando o estoque e prolongando prazos de entrega.",
      "Separando os departamentos de produção e logística."
    ],
    correta: 0,
    detalhesCorreto: "A integração ajusta a produção à demanda, eliminando excessos.",
    detalhesIncorreto: "As outras alternativas não são compatíveis com o Lean.",
    dificuldade: "medio"
  },

  // QUESTÕES DIFÍCIEIS (10 questões)
  {
    pergunta: "Qual é a importância do giro de estoque para a gestão de uma empresa?",
    cenario: "Avalie como o giro impacta custos e reposição.",
    opcoes: [
      "Indica a eficiência na renovação dos estoques, ajudando a reduzir custos.",
      "Serve apenas para medir a quantidade armazenada.",
      "É um indicador secundário, sem impacto direto."
    ],
    correta: 0,
    detalhesCorreto: "Revela a rapidez com que os produtos são vendidos e repostos.",
    detalhesIncorreto: "As outras alternativas não capturam essa importância.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Como a previsão de demanda contribui para uma gestão de estoque eficiente?",
    cenario: "Planejar os níveis com base em previsões evita excessos e faltas.",
    opcoes: [
      "Permite ajustar os estoques conforme variações do mercado.",
      "Serve apenas para registrar dados históricos.",
      "É aplicável somente em empresas de grande porte."
    ],
    correta: 0,
    detalhesCorreto: "A previsão possibilita ajustar os estoques, minimizando custos e rupturas.",
    detalhesIncorreto: "As outras alternativas não capturam sua importância estratégica.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Qual a importância da utilização de métodos quantitativos em ambientes voláteis?",
    cenario: "Métodos estatísticos avançados podem ajustar os níveis em mercados voláteis.",
    opcoes: [
      "Permite ajustar dinamicamente os estoques com base em modelos estatísticos.",
      "Não é relevante, pois a intuição do gestor é suficiente.",
      "Só é aplicável em mercados estáveis."
    ],
    correta: 0,
    detalhesCorreto: "Métodos quantitativos ajudam a antecipar variações e ajustar os estoques.",
    detalhesIncorreto: "Confiar apenas na intuição pode levar a erros.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Como a integração de um sistema ERP pode contribuir para a eficiência na gestão de estoque?",
    cenario: "Sistemas integrados melhoram a comunicação e o controle dos estoques.",
    opcoes: [
      "Fornecendo dados em tempo real para decisões precisas.",
      "Aumentando a burocracia e os custos operacionais sem agregar valor.",
      "Limitando a flexibilidade do processo de reposição."
    ],
    correta: 0,
    detalhesCorreto: "Um ERP integra informações e oferece uma visão completa e atualizada.",
    detalhesIncorreto: "Um ERP bem configurado agrega valor à gestão.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Em um ambiente de Lean Manufacturing, como a gestão de riscos na cadeia de suprimentos impacta a performance operacional?",
    cenario: "Mitigar riscos é crucial para manter o fluxo produtivo.",
    opcoes: [
      "Reduzindo interrupções na produção e melhorando a eficiência.",
      "Aumentando o custo total devido a contingências caras.",
      "Tornando os processos mais lentos por excesso de monitoramento."
    ],
    correta: 0,
    detalhesCorreto: "Mitigar riscos mantém a produção contínua e alinhada ao Lean.",
    detalhesIncorreto: "Embora haja custos, a prevenção gera economia a longo prazo.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Qual é o trade-off essencial na gestão de estoques em mercados dinâmicos?",
    cenario: "Analise o equilíbrio entre manter estoque suficiente e os custos de armazenagem.",
    opcoes: [
      "Entre manter níveis altos e reduzir o risco de rupturas, considerando os custos.",
      "Entre reduzir o estoque ao máximo e perder a capacidade de atender à demanda.",
      "Entre investir em tecnologia e manter métodos tradicionais de gestão."
    ],
    correta: 0,
    detalhesCorreto: "O desafio é equilibrar o custo de manter estoques elevados com o risco de ruptura.",
    detalhesIncorreto: "Reduzir demais o estoque pode ocasionar faltas.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Em um cenário de alta incerteza, qual abordagem quantitativa avançada pode melhorar a previsão de demanda?",
    cenario: "Mercados voláteis exigem métodos que capturem variações rápidas na demanda.",
    opcoes: [
      "Modelos ARIMA",
      "Análise SWOT",
      "Benchmarking"
    ],
    correta: 0,
    detalhesCorreto: "Modelos ARIMA são robustos para previsão em cenários voláteis.",
    detalhesIncorreto: "Análise SWOT é qualitativa; Benchmarking é comparativo.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Como a implementação de metodologias Six Sigma pode complementar o Lean na redução de defeitos?",
    cenario: "Six Sigma utiliza ferramentas estatísticas para identificar causas raízes e melhorar a qualidade.",
    opcoes: [
      "Ao utilizar ferramentas estatísticas para identificar causas raízes.",
      "Ao eliminar todas as variações no processo.",
      "Ao reduzir o tempo de setup sem análise de qualidade."
    ],
    correta: 0,
    detalhesCorreto: "Six Sigma identifica e elimina causas de defeitos com ferramentas estatísticas.",
    detalhesIncorreto: "Eliminar todas as variações é inviável.",
    dificuldade: "dificil"
  },
  {
    pergunta: "De que forma a integração de tecnologias IoT pode impactar a gestão de estoque?",
    cenario: "A IoT permite monitoramento em tempo real e automação que otimizam a reposição.",
    opcoes: [
      "Fornecendo monitoramento em tempo real e automação de reposição.",
      "Aumentando os custos operacionais sem ganhos de eficiência.",
      "Limitando a comunicação entre setores."
    ],
    correta: 0,
    detalhesCorreto: "A IoT possibilita monitorar os estoques em tempo real e automatizar a reposição.",
    detalhesIncorreto: "Os ganhos de eficiência geralmente superam os custos.",
    dificuldade: "dificil"
  },
  {
    pergunta: "Qual é o papel da análise preditiva na melhoria contínua dentro da filosofia Kaizen?",
    cenario: "A análise preditiva pode identificar antecipadamente falhas e oportunidades de melhoria.",
    opcoes: [
      "Permitir a identificação antecipada de falhas e oportunidades de melhoria.",
      "Garantir a estabilidade dos processos sem mudanças.",
      "Substituir a necessidade de feedback dos colaboradores."
    ],
    correta: 0,
    detalhesCorreto: "A análise preditiva identifica problemas antes que ocorram, apoiando o Kaizen.",
    detalhesIncorreto: "Estabilidade sem mudanças contraria a melhoria contínua.",
    dificuldade: "dificil"
   }
]

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
