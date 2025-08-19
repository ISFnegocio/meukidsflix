# meukidsflix
App de Controle de Conteúdo Infantil - MVP
Este repositório contém o código-fonte e a documentação para o backend do aplicativo de Controle de Conteúdo Infantil. O objetivo é fornecer uma API segura para o aplicativo frontend (desenvolvido em Glide/Lovaleb) buscar vídeos do YouTube sem expor a chave da API publicamente.

🏛️ Arquitetura
A solução é dividida em duas partes principais:

Frontend (Glide/Lovaleb): O aplicativo móvel com o qual o usuário interage. Ele é responsável pela interface, autenticação de usuários, gerenciamento de assinaturas (via Play Billing) e exibição dos vídeos.

Backend Proxy (Node.js): Uma função serverless simples que atua como um intermediário seguro entre o app e a API de dados do YouTube. Toda a lógica de busca de vídeos é centralizada aqui para proteger a chave da API.

🚀 Backend Setup (Proxy Node.js)
O backend é uma aplicação Express.js mínima, projetada para ser implantada como uma função serverless (ex: Google Cloud Functions, Vercel, Netlify Functions).

Pré-requisitos
Node.js (versão 18 ou superior)

npm ou yarn

Passos para Configuração Local
Clone o repositório e navegue até a pasta backend:

git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_SEU_REPOSITORIO>/backend

Instale as dependências:

npm install

Configure a Chave da API do YouTube:
Crie um arquivo chamado .env dentro da pasta backend e adicione sua chave da API do YouTube.

Arquivo: .env

YT_API_KEY=SUA_NOVA_CHAVE_DA_API_AQUI

⚠️ Importante: Adicione .env ao seu arquivo .gitignore para nunca enviar suas chaves secretas para o repositório.

Inicie o servidor localmente:

npm start

O servidor estará rodando em http://localhost:3000 (ou outra porta, se configurado). Você pode testar a busca com uma URL como: http://localhost:3000/search?q=desenho+biblico

Implantação (Deployment)
Recomenda-se implantar esta aplicação em uma plataforma serverless:

Google Cloud Functions / Cloud Run

Vercel

Netlify Functions

Ao implantar, certifique-se de configurar a variável de ambiente YT_API_KEY nas configurações da sua plataforma de hospedagem, em vez de usar um arquivo .env.

📱 Frontend (Glide/Lovaleb)
O frontend deve ser construído seguindo o checklist detalhado no documento de planejamento. As chamadas de API para buscar vídeos devem ser direcionadas para a URL da sua função de backend implantada.

Exemplo de chamada no frontend:
https://SUA-FUNCAO-URL/search?q={palavra_chave_do_usuario}
