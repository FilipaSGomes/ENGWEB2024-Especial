Primeiro corrigi o dataset com seguinte site: https://jsonformatter.curiousconcept.com/#

Adicionou-se um campo _id em todos os objetos "Lista" e nos objetos "produto" foi adicionado um _id através de um script python

a porta do mongo db é a 5000

$ docker compose up -d

$ docker cp ../ExameEpocaEspecial/listas.json mongo:/tmp

-- para as querias

$ docker exec -it mongo bash

mongoimport -d compras -c listas /listas.json --jsonArray

mongosh

show dbs

use compras
----



para testar o ex1
cd ex1
npm i
npm start

para testar o ex2
cd ex2
npm i
npm start

ou utilizar o docker compose disponibilizado




