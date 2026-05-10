let contexto;
let analisador;
let dados;
let rodando = false;
let intervaloId; // Precisamos guardar o ID para conseguir parar o intervalo

async function alternar() {
  const botao = document.getElementById('botao');
  
  if (!rodando) {
    // LÓGICA PARA INICIAR
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      contexto = new AudioContext();
      const source = contexto.createMediaStreamSource(stream);
      analisador = contexto.createAnalyser();
      analisador.fftSize = 2048;
      source.connect(analisador);
      dados = new Float32Array(analisador.fftSize);

      rodando = true;
      botao.innerText = "Parar microfone";

      // O setInterval deve ser criado APENAS quando iniciamos
      intervaloId = setInterval(monitorar, 400);
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
    }
  } else {
    // LÓGICA PARA PARAR
    rodando = false;
    botao.innerText = "Iniciar microfone";
    
    // Para o intervalo para não tentar ler dados de um contexto fechado
    clearInterval(intervaloId);

    if (contexto) {
      await contexto.close();
    }
    
    document.getElementById('valor').innerText = "0.00";
  }
}

function monitorar() {
  if (!analisador || !rodando) return;

  analisador.getFloatTimeDomainData(dados);
  let soma = 0;
  for (let i = 0; i < dados.length; i++) {
    soma += dados[i] * dados[i];
  }
  let rms = Math.sqrt(soma / dados.length);
  let db = rms > 0 ? 20 * Math.log10(rms) : -100;
  let valorfinal = Math.max(0, db + 100);
  
  document.getElementById('valor').innerText = valorfinal.toFixed(2);
}