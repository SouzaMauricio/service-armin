FROM node:14
WORKDIR /var/www
ENTRYPOINT [ "npm", "run", "server" ]
EXPOSE 3003