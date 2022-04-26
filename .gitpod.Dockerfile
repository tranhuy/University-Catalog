FROM gitpod/workspace-mysql

USER root

# Set up default config file for CLI to connect to the project DB
RUN echo "[mysql]" > /etc/mysql/conf.d/mysql.cnf
RUN echo "host=localhost" >> /etc/mysql/conf.d/mysql.cnf
RUN echo "user=htran" >> /etc/mysql/conf.d/mysql.cnf
RUN echo "password=Password123!" >> /etc/mysql/conf.d/mysql.cnf
RUN echo "database=db_university" >> /etc/mysql/conf.d/mysql.cnf