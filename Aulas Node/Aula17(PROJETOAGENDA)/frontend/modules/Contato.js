// Importando o módulo validator para validação de dados
import validator from "validator";

// Exportando a classe Contato como padrão
export default class Contato {
  // Construtor da classe que recebe um seletor de classe de formulário
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  // Método de inicialização, invocado para configurar eventos
  init() {
    this.events();
  }

  // Método para configurar eventos, chamado por init()
  events() {
    // Verifica se o formulário existe antes de adicionar o evento de envio
    if (!this.form) return;
    
    // Adiciona um ouvinte de evento para o envio do formulário
    this.form.addEventListener("submit", (e) => {
      // Impede o envio padrão do formulário
      e.preventDefault();
      
      // Chama o método validate() para validar os campos do formulário
      this.validate(e);
    });
  }

  // Método para validar os campos do formulário
  validate(e) {
    // Obtém o elemento HTML que acionou o evento (o formulário)
    const el = e.target;

    // Obtém os elementos de input para nome, email e telefone dentro do formulário
    const nomeInput = el.querySelector('input[name="nome"]');
    const emailInput = el.querySelector('input[name="email"]');
    const telefoneInput = el.querySelector('input[name="telefone"]');

    // Inicializa a variável de erro como falso
    let error = false;

    // Verifica se o campo de nome está vazio
    if (!nomeInput.value) {
      // Se estiver vazio, exibe um alerta
      alert("Nome é um campo obrigatório");
      // Define a variável de erro como verdadeira
      error = true;
    }

    // Verifica se nem o campo de email nem o de telefone foram preenchidos
    if (!emailInput.value && !telefoneInput.value) {
      // Se ambos estiverem vazios, exibe um alerta
      alert("Um dos campos precisam ser preenchidos: email ou telefone");
      // Define a variável de erro como verdadeira
      error = true;
    }

    // Se não houver erros, submete o formulário
    if (!error) el.submit();
  }
}