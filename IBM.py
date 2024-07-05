import pydoc
import mysql.connector
# connection_string = (
#     'DRIVER=MySQL;'
#     'SERVER=localhost;'
#     'DATABASE=ibmdata;'
#     'UID=root;'
#     'PWD=nanunani1234;'
# )
connection_string = {
    'host': 'localhost',
    'database': 'ibmdata',
    'user': 'root',
    'password': 'nanunani1234'
}

# Create a connection to the database
try:
    connection = mysql.connector.connect(**connection_string)
except mysql.connector.Error as err:
    print("Error connecting to database:", err)
    exit()
cursor = connection.cursor()
cursor.execute("SELECT * FROM ibmdata.`simulated dataset`;")
# for row in cursor.fetchall():
#     print(row)
rows=cursor.fetchall()
for row in rows:
    print(row)