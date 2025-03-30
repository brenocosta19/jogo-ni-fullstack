document.addEventListener('DOMContentLoaded', function() {
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnInstrucoes = document.getElementById('btn-instrucoes');
    const btnFecharInstrucoes = document.getElementById('btn-fechar-instrucoes');
    const painelInstrucoes = document.getElementById('painel-instrucoes');
    
    // Botão iniciar
    btnIniciar.addEventListener('click', function() {
      window.location.href = 'index.html'; // Redireciona para o jogo
    });
    
    // Abrir instruções
    btnInstrucoes.addEventListener('click', function() {
      painelInstrucoes.classList.add('ativo');
    });
    
    // Fechar instruções
    btnFecharInstrucoes.addEventListener('click', function() {
      painelInstrucoes.classList.remove('ativo');
    });
    
    // Fechar instruções ao clicar fora do painel
    painelInstrucoes.addEventListener('click', function(e) {
      if (e.target === painelInstrucoes) {
        painelInstrucoes.classList.remove('ativo');
      }
    });
  });