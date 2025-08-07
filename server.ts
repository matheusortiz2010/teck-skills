// Exercício 5: API REST com Express e TypeScript
import express, { Request, Response, NextFunction } from 'express';
import { IUser, UserRole } from './interfaces';

// Configuração do Express
const app = express();
const PORT = 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware para logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Array de usuários em memória (banco de dados simulado)
let users: IUser[] = [
    {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        age: 28,
        isActive: true
    },
    {
        id: 2,
        name: "Maria Santos",
        email: "maria@email.com",
        age: 32,
        isActive: true
    },
    {
        id: 3,
        name: "Pedro Oliveira",
        email: "pedro@email.com",
        age: 25,
        isActive: false
    }
];

// Variável para controlar o próximo ID
let nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

// Interfaces para tipagem das requisições
interface CreateUserRequest {
    name: string;
    email: string;
    age: number;
    isActive?: boolean;
}

interface UpdateUserRequest {
    name?: string;
    email?: string;
    age?: number;
    isActive?: boolean;
}

// Função de validação para criar usuário
function validateCreateUser(data: any): data is CreateUserRequest {
    return (
        typeof data === 'object' &&
        typeof data.name === 'string' &&
        data.name.length > 0 &&
        typeof data.email === 'string' &&
        data.email.includes('@') &&
        typeof data.age === 'number' &&
        data.age > 0 &&
        data.age < 150 &&
        (data.isActive === undefined || typeof data.isActive === 'boolean')
    );
}

// Função de validação para atualizar usuário
function validateUpdateUser(data: any): data is UpdateUserRequest {
    if (typeof data !== 'object' || data === null) return false;
    
    // Pelo menos um campo deve estar presente
    const hasValidField = (
        (data.name !== undefined && typeof data.name === 'string' && data.name.length > 0) ||
        (data.email !== undefined && typeof data.email === 'string' && data.email.includes('@')) ||
        (data.age !== undefined && typeof data.age === 'number' && data.age > 0 && data.age < 150) ||
        (data.isActive !== undefined && typeof data.isActive === 'boolean')
    );
    
    return hasValidField;
}

// ROTAS DA API

// GET /users - Retorna todos os usuários
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// GET /users/:id - Retorna um usuário específico pelo ID
app.get('/users/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID deve ser um número válido'
            });
        }
        
        const user = users.find(u => u.id === id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Usuário com ID ${id} não encontrado`
            });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// POST /users - Adiciona um novo usuário
app.post('/users', (req: Request, res: Response) => {
    try {
        if (!validateCreateUser(req.body)) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos. Verifique os campos obrigatórios: name (string), email (string com @), age (number > 0)'
            });
        }
        
        // Verificar se email já existe
        const emailExists = users.some(u => u.email === req.body.email);
        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: 'Email já está em uso'
            });
        }
        
        const newUser: IUser = {
            id: nextId++,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            isActive: req.body.isActive ?? true // Default true se não informado
        };
        
        users.push(newUser);
        
        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// PUT /users/:id - Atualiza um usuário existente
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID deve ser um número válido'
            });
        }
        
        if (!validateUpdateUser(req.body)) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos. Pelo menos um campo válido deve ser fornecido'
            });
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Usuário com ID ${id} não encontrado`
            });
        }
        
        // Verificar se email já existe (apenas se estiver sendo alterado)
        if (req.body.email && req.body.email !== users[userIndex].email) {
            const emailExists = users.some(u => u.email === req.body.email);
            if (emailExists) {
                return res.status(409).json({
                    success: false,
                    message: 'Email já está em uso'
                });
            }
        }
        
        // Atualizar apenas os campos fornecidos
        const updatedUser: IUser = {
            ...users[userIndex],
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.email && { email: req.body.email }),
            ...(req.body.age && { age: req.body.age }),
            ...(req.body.isActive !== undefined && { isActive: req.body.isActive })
        };
        
        users[userIndex] = updatedUser;
        
        res.status(200).json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// DELETE /users/:id - Remove um usuário
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID deve ser um número válido'
            });
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Usuário com ID ${id} não encontrado`
            });
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.status(200).json({
            success: true,
            message: 'Usuário removido com sucesso',
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Rota para informações da API
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'API de Usuários - TypeScript + Express',
        version: '1.0.0',
        endpoints: {
            'GET /users': 'Lista todos os usuários',
            'GET /users/:id': 'Busca usuário por ID',
            'POST /users': 'Cria novo usuário',
            'PUT /users/:id': 'Atualiza usuário existente',
            'DELETE /users/:id': 'Remove usuário'
        }
    });
});

// Middleware para rotas não encontradas
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
    });
});

// Middleware para tratamento de erros globais
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Erro:', err);
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📚 Documentação da API disponível em http://localhost:${PORT}`);
    console.log('\n--- Rotas disponíveis ---');
    console.log('GET    /users       - Lista todos os usuários');
    console.log('GET    /users/:id   - Busca usuário por ID');
    console.log('POST   /users       - Cria novo usuário');
    console.log('PUT    /users/:id   - Atualiza usuário');
    console.log('DELETE /users/:id   - Remove usuário');
});

export { app };