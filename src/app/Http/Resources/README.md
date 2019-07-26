

#Resources

Servem para simplificar o mapeamento de atributos de modelos para a saída esperada de controles, retirando essa lógica deles.
São basicamente decoradores que sobrescrevem o método toArray dos modelos.

Temos dois **Resources** definidos em nossa aplicação, Tasks e Boards. Eu os utilizei para injetar o pseudo-atributo *self*,
que contém uma url identificadora do recurso em questão, serve para simplificar o funcionamento dos clientes da api. 