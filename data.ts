// Exercício 2: Tipos Primitivos e Estruturados

console.log("\n=== EXERCÍCIO 2: TIPOS PRIMITIVOS ===");

// 1. String para o nome de um produto
const productName: string = "Smartphone Samsung Galaxy";

// 2. Number para o preço do produto
const productPrice: number = 1299.99;

// 3. Boolean indicando se o produto está em estoque
const inStock: boolean = true;

// 4. Array de strings para as categorias do produto
const categories: string[] = ["Eletrônicos", "Smartphones", "Samsung"];

// 5. Tupla para representar coordenadas (latitude e longitude)
const storeLocation: [number, number] = [-28.2639, -52.4064]; // Passo Fundo, RS

// 6. Enum para os status de um pedido
enum OrderStatus {
    Pendente = "PENDENTE",
    Processando = "PROCESSANDO",
    Entregue = "ENTREGUE",
    Cancelado = "CANCELADO"
}

// Exemplos de uso do enum
const currentOrderStatus: OrderStatus = OrderStatus.Processando;

// Função que aceita nome e preço e retorna mensagem formatada
function formatProductMessage(name: string, price: number): string {
    return `O produto ${name} custa R$ ${price.toFixed(2)}`;
}

// Função que aceita array de categorias e retorna mensagem formatada
function formatCategoriesMessage(productCategories: string[]): string {
    return `Categorias: ${productCategories.join(", ")}`;
}

// Função que aceita coordenadas e retorna mensagem formatada
function formatLocationMessage(coordinates: [number, number]): string {
    const [lat, lng] = coordinates;
    return `Localização da loja: Latitude ${lat}, Longitude ${lng}`;
}

// Função que aceita status do pedido e retorna mensagem formatada
function formatOrderStatus(status: OrderStatus): string {
    return `Status do pedido: ${status}`;
}

// Testando as funções
console.log(formatProductMessage(productName, productPrice));
console.log(formatCategoriesMessage(categories));
console.log(formatLocationMessage(storeLocation));
console.log(formatOrderStatus(currentOrderStatus));
console.log(`Produto em estoque: ${inStock ? "Sim" : "Não"}`);

// Exemplo adicional: função que trabalha com múltiplos tipos
function getProductSummary(
    name: string, 
    price: number, 
    stock: boolean, 
    productCategories: string[],
    status: OrderStatus
): string {
    return `
📱 RESUMO DO PRODUTO:
Nome: ${name}
Preço: R$ ${price.toFixed(2)}
Em estoque: ${stock ? "✅ Sim" : "❌ Não"}
Categorias: ${productCategories.join(" | ")}
Status do pedido: ${status}
    `.trim();
}

console.log("\n" + getProductSummary(
    productName, 
    productPrice, 
    inStock, 
    categories, 
    currentOrderStatus
));

// Exportando para uso em outros arquivos
export {
    productName,
    productPrice,
    inStock,
    categories,
    storeLocation,
    OrderStatus,
    formatProductMessage,
    formatCategoriesMessage,
    formatLocationMessage,
    formatOrderStatus
};