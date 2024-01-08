import psycopg2
from psycopg2 import DataError
from decouple import config

def get_connection():
    try:
        return psycopg2.connect(
            host = 'localhost',
            user = 'postgres',
            password = 'pablo21',
            database = 'cementerio_db_oficial',
            )
        
        """return psycopg2.connect(
            host = config('PGSQL_HOST'),
            user = config('PGSQL_USER'),
            password = config('PGSQL_PASSWORD'),
            database = config('PGSQL_DATABASE'),
        )"""
        """return psycopg2.connect(
            host = '192.168.0.177',
            user = 'postgres',
            password = 'pablo211',
            database = 'cementerio_db',
        )"""
    
    except DataError as ex:
        raise ex
    
    
def get_connection_notario():
    try:
        return psycopg2.connect(
            host = '192.168.114.219',
            user = 'postgres',
            password = '',
            database = 'notario',
            )
        
        """return psycopg2.connect(
            host = config('PGSQL_HOST'),
            user = config('PGSQL_USER'),
            password = config('PGSQL_PASSWORD'),
            database = config('PGSQL_DATABASE'),
        )"""
        """return psycopg2.connect(
            host = '192.168.0.177',
            user = 'postgres',
            password = 'pablo211',
            database = 'cementerio_db',
        )"""
    
    except DataError as ex:
        raise ex