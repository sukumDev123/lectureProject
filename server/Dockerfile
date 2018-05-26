FROM ubuntu:16.04

EXPOSE 80 443 3000

ENV NODE_ENV development

RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 git \
 ssh \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 sudo \
 apt-utils \
 nginx \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN npm i -g nodemon pm2 yarn 


WORKDIR /opt/lecture
COPY . /opt/lecture
RUN yarn

CMD npm start
