FROM centos:7

RUN yum install -y epel-release
RUN yum update -y

RUN yum install -y wget && yum -y install initscripts && yum -y install supervisor && yum -y install which && yum clean all
RUN wget https://gist.githubusercontent.com/junthehacker/c3c7fa9495ae9276b195366749f85154/raw/a47d2574c48947109ddfeabd8a9e08e8477f5f80/mongodb-org-3.6.repo -P /etc/yum.repos.d

RUN yum install -y mongodb-org

RUN mkdir /data
RUN mkdir /data/db

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs
RUN yum groupinstall -y 'Development Tools'

RUN mkdir /src
WORKDIR /src
COPY . .

RUN npm install
RUN node deployment.js


RUN echo "[supervisord]" > /etc/supervisord.conf && \
    echo "nodaemon=true" >> /etc/supervisord.conf && \
    echo "" >> /etc/supervisord.conf && \
    echo "[program:mongod]" >> /etc/supervisord.conf && \
    echo "command=/usr/bin/mongod" >> /etc/supervisord.conf && \
    echo "" >> /etc/supervisord.conf && \
    echo "[program:ice-mc2]" >> /etc/supervisord.conf && \
    echo "directory=/src" >> /etc/supervisord.conf && \
    echo "command=node app.js" >> /etc/supervisord.conf

CMD ["/usr/bin/supervisord"]