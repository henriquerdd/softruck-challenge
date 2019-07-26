
Para realizar a tarefa decidi utilizar o laravel pois é o framework que mais conheço, logo o backend foi implementado em php.

Já o frontend foi feito utilizando react. Decidi utiliza-lo para mostrar que tenho alguma noção de como o mundo node funciona, apesar
de não ser minha especialidade.

Utilizei o nginx para servir a aplicação, o php-fpm para interpretar o código php e o mysql como base de dados.

A aplicação em sí se encontra no diretório src. O frontend está em src/resources/js, o laravel coloca o código
javascript aqui por padrão, preferi não mexer nisso. O backend está espalhado em diversos diretórios (novamente eu não mexi na organização padrão do laravel),
o código que nos interessa está nos seguintes lugares:

- src/routes: O arquivo **web** contém nossa rota web padrão. Os endpoints da api estão definidos no arquivo **api**.
- src/app/Models: Aqui estão definidos nossos dois modelos **Tasks** e **Boards**. Eles servem de interface para as informações salvas na base de dados.
- src/app/Http/Controllers: Aqui estão definidos os controlles da api, eles são responsáveis por realizar as operações definidas na api.
- src/app/Http/Requests: Aqui temos a validação dos parâmetros, por padrão antes de deixar que a requisição chegue ao controlador ela passa por aqui. 
- src/app/Http/Resources: Utilizei essas estruturas para mapear a interface dos modelos na interface de saída da api.
- src/tests: Aqui ficam os arquivos de testes.

Aqui fiz apenas um resumo sobre onde ficam as partes mais importantes dessa aplicação. Mas dentro de cada um desses repositórios deixarei 
um README detalhando mais sobre como cada um deles funciona (frontend incluso).

Normalmente pacotes de terceiros não são adicionados ao repositório, nem arquivos de configuração, mas para simplificar
a execução do app dessa vez deixarei tudo pronto de forma que somente será necessário instalar o [docker](https://docs.docker.com/install/), o [docker-compose](https://docs.docker.com/compose/install/), e executar o arquivo start.sh que está nesse diretório. A aplicação poderá então ser acessada no localhost na porta 80.

Se por acaso o comando de inicialização falhar possivelmente é porque a base ainda estava sendo criada quando tentamos criar as tabelas, espere alguns instantes e execute o comando novamente ou 
apenas o comando para criar as tabelas.

```
docker-compose run -u $UID --entrypoint "php artisan migrate" svc-php-fpm
```