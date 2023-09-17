class InsereUpload {
  constructor() {
    this.container = document.querySelector(".container");
    this.formulario = document.querySelector(".formulario");
    this.eventos();
  }
  eventos(e) {
    this.formulario.addEventListener("submit", (evento) => {
      this.handleSubmit(evento);
    });
  }
  handleSubmit(evento) {}
}

const insere = new InsereUpload();
