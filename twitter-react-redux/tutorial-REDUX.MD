# Tutorial de config do REDUX

## 1- Instalação
    - `npm install --save redux`

## 2- Configurar a nossa Store
    - Criar um arquivo de configuração
    - Criar a Store (`createStore`)
    - Importá-la em nosso arquivo principal (`index.js`)
    - Criar a base da store

## 3- Adicionar Actions
    - Receber uma action no reducer
    - Tratar as minhas actions

### Recomendações do redux
    - criar um novo state, nunca modificar o state atual
    - sempre retornar o novo estado ou o estado atual caso não haja mudanças
    - Actions sempre devem ter `type`

## 4 - Tornar a store privada
    - Usaremos um facilitador
    - Instalar: `npm install --save react-redux` 
    - Prover a store para os componentes (usar o `Provider`)