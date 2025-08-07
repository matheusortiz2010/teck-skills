// Exercício 1: Hello World com TypeScript

console.log("Hello, TypeScript!");

// Função simples para demonstrar TypeScript
function greetUser(name: string): string {
    return `Olá, ${name}! Bem-vindo ao mundo do TypeScript!`;
}

const userName: string = "Desenvolvedor";
console.log(greetUser(userName));

// Importando e executando os outros exercícios
import './data';
import './interfaces';