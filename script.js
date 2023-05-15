const form = document.getElementById('solicitacao-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value;
  const material = document.getElementById('material').value;
  const quantidade = document.getElementById('quantidade').value;
  const data = document.getElementById('data').value;

  if (tipo && material && quantidade && data) {
    const solicitacao = { tipo, material, quantidade, data, status: "solicitada" };

    let solicitacoes = localStorage.getItem('solicitacoes');
    if (solicitacoes === null) {
      solicitacoes = [];
    } else {
      solicitacoes = JSON.parse(solicitacoes);
    }

    solicitacoes.push(solicitacao);

    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    alert('Solicitação enviada com sucesso!');
    form.reset();
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }
});

function exibirSolicitacoes() {
  const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes'));

  const tabela = document.getElementById('solicitacoes-tabela');
  tabela.innerHTML = '';

  solicitacoes.forEach(function(solicitacao, index) {
    const row = tabela.insertRow();

    const indexCell = row.insertCell();
    indexCell.innerHTML = index + 1;

    const tipoCell = row.insertCell();
    tipoCell.innerHTML = solicitacao.tipo;

    const materialCell = row.insertCell();
    materialCell.innerHTML = solicitacao.material;

    const quantidadeCell = row.insertCell();
    quantidadeCell.innerHTML = solicitacao.quantidade;

    const dataCell = row.insertCell();
    dataCell.innerHTML = solicitacao.data;

    const statusCell = row.insertCell();
    const statusSelect = document.createElement("select");
    statusSelect.id = "status-select-" + index;
    statusSelect.onchange = function() {
      solicitacoes[index].status = statusSelect.value;
      localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
    };
    const statusOptions = ["solicitada", "programada", "concluída", "cancelada"];
    statusOptions.forEach(function(option) {
      const statusOption = document.createElement("option");
      statusOption.value = option;
      statusOption.text = option;
      statusSelect.add(statusOption);
    });
    statusSelect.value = solicitacao.status;
    statusCell.appendChild(statusSelect);
  });
}

exibirSolicitacoes();
