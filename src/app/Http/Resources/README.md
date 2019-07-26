

#Resources

Servem para simplificar o mapeamento de atributos de modelos para a saída esperada de controles, retirando essa lógica deles.
Eles são basicamente decoradores que sobrescrevem o método toArray dos modelos.

Temos dois **Resources** definidos em nossa aplicação, Tasks e Boards. Eu os utilizei para injetar o pseudo-atributo *self*.
Este contém uma url que pode ser utilizada para recuperar esse recurso através da api. 