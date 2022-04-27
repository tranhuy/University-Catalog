FROM gitpod/workspace-mysql

RUN mysql -e "CREATE USER IF NOT EXISTS 'htran'@'localhost' IDENTIFIED BY 'Password123!';"