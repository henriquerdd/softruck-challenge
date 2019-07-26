
#Controles

Se uma rota casa com um padrão definido no arquivo de rotas a requisição é enviada para um controle.
Nossa aplicação possui apenas dois controles, TasksAPIController e BoardsAPIController.

Ambos definem os seguintes métodos:

- all: retorna todos os recursos existentes
- store: cria uma novo recurso
- find: retorna um único recurso
- update: atualiza um único recurso
- destroy: exclui um recurso

O controle de quadros ainda define mais um método *tasks*  que retorna todas as tarefas pertences a um quadro.