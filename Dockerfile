FROM node:6.9.1-alpine

ENV NAME web
ENV USER web

RUN apk update && apk upgrade && \
    apk add --no-cache --update bash git openssh python build-base

RUN npm install -g yarn

RUN addgroup $USER && adduser -s /bin/bash -D -G $USER $USER

USER $USER
WORKDIR /home/$USER

COPY ./package.json /home/$NAME/package.json
RUN cd /home/$NAME && yarn

COPY . /home/$NAME

EXPOSE 5000

RUN ls
CMD npm run start-dev