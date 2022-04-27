#!/bin/bash

mysql -e "CREATE USER IF NOT EXISTS 'htran'@'localhost' IDENTIFIED BY 'Password123!';"
mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'htran'@'localhost';"