# Usar uma imagem oficial do Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar todo o restante da aplicação
COPY app/ ./app

# Definir a porta que a aplicação vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "app/index.js"]
