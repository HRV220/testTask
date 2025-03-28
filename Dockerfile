FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential python3

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
