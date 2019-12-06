FROM nginx:latest

MAINTAINER tree

COPY ./build /usr/share/nginx/html

EXPOSE 80
