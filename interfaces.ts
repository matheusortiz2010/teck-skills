// Exercício 3: Interfaces e Tipos Personalizados

console.log("\n=== EXERCÍCIO 3: INTERFACES E TIPOS ===");

// 1. Interface IUser
interface IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    age?: number;
}

// 2. Interface IProduct
interface IProduct {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    categories: string[];
}

// 3. Type Alias para UserRole
type UserRole = 'admin' | 'user';

// 4. Interface IAdminUser que estende IUser
interface IAdminUser extends IUser {
    role: UserRole;
}

// Criando instâncias das interfaces

// Instância de IUser
const regularUser: IUser = {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    isActive: true
};

// Instância de IProduct
const smartphone: IProduct = {
    id: 101,
    name: "iPhone 15 Pro",
    price: 8999.99,
    inStock: true,
    categories: ["Eletrônicos", "Smartphones", "Apple"]
};

const notebook: IProduct = {
    id: 102,
    name: "MacBook Air M2",
    price: 12999.99,
    inStock: false,
    categories: ["Eletrônicos", "Notebooks", "Apple"]
};

// Instância de IAdminUser
const adminUser: IAdminUser = {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@admin.com",
    isActive: true,
    role: 'admin'
};

const normalUser: IAdminUser = {
    id: 3,
    name: "Pedro Costa",
    email: "pedro.costa@email.com",
    isActive: true,
    role: 'user'
};

// Funções para imprimir informações

// Função que recebe IUser e imprime suas informações
function printUserInfo(user: IUser): void {
    console.log(`
👤 INFORMAÇÕES DO USUÁRIO:
ID: ${user.id}
Nome: ${user.name}
Email: ${user.email}
Status: ${user.isActive ? "Ativo" : "Inativo"}
    `.trim());
}

// Função que recebe IProduct e imprime suas informações
function printProductInfo(product: IProduct): void {
    console.log(`
📦 INFORMAÇÕES DO PRODUTO:
ID: ${product.id}
Nome: ${product.name}
Preço: R$ ${product.price.toFixed(2)}
Em estoque: ${product.inStock ? "✅ Sim" : "❌ Não"}
Categorias: ${product.categories.join(" | ")}
    `.trim());
}

// Função específica para IAdminUser
function printAdminUserInfo(adminUser: IAdminUser): void {
    console.log(`
👑 INFORMAÇÕES DO USUÁRIO ADMIN:
ID: ${adminUser.id}
Nome: ${adminUser.name}
Email: ${adminUser.email}
Status: ${adminUser.isActive ? "Ativo" : "Inativo"}
Função: ${adminUser.role === 'admin' ? 'Administrador' : 'Usuário'}
    `.trim());
}

// Função que trabalha com arrays de interfaces
function printAllUsers(users: IUser[]): void {
    console.log("\n📋 LISTA DE TODOS OS USUÁRIOS:");
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.isActive ? "Ativo" : "Inativo"}`);
    });
}

function printAllProducts(products: IProduct[]): void {
    console.log("\n📋 CATÁLOGO DE PRODUTOS:");
    products.forEach((product, index) => {
        const stockStatus = product.inStock ? "Em estoque" : "Fora de estoque";
        console.log(`${index + 1}. ${product.name} - R$ ${product.price.toFixed(2)} (${stockStatus})`);
    });
}

// Função que demonstra type guards
function isAdminUser(user: IUser | IAdminUser): user is IAdminUser {
    return 'role' in user;
}

function processUser(user: IUser | IAdminUser): void {
    if (isAdminUser(user)) {
        console.log(`Processando admin: ${user.name} com role ${user.role}`);
    } else {
        console.log(`Processando usuário regular: ${user.name}`);
    }
}

// Testando as funções
console.log("\n--- Informações dos Usuários ---");
printUserInfo(regularUser);
printAdminUserInfo(adminUser);
printAdminUserInfo(normalUser);

console.log("\n--- Informações dos Produtos ---");
printProductInfo(smartphone);
printProductInfo(notebook);

// Testando com arrays
const allUsers: IUser[] = [regularUser, adminUser, normalUser];
const allProducts: IProduct[] = [smartphone, notebook];

printAllUsers(allUsers);
printAllProducts(allProducts);

// Testando type guards
console.log("\n--- Processamento de Usuários ---");
processUser(regularUser);
processUser(adminUser);

// Exemplo de interface opcional e readonly
interface IUserPreferences {
    readonly userId: number;
    theme?: 'light' | 'dark';
    notifications?: boolean;
    language?: string;
}

const userPrefs: IUserPreferences = {
    userId: 1,
    theme: 'dark',
    notifications: true
};

console.log(`\n⚙️  PREFERÊNCIAS DO USUÁRIO ${userPrefs.userId}:`);
console.log(`Tema: ${userPrefs.theme || 'padrão'}`);
console.log(`Notificações: ${userPrefs.notifications ? 'Habilitadas' : 'Desabilitadas'}`);
console.log(`Idioma: ${userPrefs.language || 'Português (padrão)'}`);

// Exportando para uso em outros arquivos
export {
    IUser,
    IProduct,
    UserRole,
    IAdminUser,
    printUserInfo,
    printProductInfo,
    printAdminUserInfo,
    regularUser,
    smartphone,
    adminUser,
    notebook
};