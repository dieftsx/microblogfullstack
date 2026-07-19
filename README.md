# Diario Virtual

Um microblog minimalista para registrar e compartilhar seus pensamentos diarios. Projeto fullstack desenvolvido com Next.js 15 e Supabase.

## Funcionalidades

### Autenticacao
- Cadastro de usuarios com email, senha, nome de usuario e nome completo
- Login com email e senha
- Verificacao de email para confirmacao de conta
- Protecao de rotas autenticadas
- Logout seguro

### Posts
- Criar novos posts com titulo, conteudo e categoria opcional
- Editar posts existentes (apenas o autor)
- Excluir posts (apenas o autor)
- Visualizar posts na pagina inicial
- Visualizar post individual com detalhes
- Filtrar posts por categoria

### Interacoes
- Curtir/descurtir posts (toggle like)
- Contagem de curtidas por post
- Comentar em posts
- Excluir proprios comentarios
- Contagem de comentarios por post

### Amizades
- Buscar usuarios por nome de usuario
- Enviar pedidos de amizade
- Aceitar pedidos de amizade
- Rejeitar pedidos de amizade
- Cancelar pedidos de amizade enviados
- Remover amigos
- Visualizar lista de amigos
- Visualizar pedidos de amizade pendentes
- Posts visiveis apenas para amigos e proprios posts

### Perfis
- Visualizar perfil de outros usuarios
- Editar proprio perfil (nome de usuario, nome completo, avatar)
- Verificacao de unicidade do nome de usuario
- Pagina de perfil com posts do usuario

### Categorias
- Sistema de categorias para organizar posts
- Filtrar posts por categoria na pagina inicial
- Pagina dedicada para cada categoria

### Interface
- Tema claro e escuro (dark mode)
- Layout responsivo para desktop e mobile
- Sidebar com navegacao
- Sidebar de amigos com busca
- Landing page para usuarios nao autenticados
- Fonte Playfair Display para estilo elegante
- Paleta de cores roxa em todo o layout
- Navegacao intuitiva entre paginas

## Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilo**: Tailwind CSS 4, Radix UI, Lucide React
- **Backend**: Supabase (autenticacao, banco de dados, storage)
- **Fonte**: Playfair Display

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/     # Componentes React
│   ├── auth/          # Callback de autenticacao
│   ├── category/      # Paginas de categorias
│   ├── login/         # Pagina de login
│   ├── newpost/       # Criar novo post
│   ├── post/          # Visualizar/editar posts
│   ├── profile/       # Editar perfil
│   ├── signup/        # Pagina de cadastro
│   └── user/          # Perfis de usuarios
├── components/        # Componentes UI genericos
└── lib/
    ├── actions/       # Server actions do Next.js
    ├── supabase/      # Configuracao do Supabase
    └── types/         # Tipagens TypeScript
```

## Como Executar

```bash
# Instalar dependencias
npm install

# Configurar variaveis de ambiente (criar .env.local)
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

# Executar em modo de desenvolvimento
npm run dev

# Build para producao
npm run build

# Iniciar em producao
npm start
```

## Variaveis de Ambiente

| Variavel | Descricao |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anonima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de servico do Supabase |
| `NEXT_PUBLIC_SITE_URL` | URL do site (opcional) |

## Scripts Disponiveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de producao
- `npm run start` - Iniciar servidor de producao
- `npm run lint` - Verificacao de codigo