# Twitter Bot to spread my Critical Role Agenda

[Baseado no repositório de jcserracampos](https://github.com/jcserracampos/100diasdecodigo_bot)

## Como utilizar
Primeiramente, crie uma nova aplicação em https://apps.twitter.com/.
Depois de criada a aplicação, solicite um novo __access token__ para sua conta.

Com essas informações, crie um arquivo `.env` na raiz do projeto com a seguinte formatação.

    CONSUMER_KEY=
    CONSUMER_SECRET=
    ACCESS_TOKEN=
    ACCESS_TOKEN_SECRET=

As chaves inseridas devem ser as obtidas no passo anterior.

Instale as dependências com `npm install`.

Finalmente, execute `npm start`.

## Deploy no heroku
Existe um Procfile configurado para este bot funcionar como um worker no heroku.
A versão gratuita atende bem, dependendo do volume de webhooks recebidos.

As chaves devem ser inseridas como variáveis de configuração no Heroku.

Você pode ver o log do deploy através do comando `heroku logs --tail -a <heroku application name>`
