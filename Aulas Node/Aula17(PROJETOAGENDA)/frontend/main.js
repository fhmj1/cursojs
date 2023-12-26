/*importam módulos do core-js e regenerator-runtime para fornecer funcionalidades de ECMAScript 2015 (ES6) e 
superiores em ambientes que podem não suportar essas funcionalidades nativamente.*/
import "regenerator-runtime/runtime";
// importam as classes Login e Contato dos módulos correspondentes. Sugere uma abordagem de módulos para organizar o código.
import Login from './modules/Login';
import Contato from './modules/Contato';

// Cria instâncias das classes Login e Contato, passando seletores CSS para os construtores.
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const editar = new Contato('.form-editar');
const registrar = new Contato('.form-registrar');

/* Chama o método init() nas instâncias das classes Login e Contato. O método init() 
é presumivelmente responsável por configurar e iniciar a funcionalidade associada a essas classes.*/
login.init();
cadastro.init();
editar.init();
registrar.init();
