
#App

O frontend da nossa aplicação está definido no arquivo app.js.
Nele é possível ver como as rotas são mapeadas em nossos componentes.
Agora temos apenas '4' rotas possíves, não temos mais uma tela específica para
a criação de tarefas, essa operação agora se encontra nas telas dos próprios quadros.
Essa mudança aconteceu pois a modelagem mudou e agora podemos colocar uma tarefa em apenas um quadro.

#ApiClient

Todos os componentes são injetados com o cliente da nossa api, ele é responsável por simplificar o acesso aos nossos endpoints.

#Componentes

#Header

Contém o título da lista de quadros e um botão que permite acessar a tela de criação de quadros (a direita).

#SideMenu

Aqui ficam listados os quadros existentes. Para acessar os dados de um quadro, basta clicar em seu nome.

##TasksList

Esse componente não tem mais uma tela prória, ele está contido nas dos quadros. E serve para listar suas tarefas como o próprio nome sugere.

#TasksChanger

Responsável por editar tarefas existentes, esse é o único lugar no qual podemos alterar seus estados, aceitando-as ou finalizando-as (ou tornando-as pendentes de novo).
Essa tela também serve para visualizar uma única tarefa, aqui não vemos seus timestamps (como eles não devem ser alterados preferi não exibi-los).

#BoardsCreator

Aqui podemos criar um novo quadro. Para isto basta fornecer um nome e uma descrição (opcional). Inicialmente o quadro é criado sem nenhuma tarefa,
essas podem ser adicionadas na sua própria tela.

#BoardsChanger

Esse componente permite atualizar um quadro (seu nome/descrição), para acessá-lo basta clicar no título do quadro em sua tela principal.