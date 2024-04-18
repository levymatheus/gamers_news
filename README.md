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


3) agora as dependências de desenvolvimento:  npm i -D typescript@~4.5.4 ts-node-dev@~1.1.8 sequelize-cli@6.4.1 @types/express@~4.17.13 @types/node@~17.0.10

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

CONFIGURANDO O ADMINJS JUNTAMENTE COM O SERVIDOR DO EXPRESS DA APLICAÇÃO 

1) inicialmente, nessa etapa configuramos o adminJS que é a framework js que utilizamos para nosso painel administrativo.
nesse painel poderemos ter acesso administrador do nosso site de noticias. lá podemos criar e administras usuários, criar e administras categorias dos
jogos onde ficam as noticias desses jogos, criar noticias sobre esses jogos, postar os videos, imagens e tudo que for necessário em um site de noticias.

2) criamos em src a pasta adminjs juntamente com um arquivo index para os arquivos de configuração da framework no projeto

3) no arquivo de configuração importamos as bibliotecas do adminJS, o servidor express do adminjs e a orm do sequelize para o adminjs

4) dentro do arquivo de configuração criamos a instância do nosso painel administrador e dentro dessa instância setamos algumas propriedades,
essas propriedades são o que nosso adminJS vai usar do nosso projeto. Setamos a pasta /databases que é a pasta onde ficam nossos arquivos ts
do banco de dados que faz a comunicação dos campos do crud do painel administrativo com o banco de dados, uma rota indicando para a aplicação
que estamos no painel administrador, e por agora uma propriedade branding que é onde personalizamos as cores de todo o painel administrativo

6) criamos uma conexão do admin js com um o servidor express

7) no server.ts passamos essas rotas que criamos no passo 6 em nosso servidor

8) testamos a aplicação com npm run dev e no navegador passamos o endereço http://localhost:3000/admin

9) com isso, temos a tela de administrador funcionando em nosso servidor, porém ainda temos que configurar ela para o contexto da nossa aplicação como os campos de upload, criar categorias, jogos e noticias e etc.

10) criamos uma pasta public com a logo para usar a logo do aplicativo em nosso administrador, setando o caminho da logo em nossa propriedade
branding, que como anteriormente foi mencionado, a propriedade de personalização do painel.
nessa pasta public fica nossos assets estáticos da aplicação. imagens, algumas tumnails das noticias, dos games e etc

11) no arquivo server.ts configuramos o servidor express para usar essa pasta, retornando as imagens no painel adminstativo


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CRIANDO RESOURCE E MODEL PARA AS CATEGORIAS 

1) As migrations basicamente é onde controlamos nosso banco de dados na nossa aplicação, controles esses feitos pelo sequelize-cli que é a interface
de linha de comando do sequelize dentro da aplicação. Com a sequelize temos as funções up e down que são definidas para criar, alterar e até mesmo remover
informações do nosso banco de dados. Resumidamente com as migrations podemos criar as tabelas do nosso banco de dados. Ao longo do tempo essas migrations
facilitam a manutenção das tabelas do nosso banco de dados. 

2) criando a primeira migration com o comando ==> npx sequelize-cli migration:generate --name create-categorioes-table
com esse comando criamos nossa primeira tabela de banco de dados da aplicação, essa tabela é onde ficam as categorias
categorias essas como: Jogos de esportes, tiro, luta, simuladores e etc. Como o contexto da nossa aplicação é noticia sobre jogos, 
vamos separar por categorias.

3) Em uma aplicação de noticias, temos categorias como: Politica, Policial, Esportes, Clima, Compras, e etc.
No contexto da aplicação desse projeto temos apenas divididos pelas categorias dos games.

4) feito isso, como configuramos o arquivo de pastas do sequelize para as migrations no caminho para databese,
nossa migration de categorias foi criada. Agora podemos gerencias o estado da nossa tabela de categorias.

5) criado a migration e setamos alguns atributos nesse arquivo js,  temos o método up, que basicamente é onde setamos  as
propriedades que criam as colunas da tabela. Temos o id, name, position, created_at e updated_at. Em id, temos uma chave primária que é onde vamos
relacionar uma categoria a um jogo especifico. Por exemplo, FIFA 23, um jogo de esporte, fica na categoria Esportes. 

6) no código, a razão pela qual precisamos dos métodos up e down é para ter controle total sobre as alterações do banco de dados. Com esses dois métodos,  podemos avançar (up) ou retroceder (down) nas versões do nosso banco de dados.

