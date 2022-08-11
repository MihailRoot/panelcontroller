FROM openjdk:8

RUN apt-get update -y && apt-get install curl ssh && 
    adduser --disabled-password --home /home/userfiles userfiles

USER userfiles

ENV USER=userfiles HOME=/home/userfiles

WORKDIR /home/userfiles
COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash","/entrypoint.sh"]