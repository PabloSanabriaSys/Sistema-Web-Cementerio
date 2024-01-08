from flask import Blueprint, jsonify, request
from  models.DolienteModel import DolienteModel

from models.entities.Doliente import Doliente

main = Blueprint('doliente_blueprint',__name__)

@main.route('/')
def get_dolientes():
    try:
        dolientes = DolienteModel.get_dolientes()
        return dolientes
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
    
@main.route('/<id>')
def get_doliente(id):
    try:
        doliente = DolienteModel.get_doliente(id)
        if doliente is not None:
            return jsonify(doliente)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
@main.route('/ci/<ci>')
def get_doliente_ci(ci):
    try:
        doliente = DolienteModel.get_doliente_ci(ci)
        if doliente is not None:
            return jsonify(doliente)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    

@main.route('/add', methods=['POST'])
def add_doliente():
    try:
        data = request.get_json()

        nuevo_doliente = Doliente(
            id_doliente=None,
            nombre=data.get('nombre'),
            apellido_paterno=data.get('apellido_paterno'),
            apellido_materno=data.get('apellido_materno'),
            carnet=data.get('carnet'),
            numero_celular=data.get('numero_celular')
        )

        new_doliente = DolienteModel.add_doliente(nuevo_doliente)

        return jsonify(new_doliente), 201

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
    
      
@main.route('/delete/<id>',methods=['DELETE'])
def delete_doliente(id):
    try:
        affected_rows = DolienteModel.delete_doliente(int(id))
        if affected_rows == 1:
            return jsonify(id)
        
        return jsonify({'message':'Doliente no eliminado'}),500
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500