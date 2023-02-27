# Usa a imagem base do Node.js com a versão LTS (14.x)
FROM node:lts

# Define o diretório de trabalho como /app
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Executa as migrações do banco de dados no momento da construção da imagem
RUN npm run typeorm migration:run

# Expõe a porta 3333, que é a porta em que a aplicação NestJS será executada
EXPOSE 3333

# Define o comando para iniciar a aplicação NestJS
CMD ["npm", "run", "start"]
