import { IUser, IProduct, regularUser, adminUser, smartphone, notebook } from "./interfaces";

// Função genérica que retorna o mesmo array recebido
function getData<T>(items: T[]): T[] {
  return items;
}

// Função genérica que busca um item por ID
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Testes com string[]
const stringArray = ["React", "TypeScript", "Node"];
console.log("\n🔠 Strings:", getData(stringArray));

// Testes com number[]
const numberArray = [10, 20, 30];
console.log("\n🔢 Números:", getData(numberArray));

// Testes com IUser[]
const users: IUser[] = [regularUser, adminUser];
console.log("\n👥 Usuários:", getData(users));

const userFound = getById(users, 2);
console.log("\n🔍 Usuário com ID 2:", userFound);

// Testes com IProduct[]
const products: IProduct[] = [smartphone, notebook];
console.log("\n📦 Produtos:", getData(products));

const productFound = getById(products, 102);
console.log("\n🔍 Produto com ID 102:", productFound);