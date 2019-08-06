
Para informações sobre o frontend favor visitar o README em `src/frontend`, e o contido em `src/backend`
para saber mais sobre a nova implementação em node.

Agora temos apenas dois containers, um para a base de dados e outro para o aplicativo em si.

Da mesmo forma como fiz anteriormente, adicionei os pacotes de terceiro no repositório para permitir a
inicialização rápida do aplicativo. 

Execute o script em `start.sh` para iniciar o app, se ele falhar, é possível que tenhamos tentado criar as tabelas
antes de a base estar pronto, por favor espere uns instantes e execute-o novamente.
Para terminar a aplicação execute o script em stop.sh.

O aplicativo ficara disponível em http://localhost:3000.