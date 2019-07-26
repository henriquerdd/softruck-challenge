
#Controles

Se uma rota casa com um padrão definido no arquivo de rotas a requisição é enviada para um controle.
Nossa aplicação possui apenas dois controles, TasksAPIController e BoardsAPIController.

Ambos definem os seguintes métodos:

- all: retorna todos os recursos existentes
- store: cria uma novo recurso
- find: retorna um único recurso (se ele puder ser encontrado)
- update: atualiza um único recurso (se ele puder ser encontrado)
- destroy: exclui um recurso (se ele puder ser encontrado)

O controle de quadros ainda define mais um método *tasks*  que retorna todas as tarefas pertences a um quadro.