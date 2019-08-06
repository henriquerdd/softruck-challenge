
#Considerações Iniciais

O sistema foi refeito utilizando-se node como backend. 

A modelagem mudou pois agora uma tarefa pode pertencer somente a um quadro, 
logo não precisamos mais de uma tabela intermediária que guarda quais tarefas
estão em quais quadros. Ficou mais simples assim, foram necessárias menos views
e ainda assim podemos fazer tudo o que podiamos anteriormente e o sistema ainda ficou mais enxuto.

Peço desculpas caso tenha deixado passar alguma besteira, ainda estou aprendendo as boas
práticas de desenvolvimento node.

Usei o [https://sequelize.org/](sequelize) como ORM, para simplificar o acesso a base de dados; o [https://expressjs.com/pt-br/](express) para servir
as requisições; e o [https://mochajs.org/](mocha) juntamente com o [https://www.chaijs.com/](chai) e o [https://sinonjs.org/](sinon) para escrever testes.

#Estrutura do backend

Temos a seguinte disposição de diretórios:

 - config: Contém os arquivos de configuração do projeto. Só precisei configurar a conexão com a base de dados.
 - controllers: Aqui ficam os controladores de tarefas e quadros. A lógica foi removida deles e colocada nos repositórios,
deixando-os responsáveis somente por receber as requisições e devolver as respostas.
 - database: Aqui ficam os arquivos de migração que nos permitem criar as tabelas. 
 - models: Temos apenas dois modelos, eles seguem a interface do sequelize para acessos a base de dados.
 - repositories: A lógica que anteriormente estava nos controladores foi movida para os repositórios. Temos 2 deles,
um de tarefas e outro de quadros, eles encapsulam os modelos e nos permitem realizar todas as operação CRUD sobre os mesmos.
Eles também são responsáveis por transformar os dados vindos da base nas estruturas que a api deve retornar.
 - resources: Aqui segui o padrão de nomes do laravel, essas estruturas são responsáveis por mapear uma entidade da base de dados
num recurso da api. Eles são utilizados pelos repositórios.
 - routes: Aqui temos os nossos arquivos de rotas. Temos 2 deles, um para as rotas da api, e outros para a nossa rota web única,
essa deve casar com tudo que não tenha o prefixo /api e retornar a view padrão do app, isso impede o usuário de receber erros estranhos
caso ele venha a recarregar a página numa rota imprevista.
 - tests: Aqui estão armazenados os testes dos repositórios. Não fiz testes de integração pois devido a simplicidade do sistema, os
unitários cobrem praticamente tudo. Para executa-los basta entrar no container do aplicativo e executar o comando `npm run test`.

