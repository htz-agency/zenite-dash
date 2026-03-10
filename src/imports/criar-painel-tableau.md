Criar um painel
Aplica-se a: Tableau Cloud, Tableau Desktop, Tableau Server
Depois de criar uma ou mais planilhas, é possível combiná-las em um painel, adicionar interatividade e muito mais.

Dica: para configurar e começar a usar rapidamente, consulte Use aceleradores para visualizar dados rapidamente.

Criar um painel e adicionar ou substituir planilhas
Um painel e uma planilha nova são criados da mesma forma.

Na parte inferior da pasta de trabalho, clique no ícone Novo painel:
O ícone Novo painel.

Na lista Planilhas à esquerda, arraste as exibições para o painel à direita.
Visualização com a planilha de Previsão destacada e uma seta indicando que ela pode ser arrastada para a visualização.

Para substituir uma planilha, selecione-a no painel à direita. Na lista Planilha à esquerda, passe o mouse sobre a planilha de substituição e clique no botão Trocar planilhas.
Opção para trocar planilhas no Painel do Tableau.

Observação: ao substituir uma planilha, o Tableau mantém todos os preenchimentos, bordas ou cores de fundo. No entanto, talvez seja necessário ajustar o tamanho da planilha se o conteúdo for significativamente diferente. Também pode ser necessário excluir itens de painel específicos à planilha anterior, como filtros, que ficam em branco.

Adicionar interatividade
É possível adicionar interatividade aos painéis para aprimorar as informações de dados dos usuários. Tente estas técnicas:

No canto superior da planilha, habilite a opção Usar como filtro para usar marcas selecionadas na planilha como filtros para outras planilhas do painel.
Um mapa do nordeste dos Estados Unidos no Tableau Cloud com estados codificados por cores em azul e laranja, exibidos com a opção de usar como filtro.

Ao criar no Tableau Desktop, adicione ações para usar várias planilhas como filtros, navegue de uma planilha para outra, exiba páginas da Web e muito mais. Para obter detalhes, consulte Ações e painéis.
Adicionar objetos de painel e definir suas opções
Além de planilhas, é possível adicionar objetos de painel, que melhoram a aparência e adicionam interatividade. A seguir encontram-se instruções sobre cada tipo:

Objetos Horizontais e Verticais fornecem contêineres de layouts que permitem agrupar objetos relacionados e ajustar como o painel é redimensionado quando os usuários interagem com ele.
Os objetos de Texto fornecem cabeçalhos, explicações e outras informações.
Observação: a formatação rich text compatível com hiperlinks dinâmicos em uma caixa de texto é compatível apenas com a Web.

Objetos de Imagem incrementam o visual de um painel, e você pode vinculá-los a URLs de destino específicas. (Embora os objetos de página da Web também possam ser usados para imagens, eles são melhores para páginas da Web completas. O objeto Imagem fornece opções específicas de ajuste, link e texto alternativo para imagens.)
Os objetos de Página da Web exibem páginas de destino no contexto do painel. Certifique-se de consultar estas opções de segurança na Web, e fique atento, pois algumas páginas da Web não permitem que sejam inseridas—o Google é um exemplo.
Observação: por razões de segurança, o administrador do Tableau pode impedir que objetos da Página da Web e Imagem exibam URLs de destino.

Objetos Em branco ajudam a ajustar o espaçamento entre os itens do painel.
Os objetos de Navegação permitem que o público-alvo navegue de um painel para o outro ou para outras planilhas ou histórias. Você pode exibir texto ou uma imagem para indicar o destino do botão para seus usuários, especificar as cores personalizadas da borda e do fundo e fornecer dicas de ferramentas informativas.
Baixar objetos permite que o público crie rapidamente um arquivo PDF, um slide do PowerPoint ou uma imagem PNG do painel inteiro, ou uma tabela de referência cruzada das planilhas selecionadas. As opções de formatação são semelhantes aos objetos de Navegação.
Observação: o download da tabela de referência cruzada só é possível após a publicação no Tableau Cloud ou no Tableau Server.

Os objetos de Extensão permitem adicionar recursos exclusivos a painéis ou integrá-los a aplicativos fora do Tableau.
Os objetos de Métrica do Pulse permitem que você incorpore cartões de métricas existentes no seu painel. As métricas que você pode adicionar estão conectadas às mesmas fontes de dados publicadas que são usadas pela pasta de trabalho.
Adicionar um objeto
Na seção Objetos à esquerda, arraste Imagem até o painel à direita:

Seta que mostra como adicionar uma página da Web a um painel.

