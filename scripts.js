const input = document.querySelector(".input-task");
const button = document.querySelector(".button-add-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    cocluida: false,
  });

  input.value = "";

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `

    <li class="task ${item.concluida && "done"}">
         <img src="imagem/checked.png" alt="check-na-tarefa" onclick = 'concluirTarefa(${posicao})' />
        <p>${item.tarefa}</p>
        <img src="imagem/trash.png" alt="tarefa-lixeira" onclick='deletarItem(${posicao})'/>
    </li>`;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();
button.addEventListener("click", adicionarNovaTarefa);
