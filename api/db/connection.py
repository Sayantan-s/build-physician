from peewee import PostgresqlDatabase
from config import DB_URI

# Create the database connection
db = PostgresqlDatabase(DB_URI)
