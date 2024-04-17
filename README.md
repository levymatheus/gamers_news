DEPENDENCIAS E CONFIGURAÇÕES INICIAIS

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

   
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SEQUELIZE-CLI E CONFIGURAÇÃO COM BANCO DE DADOS E APLICAÇÃO

1) criamos um arquivo sequelizeCli.js para configurar e sequelize e configurar a dependência para trabalhar com banco de dados

2) no arquivo setamos um objeto com todas as configurações iniciais para fazer a conexão com o banco de dados, como nesse projeto 
iremos usar o PostgreSQL especificamos em uma propriedade 'dialect'

3) setamos o localhost que é o ambiente de testes que estamos, a porta do banco de dados e o nome do banco de dados,
pois com o sequelize criamos o nosso banco de dados por linha de comando e nesse arquivo de configuração setamos seu nome na propriedade.

4) também configuramos um username e senha para acesso a esse banco de dados. como esse arquivo vai ser upado para um servidor futuramente,
depois iremos tratar essas propriedades para ficarem ocultas e não a amostra em nosso arquivo  de configuração

5) na raiz do projeto criamos um outro arquivo para configurar o sequelize chamado .sequelizerc 
esse arquivo fica responsável em pegar o sequelizeCli que configuramos anteriormente  e fazer a
conexão com o projeto, conectando o terminal do sequelize com os models que criamos com o ts,
no caso os models de usuários do nosso banco de dados, categorias, jogos, noticias, videos e etc.
Basicamente esse arquivo faz a conexão do sequelize com os nossos arquivos typescript e js em que configuramos, 
criamos e administramos nosso banco de dados.

6) no terminal do vs code executamos o comando " psql -U postgres " para entrar no PostgreSQL e criamos a conexão do sequelize para um banco de dados
postgres=# CREATE USER gamersNews CREATEDB ENCRYPTED PASSWORD 'gamersNews';
feito isso o sequelize irá se conectar nesse banco de dados chamado "gamersNews" que criamos logo em seguida. 
OBS: acima é feita apenas a conexão do sequelize para esse banco de dados, em seguida po banco de dados foi criado

7) Após configurar todo o sequelize e configurar a conexão para um banco de dados que vai se chamar 'gamersNews'
executamos no terminal o comando npx sequelize-cli db:create 
Database gamersNews_development created. < === banco de dados criado e conectado com o serviço do sequelize

8) é criada a pasta database, models, migrations e seeders, pastas essas que vamos criar e manipular nossas entidades, elementos como
usuários, jogos, noticias, categorias, etc 

7) anteriormente estávamos conectando a interface do sequelize com o banco de dados para manipularmos, feito isso conectamos o próprio banco de dados
com a aplicação

8) é criado um arquivo index.ts dentro de database para conectar o banco de dados com a nossa aplicação, lá temos as mesmas configurações
que colocamos no arquivo sequelize-Cli, porém agora é feita a configuração do banco de dados para a aplicação. 
Basicamente passamos o banco de dados que utilizamos, o host, porta, o nome do BD, usuário e senha para acesso.

9) no servidor da aplicação server.ts testamos a conexão do banco de dados com a aplicação para verificar se está tudo funcionando 

 sequelize.authenticate().then(() => {
        console.log('DB connection sucessfull')
    }) 

retorna:

[INFO] 00:16:21 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.5)
Server initilized in port 3000
Executing (default): SELECT 1+1 AS result
DB connection sucessfull


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






