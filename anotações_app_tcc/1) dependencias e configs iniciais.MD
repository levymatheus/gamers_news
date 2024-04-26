1) as bibliotecas e dependências do projeto: npm i express@~4.17.2 express-formidable@~1.2.0 adminjs@~5.5.1 @adminjs/express@~4.0.1 @adminjs/sequelize@~2.1.0 @adminjs/upload@~2.0.1 pg@~8.7.1 sequelize@~6.13.0

servidor de rotas: express
dependência do admin js para trabalhar com formulários no express: express-formidable
ferramenta back-end para criar o painel administrativo do app (CRUD), telas de cadastro, posts e etc: AdminJs
dependência para trabalhar com as rotas adminJs com o express: Adminjs/express
dependência ORM para trabalhar com banco de dados: adminJs/sequelize
recurso de upload do adminJS(videos,imagens,capas das noticias, categorias,etc) : adminjs/upload
o proprio sequelize: sequelize
o dependência do banco de dados postgress: pg

2) agora as dependências de desenvolvimento:  npm i -D typescript@~4.5.4 ts-node-dev@~1.1.8 sequelize-cli@6.4.1 @types/express@~4.17.13 @types/node@~17.0.10

linguagem ts para o projeto: typescript
executar a aplicação em ts e fazer atualizações no código mesmo com o server em execução: ts-node-dev
interface de linha da comando do sequelize para gerir o BD: sequelize-cli (cria e executa migration, models, criar o banco de dados )
tipagens do express e node: types/express e types/node

3) tirar a node_modules do git com gitigonore

4) na pasta src criar o servidor: server.ts e criado um servidor na porta 3000

5) para rodar a aplicação em modo de desenvolvedor e deixar o server rodando após alterações editar a flag em package.json para: "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"

6) adicionar configurações especificar no compilador ts do projeto: npx tsc --init 
com isso é criada tsconfig.json

7) rodar o comando npm run dev e verificar no terminal: Server initilized in port 3000