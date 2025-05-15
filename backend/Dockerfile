FROM node:18.9.1

WORKDIR /app

COPY package.json .

RUN npm install

# Cài nodemon 
RUN npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

