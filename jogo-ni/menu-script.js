document.addEventListener('DOMContentLoaded', function() {
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnInstrucoes = document.getElementById('btn-instrucoes');
    const btnFecharInstrucoes = document.getElementById('btn-fechar-instrucoes');
    const painelInstrucoes = document.getElementById('painel-instrucoes');
    
    
    btnIniciar.addEventListener('click', function() {
      window.location.href = 'index.html'; 
    });
    
    
    btnInstrucoes.addEventListener('click', function() {
      painelInstrucoes.classList.add('ativo');
    });
    
    
    btnFecharInstrucoes.addEventListener('click', function() {
      painelInstrucoes.classList.remove('ativo');
    });
    
    
    painelInstrucoes.addEventListener('click', function(e) {
      if (e.target === painelInstrucoes) {
        painelInstrucoes.classList.remove('ativo');
      }
    });
  });