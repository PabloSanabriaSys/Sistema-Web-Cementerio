from flask import Flask, jsonify, request
from flask_cors import CORS
from config import config
from routes import Difunto, Doliente, Nicho, Cremacion
from database.db import get_connection
from werkzeug.security import generate_password_hash, check_password_hash
from psycopg2 import sql
import hashlib

app = Flask(__name__)
CORS(app)

"""@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    texto_bytes = password.encode()
    
    # Crear un objeto hash MD5
    hash_obj_md5 = hashlib.md5()
    
    # Actualizar el objeto hash con el texto en bytes
    hash_obj_md5.update(texto_bytes)
    
    # Obtener el hash en formato hexadecimal
    hash_resultado_md5 = hash_obj_md5.hexdigest()
    print(hash_resultado_md5)
    connection = get_connection()

    # Insertar el nuevo usuario en la base de datos
    with connection.cursor() as cur:
        query = sql.SQL('INSERT INTO "Administrador" (username, email, password) VALUES ({},{}, {});').format(
            sql.Literal(username),
            sql.Literal(email),
            sql.Literal(hash_resultado_md5)
        )
        cur.execute(query)
        connection.commit()

    return jsonify({'message': 'User registered successfully'}), 201"""


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        texto_bytes=password.encode()    
        hash_obj_md5 = hashlib.md5()
        hash_obj_md5.update(texto_bytes)
        hash_resultado_md5 = hash_obj_md5.hexdigest()
            
        connection = get_connection()
            
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM "Administrador" WHERE username = %s',(username,))
            row = cursor.fetchone()

        if row[2]==email and  row[3]==hash_resultado_md5 :
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401

        
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


if __name__=='__main__':
    app.config.from_object(config['development'])

    # Blueprints
    app.register_blueprint(Difunto.main,url_prefix = '/api/difuntos')
    app.register_blueprint(Doliente.main,url_prefix = '/api/dolientes')
    app.register_blueprint(Nicho.main,url_prefix = '/api/nichos')
    app.register_blueprint(Cremacion.main,url_prefix = '/api/cremaciones')

    app.run()