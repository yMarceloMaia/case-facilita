## Teste de Programação Desenvolvedor Facilita Jurídico

#### Monorepo com TurboRepo: Backend em Node.js, Frontend em React

### Descrição:

Este projeto é um monorepo que utiliza TurboRepo para gerenciar múltiplos pacotes, incluindo o backend em Node.js com TypeScript e o frontend em React com TypeScript.

### Tecnologias utilizadas

- **TurboRepo:** Gerenciamento de monorepo
    - v1.12.5
- **Node.js:** Backend
    - v21.6.2
- **TypeScript:** Linguagem de programação
    - v5.4.2
- **PostgreSQL:** Banco de dados relacional
    - v16.1
- **Vite:** Build tool para o frontend
    - v5.1.6
- **React:** Biblioteca para construção de interfaces de usuário
    - v18.2.0
- **Tailwind CSS:** Framework CSS para estilização
    - v3.4.1

### Configuração do ambiemte

1. Clone este repositório

```
git clone https://github.com/yMarceloMaia/case-facilita.git
```

2. Navegue para o diretório do projeto

```
cd case-facilita
```

3. Instale as dependências

```
npm install
```

4. Configure as variáveis de ambiente com as informações do seu banco de dados postgresql, um exemplo do arquivo .env está no diretório ./case-facilita/apps/server/.env.example, renomeie este arquivo para '.env' e coloque as informações de suas variáveis

```
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=
```

5. Execute o monorepo a partir da pasta raiz do projeto

```
npm run dev
```

### Documentação da API

https://documenter.getpostman.com/view/18384135/2sA2xk1BzN

### Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
