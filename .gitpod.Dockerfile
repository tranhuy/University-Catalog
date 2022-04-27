FROM gitpod/workspace-mysql

RUN mysql
RUN CREATE USER IF NOT EXISTS 'htran'@'localhost' IDENTIFIED BY 'Password123!';