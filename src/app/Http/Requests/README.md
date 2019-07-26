
#Requests

Nesse diretório são armazenadas estruturas chamdas de FormRequests, eles servem para auxiliar na autorização e validação de requisições
para que não seja necessário encher nossos controles com essa lógica.

Todos eles possuem os métodos chave: *authorize* e *rules*. Se authorize retorna false a requisição é interrompida e um 403 é retornado.
Rules deve retornar um array contendo as regras as quais os paramêtros devem satisfazer para que a requisição chegue ao controle, caso alguma regra falhe 
o estado 422 é retornado automaticamente informando quais as regras que falharam.

Nessa aplicação foram utilizados 4 FormRequests:

- CreateTasksRequest
- UpdateTasksRequest
- CreateBoardsRequest
- UpdateBoardsRequest

A seguir detalharei as regras em cada um deles.

#CreateTasksRequest:

```

public function rules()
{
    return [
        'name' => 'required|string',
        'description' => 'nullable|string'
    ];
}

```

- required: O parâmetro deve estar presente na requisição.
- string: O parâmetro deve ser uma string.
- nullable: O parâmetro deve estar presente na requisição mas pode ser nulo.

#UpdateTasksRequest

```

public function rules()
{
    return [
        'name' => 'sometimes|string',
        'description' => 'sometimes|string',
        'status' => 'sometimes|in:PENDING,ACCEPTED,FINISHED'
    ];
}

```

- sometimes: O parâmetro é opcional.
- in:VALUE1,VALUE2: O parâmetro pode tomar algum dos valores VALUE1, VALUE2.

#CreateBoardsRequest

```

public function rules()
{
    return [
        'name' => 'required|string',
        'description' => 'nullable|string',
        'tasks' => 'sometimes|array',
        'tasks.*' => function ($attribute, $value, $fail) {

            if (!preg_match(self::TASK_PATTERN, $value)) {
                $fail("Unknown task '$value'");
            }
        }
    ];
}

```

- array: O parâmetro deve ser um array.

Regras customizadas podem ser definidas com uma closure que recebe 3 paramêtros:

- $attribute: O nome do parâmetro sob validação.
- $value: Seu valor.
- $fail: Um callback que deve ser invocado com uma mensagem apropriada caso a validação falhe.

Aqui estou validando o formato de cada item no array para ver se eles respeitam o formato de um identificador de tarefas (/tasks/{uuid}).

#UpdateBoardsRequest

```

public function rules()
{
    return [
        'name' => 'sometimes|string',
        'description' => 'sometimes|string',
        'tasks' => 'sometimes|array',
        'tasks.*' => function ($attribute, $value, $fail) {

            if (!preg_match(self::TASK_PATTERN, $value)) {
                $fail("Unknown task '$value'");
            }
        }
    ];
}

```

Aqui não temos nenhuma regra nova.