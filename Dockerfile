# Dockerfile for React frontend
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#이 Dockerfile은 두 단계로 나누어져 있습니다:

#1.빌드 단계: Node.js를 사용하여 애플리케이션을 빌드합니다.
#2.런타임 단계: Nginx를 사용하여 빌드된 파일을 서빙합니다.**/