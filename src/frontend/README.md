
#App

O frontend da nossa aplicação está definido no arquivo app.js.
Nele é possível ver como as rotas são mapeadas em nossos componentes.

#ApiClient

Todos os componentes são injetados com o cliente da nossa api, ele é responsável por simplificar o acesso aos nossos endpoints.

#Componentes

##TasksList

Como o nome sugere esse componente é responsável por listar as tarefas existentes, ele também possui um link para a tela de criação de tarefas.
É aqui também que conseguimos editar e excluir tarefas, através de botões que cada uma delas possui em sua guia **Ações**.

#TasksCreator

Esse componente nos permite criar novas tarefas. Para criar uma tarefa precisamos fornecer um nome e um descrição (opcional). 
Ao ser criada uma tarefa recebe o estado padrão de **PENDENTE**.

#TasksChanger

Responsável por editar tarefas existentes, esse é o único lugar no qual podemos alterar seus estados, aceitando-as ou finalizando-as (ou tornando-as pendentes de novo).
Essa tela também serve para visualizar uma única tarefa, aqui não vemos seus timestamps (como eles não devem ser alterados preferi não exibi-los).

##BoardsList

Aqui podemos selecionar qual quadro desejamos ver. Ao selecionar um dos quadros disponiveis será possível ver quais tarefas pertencem a ele, seu nome
sua descrição (no hint do nome) editá-lo e excluí-lo. Para editar o quadro basta clicar em seu nome. As ações exibidas para cada uma das tarefas do quadro
funcionam exatamente como as da tela de tarefas, ou seja, clicar no botão de excluir não remove a tarefa do quadro mas sim remove-a da base. Para remover uma tarefa de um quadro
é necessário editá-lo.

#BoardsCreator

Aqui podemos criar um novo quadro. Para isto basta fornecer um nome, uma descrição (opcional) e um conjunto de tarefas (opcional).

#BoardsChanger

Esse componente permite alterar um quadro, atualizar seu nome, descrição e quais tarefas pertencem a ele.