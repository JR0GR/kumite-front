FROM node:lts-alpine as build

WORKDIR /app
COPY . .
RUN npm install -g @ionic/cli
RUN npm install
RUN ionic build --prod
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]