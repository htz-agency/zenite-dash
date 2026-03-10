Usar visibilidade de zona dinâmica
Aplica-se a: Tableau Cloud, Tableau Desktop, Tableau Server
O espaço do painel é valioso, especialmente quando você deseja revelar progressivamente insights sobre dados. Com a visibilidade de zona dinâmica, você pode ocultar ou revelar zonas (elementos de painel lado a lado ou flutuantes) com base no valor de um campo ou parâmetro. Conforme você interage, as zonas em seu painel aparecem ou desaparecem. O resultado é um painel dinâmico que não compromete o layout desejado.

Embora você possa mostrar ou ocultar objetos clicando em um botão em um painel, a visibilidade da zona dinâmica permite mostrar e ocultar objetos automaticamente. Isso é ideal para painéis usados​por diferentes grupos de usuários. Por exemplo, você pode querer mostrar diferentes zonas de grupos de usuários diferentes quando eles visitam seu painel.

E você pode usar a visibilidade de zona dinâmica com Ações de parâmetros. Por exemplo, quando um usuário clica em uma marca em uma visualização, uma zona anteriormente oculta é exibida. Isso é ideal para painéis complexos porque permite que você escolha quando níveis mais profundos de dados são revelados.

Tipos de campos compatíveis
Para ser usado para visibilidade de zona dinâmica, um campo ou parâmetro deve ser:

Booleano.
Valor único.
Independente da visualização, o que significa que o campo retorna um valor constante independente da estrutura da visualização, como um cálculo de nível de detalhe fixo (LOD).
Configurar uma zona de painel dinâmico
O exemplo a seguir tem duas planilhas que usam dados Superstore: a primeira planilha tem um gráfico de barras com Vendas por categoria e a segunda planilha tem um gráfico de barras com Vendas por subcategoria. Ao usar a visibilidade da zona dinâmica, a segunda planilha fica visível somente depois que uma marca é clicada na zona Vendas por categoria. Este exemplo se baseia em um campo calculado booleano, que é usado como campo de origem para uma ação de parâmetro. Para que o cálculo seja utilizado como campo de origem para a ação do parâmetro, o cálculo deve ser adicionado ao cartão de marcas.

Na planilha Vendas por categoria, criar um parâmetro. Neste exemplo, o parâmetro Tipo de dados deve ser definido como Booleano.
Na planilha Vendas por categoria, crie um campo calculado. Este exemplo usa o seguinte cálculo: True
Na planilha Vendas por categoria, arraste o cálculo que você criou para Detalhes no cartão de marcas.
Crie um painel.
Arraste a planilha que você sempre deseja que fique visível em seu painel. Em nosso exemplo, queremos que Vendas por categoria seja visível.
No painel, clique na zona Vendas por categoria (objeto do painel). Em seguida, no menu Planilha em seu painel, crie uma ação de parâmetro. Este exemplo usa a seguinte ação Alterar parâmetro:
A planilha de origem é definida para usar o painel que você criou e a planilha Vendas de categoria.
O Parâmetro de destino é o parâmetro que você criou.
O Campo de origem é o cálculo que você criou.
Uma ação de parâmetro configurada conforme descrito no texto que precede esta imagem
Arraste a planilha Vendas por subcategoria para o seu painel.
Clique na zona Vendas por categoria. No canto superior direito, clique na seta suspensa e selecione Usar como filtro.
Clique na zona Vendas por subcategoria e, em seguida, clique na guia Layout.
Marque a caixa Controlar visibilidade usando valor.
Na lista suspensa, escolha o parâmetro que você criou para controlar a visibilidade da zona.
Observação: se a opção Controlar visibilidade usando valor não contiver o campo que você deseja usar, certifique-se de que o campo seja um tipo compatível.

A caixa "Controlar visibilidade usando valor" é marcada e um parâmetro chamado "Ocultar zona com parâmetro" é selecionado

Agora, quando você clica em uma marca de categoria na zona Vendas por categoria, a zona Vendas por subcategoria aparece no painel.

Uma animação de clicar em uma marca em um painel que faz com que outro gráfico apareça usando a visibilidade da zona dinâmica

Entender as limitações e os casos extremos
A visibilidade de zona dinâmica não funciona ao usar a planilha em Histórias (uma sequência de visualizações que funcionam juntas para transmitir informações).