# FinanceCGX

FinanceCGX é um sistema desenvolvido para exibir dados econômicos brasileiros com base em APIs externas. Ele consome dados de diversas fontes como o IBGE, World Bank e ExchangeRateAPI para mostrar informações sobre o PIB brasileiro, PIB per Capita, taxa de câmbio e outros indicadores econômicos. O projeto é uma aplicação web responsiva, feita com **Vite + React**, que apresenta esses dados de forma visual e interativa.

## Tecnologias Utilizadas

- **React**: Para construção da interface do usuário.
- **Vite**: Para bundling e desenvolvimento rápido.
- **Recharts**: Para visualização de dados através de gráficos.
- **API do IBGE**: Para obter dados do PIB brasileiro.
- **API do World Bank**: Para obter dados populacionais do Brasil.
- **API ExchangeRateAPI**: Para obter a taxa de câmbio do dólar.
- - **API do ReactIcons**: Para obter os ícones do github e do whatsapp.

## Funcionalidades

- **Exibição do PIB Total e PIB per Capita**: O sistema exibe o PIB total do Brasil e o PIB per capita, calculando o valor em dólares com base na taxa de câmbio.
- **Gráficos Interativos**: Utilizando o **Recharts**, o sistema exibe gráficos interativos que mostram a evolução do PIB e PIB per capita ao longo dos anos.
- **Tabela de PIB**: O sistema também exibe uma tabela com os valores históricos do PIB total e PIB per capita por ano.
- **Responsividade**: A aplicação é responsiva e oferece uma experiência fluida tanto em dispositivos móveis quanto em desktops.

## Como Rodar o Projeto
  yarn install
  yarn dev ou yarn build
### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado na sua máquina.
  Você pode verificar a instalação do Node.js com o comando:
  ```bash
  node -v
