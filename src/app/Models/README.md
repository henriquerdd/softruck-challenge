
#Modelos

Temos apenas dois models **Tasks** e **Boards** eles representam respectivamente nossa tarefas e quadros.

##Tasks

Uma tarefa possui os sguintes atributos:

- name: Nome da tarefa (obrigatório)
- description: Descrição (opcional)
- state: Estado, pode ter um dos seguinte valores: PENDING, ACCEPTED e FINISHED.
- createdAt: Timestamp de criação da tarefa.
- updatedAt: Timestamp de atualização da tarefa.
- uuid: Identificador único, não númerico, utilizado para não vazar informações sobre a base.

##Boards

Um quadro possui os sguintes atributos:

- name: Nome do quadro (obrigatório)
- description: Descrição (opcional)
- createdAt: Timestamp de criação da tarefa.
- updatedAt: Timestamp de atualização da tarefa.
- uuid: Identificador único, não númerico, utilizado para não vazar informações sobre a base.

Temos uma tabela intermediária chamada board_tasks que relaciona um quadro a zero ou mais tarefas, os modelos definem esse relacionamento através dos métodos: boards() em Tasks e tasks() em 
Boards, dessa forma é fácil determinar quais tarefas pertencem a que quadro e quais quadros possuem determinada tarefa.