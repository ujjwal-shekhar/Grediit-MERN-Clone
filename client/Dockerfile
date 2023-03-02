FROM node:18-bullseye-slim
 
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["npm", "start"]