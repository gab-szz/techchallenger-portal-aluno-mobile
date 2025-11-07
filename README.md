# Portal do Aluno - Aplicativo Mobile

Aplicativo mobile desenvolvido em React Native com Expo para o Tech Challenge Fase 04.

## 🚀 Tecnologias

- React Native 0.81.5
- Expo ~54.0.20
- Expo Router ~6.0.13
- TypeScript ~5.9.2
- React Navigation (Drawer)

## 📱 Funcionalidades

### Páginas Públicas (Sem necessidade de login)

- **Lista de Posts**: Visualização de todos os posts com busca por palavras-chave
- **Leitura de Post**: Visualização completa de um post específico

### Páginas de Autenticação

- **Login**: Autenticação de professores e alunos

### Páginas Administrativas (Apenas Professores)

#### Gestão de Posts

- Criação de novos posts
- Edição de posts existentes
- Exclusão de posts
- Página administrativa com visão geral

#### Gestão de Professores

- Listagem de professores
- Cadastro de novos professores
- Edição de dados de professores
- Exclusão de professores

#### Gestão de Alunos

- Listagem de alunos
- Cadastro de novos alunos
- Edição de dados de alunos
- Exclusão de alunos

## 📁 Estrutura do Projeto

```
techchallenger-portal-aluno-mobile/
├── app/                          # Rotas e telas do aplicativo
│   ├── _layout.tsx              # Layout principal com Drawer
│   ├── index.tsx                # Página inicial (lista de posts)
│   ├── login.tsx                # Tela de login
│   ├── admin.tsx                # Página administrativa
│   ├── posts/
│   │   ├── [id].tsx            # Visualização de post
│   │   ├── create.tsx          # Criação de post
│   │   └── edit/
│   │       └── [id].tsx        # Edição de post
│   ├── professors/
│   │   ├── index.tsx           # Listagem de professores
│   │   ├── create.tsx          # Cadastro de professor
│   │   └── edit/
│   │       └── [id].tsx        # Edição de professor
│   └── students/
│       ├── index.tsx           # Listagem de alunos
│       ├── create.tsx          # Cadastro de aluno
│       └── edit/
│           └── [id].tsx        # Edição de aluno
├── context/
│   └── AuthContext.tsx         # Contexto de autenticação
├── data/
│   └── mockData.ts             # Dados mockados para desenvolvimento
├── types/
│   └── index.ts                # Tipos TypeScript
└── assets/
    └── images/                 # Recursos de imagem
```

## 🎯 Arquitetura

### Navegação

O aplicativo utiliza o Expo Router com Drawer Navigation para facilitar a navegação entre as telas. O menu lateral é dinâmico e exibe opções diferentes dependendo do estado de autenticação e do tipo de usuário (professor ou aluno).

### Autenticação

O sistema de autenticação é gerenciado através do Context API (AuthContext), permitindo que o estado do usuário seja compartilhado em toda a aplicação. Atualmente implementado com dados mockados, está pronto para integração com backend real.

### Gerenciamento de Estado

- **Context API**: Utilizado para gerenciamento global de autenticação
- **useState**: Gerenciamento de estado local nas telas
- Dados mockados em `data/mockData.ts` prontos para serem substituídos por chamadas à API

### Estilização

Design minimalista com:

- Paleta de cores clean (branco, azul #007AFF, cinzas)
- Cards com bordas arredondadas
- Ícones do Ionicons
- Layout responsivo

## 🔐 Sistema de Permissões

### Acesso Público

- Visualização de lista de posts
- Leitura de posts individuais

### Acesso de Alunos (Login necessário)

- Mesmo acesso que visitantes públicos
- Acesso ao perfil pessoal

### Acesso de Professores (Login necessário)

- Todos os acessos de alunos
- Criação, edição e exclusão de posts
- Gerenciamento completo de professores
- Gerenciamento completo de alunos
- Acesso à página administrativa

## 📋 Setup Inicial

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go app (para testar em dispositivo físico)

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd techchallenger-portal-aluno-mobile
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

4. Escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS)

### Comandos Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Inicia no emulador Android
npm run ios        # Inicia no simulador iOS
npm run web        # Inicia versão web
npm run lint       # Executa o linter
```

## 🧪 Testando o App

### Credenciais de Login (Mock)

**Professor:**

- Email: professor@escola.com (ou qualquer email contendo "professor")
- Senha: qualquer senha

**Aluno:**

- Email: aluno@escola.com (ou qualquer email que não contenha "professor")
- Senha: qualquer senha

## 🔄 Próximos Passos (Integração com Backend)

Para conectar o aplicativo ao backend real, será necessário:

1. **Configurar variáveis de ambiente**

```typescript
// .env
API_URL=https://sua-api.com/api
```

2. **Criar serviço de API**

```typescript
// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export default api;
```

3. **Atualizar AuthContext** para fazer chamadas reais à API de autenticação

4. **Substituir dados mockados** por chamadas à API:

   - GET /posts - Lista de posts
   - GET /posts/:id - Detalhes do post
   - POST /posts - Criar post
   - PUT /posts/:id - Atualizar post
   - DELETE /posts/:id - Excluir post
   - Similar para professores e alunos

5. **Implementar tratamento de erros** e loading states

6. **Adicionar AsyncStorage** para persistir token de autenticação

## 🎨 Design e UX

- Interface minimalista e limpa
- Feedback visual para todas as ações (Alerts)
- Confirmações para ações destrutivas (exclusões)
- Navegação intuitiva através do menu lateral
- Busca em tempo real na lista de posts
- Botões flutuantes para ações principais

## 📝 Observações

- Todos os dados são mockados para demonstração
- A validação de permissões está implementada no front-end, mas deve ser reforçada no backend
- As rotas estão protegidas baseadas no estado de autenticação e role do usuário
- O design é responsivo e funciona em diferentes tamanhos de tela

## 👥 Desenvolvimento

Este projeto foi desenvolvido como parte do Tech Challenge da Fase 04, focando em criar uma interface mobile completa e funcional para o sistema de blogging educacional.

## 📄 Licença

Este projeto é parte de um trabalho acadêmico.
