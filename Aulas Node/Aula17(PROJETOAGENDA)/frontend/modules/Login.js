// Importando o módulo validator para validação de dados
import validator from "validator";

// Exportando a classe Login como padrão
export default class Login {
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

    // Obtém os elementos de input para email e senha dentro do formulário
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');

    // Inicializa a variável de erro como falso
    let error = false;

    // Valida o campo de email usando a função isEmail do módulo validator
    if (!validator.isEmail(emailInput.value)) {
      // Se o email for inválido, exibe um alerta
      alert('E-mail inválido');
      // Define a variável de erro como verdadeira
      error = true;
    }

    // Valida o campo de senha para garantir que tenha entre 6 e 20 caracteres
    if (passwordInput.value.length < 6 || passwordInput.value.length > 20) {
      // Se a senha estiver fora do intervalo, exibe um alerta
      alert("Senha precisa ter entre 6 e 20 caracteres");
      // Define a variável de erro como verdadeira
      error = true;
    }

    // Se não houver erros, submete o formulário
    if (!error) el.submit();
  }
}