Copiar objetos
Você pode copiar e colar objetos no painel atual ou de painéis em outras planilhas e arquivos. Você pode até copiar objetos entre o Tableau Desktop e o Tableau em seu navegador da Web.

Você não pode, entretanto, copiar o seguinte:

Planilhas em um painel
Itens que dependem de uma planilha específica, como filtros, parâmetros e legendas
Faça o layout de contêineres com algo que você não pode copiar dentro deles, como uma folha ou filtro
Objetos em um layout de dispositivo
Títulos de painel
Dica: além dos comandos de menu descritos abaixo, você também pode usar os atalhos de teclado padrão para copiar e colar em seu sistema operacional.

Selecione um objeto do painel e, no menu de objetos, selecione Copiar item do painel. Ou no menu principal, selecione Painel > Copiar item do painel selecionado.
Menu de contexto do objeto do painel expandido com a opção Copiar item do painel selecionada.

Vá para o painel onde deseja colar o objeto. Em seguida, não selecione nada para colar no canto superior esquerdo do painel ou selecione um item existente para colar ao lado.
No Tableau Desktop, escolha Arquivo > Colar. Em um navegador, escolha Editar > Colar ou use o atalho do teclado para colar.
O objeto é colado 10 pixels abaixo e à direita do canto superior esquerdo do painel ou do objeto selecionado. Para mover o objeto colado, arraste o identificador na parte superior.
Copie ou mova a barra destacada em um painel.

Observação: os botões Mostrar/Ocultar copiados podem ter como alvo o objeto original ou ser desativados. Para obter instruções sobre como consertar isso, consulte Mostrar e ocultar objetos clicando em um botão.

Definir opções para objetos
Clique no do objeto e selecione-o. Em seguida, clique na seta no canto superior para abrir o menu de atalho. (As opções de menu variam dependendo do objeto.)

Menu de contexto de visualização em um painel.

Opções detalhadas para objetos de imagem
Com o objeto Imagem, você pode inserir arquivos de imagem em painéis ou criar um link para imagens postadas na Web. Em ambos os casos, você pode especificar uma URL em que a imagem abre quando clicada, adicionando interatividade ao seu painel.

Observação: as URLs para imagens baseadas na Web requerem o prefixo HTTPS para maior segurança. Para URLs de imagem com outros prefixos, use o objeto Página da Web.

Na seção Objetos à esquerda, arraste um objeto Imagem para o painel à direita. Ou, em um objeto Imagem existente em um painel, clique no menu pop-up no canto superior e escolha Editar imagem.
Clique em Inserir arquivo de imagem para incorporar um arquivo de imagem à pasta de trabalho ou Vincular para imagem para vincular a uma imagem baseada na Web.
Considere criar um link para uma imagem baseada na Web quando:

A imagem é muito grande e o público do painel a visualizará em um navegador. (Ao contrário das imagens baseadas na Web, as imagens inseridas devem ser baixadas sempre que uma planilha é aberta, reduzindo o desempenho.)
A imagem é um arquivo GIF animado. (As imagens inseridas não aceitam GIFs animados.)
Caixa de diálogo Editar objeto de imagem.

Se você estiver inserindo uma imagem, clique em Escolher para selecionar o arquivo. Se você estiver criando um link para uma imagem, insira o URL da Web.
Defina o ajuste de imagem restante, link de URL e opções de texto alternativo. (O texto alternativo descreve a imagem em aplicativos de leitura de tela para melhorar a acessibilidade.)
Opções detalhadas para objetos de Navegação e Download
Os objetos de Download têm várias opções exclusivas que ajudam a indicar visualmente o destino de navegação ou formato de arquivo.

Exemplo de um botão de texto do painel que sobrepõe um mapa dos Estados Unidos com o seguinte texto: abra a visualização de atrasos de voos.

Um botão de navegação usando texto como o estilo de botão

No canto superior do objeto, clique no menu do objeto e escolha Editar botão.
Menu de botões expandido e a opção Editar botão selecionada.

Execute um destes procedimentos:
No menu Navegar até, escolha uma planilha fora do painel atual.
No menu Exportar para, escolha um formato de arquivo.
Escolha imagem ou texto para o Estilo de botão, especifique a imagem ou o texto que deseja exibir e defina as opções de formatação relacionadas.
Para Texto da dica de ferramenta, adicione um texto explicativo para aparecer quando os visualizadores passam o mouse sobre o botão. Esse texto é opcional e normalmente é usado melhor com botões de imagem. (Por exemplo, você pode inserir "Abrir visualização de vendas" para esclarecer o destino de um botão de navegação que é exibido como um gráfico de vendas em miniatura.)
Observação: ao visualizar um painel publicado, clicar em um botão navega e exporta. No entanto, ao criar um painel, você precisa pressionar Alt (Windows) ou Option (macOS).

