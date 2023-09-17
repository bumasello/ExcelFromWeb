function loadElements() {
  const form = document.querySelector(".formulario");
  form.addEventListener("submit", async (e) => {
    const input = form.querySelector(".inputFile");
    if (!input.files[0]) {
      e.preventDefault();
      alert("Por favor, carregue um arquivo!");
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", input.files[0]);
    console.log(formData);

    try {
      const response = await fetch("/qualidade/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar arquivo.");
      }

      await axios("../dataJSON.json").then((resposta) =>
        loadResult(resposta.data)
      );
    } catch (e) {
      console.Error(e);
    }
  });
}

function loadResult(json) {
  const table = document.createElement("table");

  const trx = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerHTML = "ID2";
  trx.appendChild(td1);
  let td2 = document.createElement("td");
  td2.innerHTML = "EXIBICAO";
  trx.appendChild(td2);
  let td3 = document.createElement("td");
  td3.innerHTML = "COMPLEMENTO";
  trx.appendChild(td3);
  let td4 = document.createElement("td");
  td4.innerHTML = "LATITUDE";
  trx.appendChild(td4);
  let td5 = document.createElement("td");
  td5.innerHTML = "LONGITUDE";
  trx.appendChild(td5);

  table.appendChild(trx);

  for (let dados of json) {
    const tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = dados.ID2;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = dados.EXIBICAO;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = dados.COMPLEMENTO;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = dados.LATITUDE;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = dados.LONGITUDE;
    tr.appendChild(td);

    table.appendChild(tr);
  }
  const resultado = document.querySelector(".resultado");
  const h1 = document.createElement("h1");
  h1.innerHTML = "DADOS INCLUIDOS COM SUCESSO";
  resultado.appendChild(h1);
  resultado.appendChild(table);
}

loadElements();
