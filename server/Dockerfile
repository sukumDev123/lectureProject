FROM ubuntu:16.04

MAINTAINER LectureProject

RUN apt-get update \ 
    && apt-get install -yqq git curl sudo \
    && apt-get clean 
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN npm install -g nodemon yarn &&  \ 
    mkdir /opt/lecture

WORKDIR /opt/lecture

COPY package.json /opt/lecture
RUN yarn

COPY . /opt/lecture

EXPOSE 3000

CMD [ "npm" , "start" ]