7) feito isso podemos rodar a migration para que de fato a tabela de categorias seja criada. inicialmente apenas criamos a migration que é onde gerenciamos
a tabela, agora com o comando ===> npx sequelize-cli db:migrate a migration é executada, sendo assim criando a tabela.

6) ao abrir o pgAdmin podemos visualizar que a tabela de categorias já está disponível em nosso banco de dados. com isso, nossa tabela já está
esquematizada e funcionado. Agora devemos conectar essa tabela na aplicação com o adminJs para que possamos criar nossas categorias.

7) Criamos o model, o model é a interação da tabela na aplicação. 

8) No código Category.ts importamos a tipagem para os atributos que receberão os valores e alguns outros métodos do sequelize.
Temos uma interface ts que se comunica com as colunas ta tabela, temos uma interface chamada CategoryCreationAttribures que se comunica com 
a interface Category, essa interface basicamente seta um id para a categoria que estamos criando.

9) No mesmo model ts, temos a interface CategoryInstance, que representa a instância de uma categoria criada no banco de dados. Basicamente ela faz com que 
possamos usar todos os métodos e propriedades do sequelize nessa categoria que estamos criando, no caso faz com que possamos manipular-la no contexto 
da nossa aplicação.

10) Em sequelize.define<CategoryInstance, Category>('Category', {...}) setamos o método define que basicamente junta as interfaces que criamos e setamos alguns argumentos para id, name, position, se a propriedade pode ser nula ou não, que no caso é não, a chave primaria da categoria criada, cria um id automático pelo 
banco, e os tipos das datas. Modelar esses models é sempre a parte mais difícil mas logo iremos compreender mais fazendo outros models que seguem a mesma 
lógica. Nesse caso essa sequelize.define faz a tipagem para cada registro de categoria na aplicação, mandando então essa instância de objeto categoria para o 
banco de dados.

11) para todo model passamos os tipos para as propriedades do objeto, os atributos de criação e os opcionais caso queiramos, a interface da instancia do registro
com os métodos do sequelize e definir a instância do objeto do sequelize para a tabela. 

12) criamos na pasta models um arquivo index.ts onde futuramente iremos fazer os relacionamentos com nossas tabelas do banco de dados. 

13) Criamos os " formulários " ou "text areas" dentro do adminJs para criar nossas categorias dentro do nosso painel. Dar nome para elas e etc.

14) Chamamos esses formulários de resouces, na pasta do adminJs teremos a pasta resources com todos os resources para nosso painel.

15)  Criado o resource de categorias, setamos alguns atributos dentro de um objeto chamado categoryResourceOptions: nesses atributos podemos definir
o que vai ser editável nos campos de criação de categorias, o que é filtrável, dentre outras. Nesse caso, colocamos as categorias para aparecer no menu lateral
do nosso painel, e nesse menu, podemos editar o nome das categorias e sua posição quando quisermos ou não deixar uma categoria em destaque.
Também setamos filtros quando quisermos filtrar categorias por nome, posição, data de criação e atualização, e o que queremos listar de informação para o administrador, que no caso é o id, nome e posição.

16) futuramente vamos instalar um pacote de tradução para as informações que ficarão visíveis para os administradores.

17) na pasta resources criamos uma outra pasta index.ts que é onde iremos juntar todos os resources e colocar em conjunto na barra de navegação do adminJs juntamente com as configurações dos models. 

18) Por fim, no arquivo principal de configuração do painel em adminjs/index.ts, atribuímos os resources do nosso adminJs da aplicação para aparecer
no painel do administrador. com isso, será possível do administrador navegar entre as diferentes categorias, jogos e noticias, administrando o conteúdo.

19) Resumo: Criamos as opções gerenciáveis das categorias, criamos a pasta onde vão ficar as outras opções (jogos, noticias) gerenciáveis pelo nosso painel e lincamos com a tabela de categorias no banco de dados, e setamos o adminJsResources que é o passo anterior, a pasta onde ficam essas opções lincadas, sendo assim, podendo então o administrador manipular as categorias do nosso painel. 

20) Feito todos esses passos, no painel administrativo podemos já criar nossas categorias e visualizar elas em listas no próprio painel administrativo e até mesmo filtrar essas informações. Também se olharmos o banco de dados, a cada nova categoria criada, ela vai estar presente no nosso banco de dados. 

21) Para as tabelas de jogos e as de noticas seguimos os mesmos passos.




