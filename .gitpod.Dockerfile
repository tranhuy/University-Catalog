FROM gitpod/workspace-mysql

RUN echo "host=localhost" >> /etc/mysql/conf.d/mysql.cnf
RUN echo "user=htran" >> /etc/mysql/conf.d/mysql.cnf
RUN echo "password=Password123!" >> /etc/mysql/conf.d/mysql.cnf
RUN echo "database=db_university" >> /etc/mysql/conf.d/mysql.cnf