Mostrar e ocultar objetos clicando em um botão
Os botões Mostrar/Ocultar permitem que os visualizadores do painel alternem a visibilidade de objetos de painel, exibindo-os apenas quando necessário.

Como os objetos ocultos afetam os layouts
Quando um objeto flutuante está oculto, ele simplesmente revela quaisquer objetos abaixo dele. Os botões Mostrar/Ocultar são particularmente úteis quando você deseja ocultar temporariamente um grupo flutuante de filtros para exibir mais detalhes de uma visualização.

Um contêiner de painel flutuante oculto para mostrar mais da visualização.

Quando um objeto em bloco está oculto, os resultados dependem do nível do objeto na hierarquia de layout.

Na maioria dos casos, você desejará colocar os objetos que planeja ocultar em um contêiner de layout Horizontal ou Vertical, porque os objetos ocultos terão o espaço preenchido por outros objetos no contêiner.
Por outro lado, no contêiner de layout em bloco no topo da hierarquia de layout, um objeto oculto deixa um espaço em branco para trás.
Adicionar e configurar um botão Mostrar/Ocultar
Selecione um objeto do painel.
No menu suspenso no canto superior do contêiner, selecione Adicionar botão mostrar/ocultar.
Menu de contexto do contêiner do painel com opção para Adicionar botão mostrar/ocultar.

No menu Botão, escolha Editar botão.
Menu de contexto com opção para Editar botão.

Configure estas opções:
O Item do painel para mostrar/ocultar especifica o objeto de destino. (Um objeto pode ser o destino de apenas um botão Mostrar/Ocultar por vez. Escolha Nenhum se quiser direcionar o objeto com outro botão Mostrar/Ocultar.)
Estilo do botão especifica se a imagem ou o texto é exibido para o botão.
Aparência do botão especifica a aparência do botão quando o item é mostrado e ocultado. Clique em Item exibido e Item oculto para escolher imagens ou texto diferentes para cada estado.
O Texto da dica de ferramenta fornece um texto explicativo exibido quando os visualizadores passam o mouse sobre o botão. (Por exemplo, você pode inserir "Mostrar ou ocultar filtros" para um contêiner com menus de filtro.)
Se necessário, arraste o botão para um local diferente ou redimensione-o para ajustá-lo melhor ao layout.
Observação: ao exibir um painel publicado, clicar em um botão Mostrar/Ocultar alterna a visibilidade do objeto. No entanto, ao criar um painel, você precisa pressionar Alt (Windows) ou Option (macOS).

Segurança para objetos de Página da Web
Se você incluir objetos da Página da Web no painel, poderá otimizar a segurança fazendo o seguinte.

Usar o protocolo HTTPS quando possível
É uma prática recomendada usar HTTPS (https://) em suas URLs. Isso assegura que a conexão de seu painel com a página da Web seja criptografada. Além disso, se o Tableau Server estiver executando HTTPS e usar HTTP na URL, os navegadores de seus usuários não conseguirão exibir a página da Web para qual a URL aponta. Se não especificar um protocolo, será estabelecido o HTTP.

Opções de segurança para objetos de Página da Web (somente Tableau Desktop)
Escolha Ajuda > Configurações e desempenho > Definir segurança de exibição da Web no painel e defina as opções a seguir. (Em algumas organizações, essas opções são controladas em todas as máquinas por um administrador do Tableau.)

Observação: quaisquer alterações que você fizer nessas opções de segurança se aplicam a objetos da página da Web existentes e recém-criados.

Habilitar JavaScript Permite o suporte a JavaScript na exibição da Web. Se você desmarcar essa opção, algumas páginas da Web que requerem JavaScript poderão não funcionar corretamente no painel.
Habilitar plug-ins Habilita qualquer plug-in utilizado pela página da Web, como Adobe Flash ou Quick Time Player.
Bloquear pop-ups Quando selecionado, bloqueia pop-ups.
Ativar ações de focalizar URLPermite que as ações de focalizar a URL. Para obter mais informações, consulte Ações de URL.
Habilitar objetos de página da Web e imagens da Web Permite a exibição de URLs de destino na página da web e objetos de imagem. Se você desmarcar essa opção, os objetos Página da Web e os objetos Imagem com link para a Web permanecem no painel, mas não mostram nenhum conteúdo.