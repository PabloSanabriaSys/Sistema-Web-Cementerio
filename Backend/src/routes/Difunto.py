from flask import Blueprint, jsonify, request
from  models.DifuntoModel import DifuntoModel
from models.entities.Difunto import Difunto

main = Blueprint('difunto_blueprint',__name__)

@main.route('/')
def get_difuntos():
    try:
        difuntos = DifuntoModel.get_difuntos()
        return difuntos
        
    except Exception as ex:
        return jsonify({'message':'error'}),500
    
    
@main.route('/<id>')
def get_difunto(id):
    try:
        difunto = DifuntoModel.get_difunto(id)
        if difunto is not None:
            return jsonify(difunto)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
@main.route('/ci/<ci>')
def get_difunto_ci(ci):
    try:
        difunto = DifuntoModel.get_difunto_ci(ci)
        if difunto is not None:
            return jsonify(difunto)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    

    

@main.route('/add', methods=['POST'])
def add_difunto():
    try:
        print(request)
        data = request.get_json()

        nuevo_difunto = Difunto(
            id_difunto=None,
            nombre=data.get('nombre'),
            apellido_paterno=data.get('apellido_paterno'),
            apellido_materno=data.get('apellido_materno'),
            carnet=data.get('carnet'),
            fecha_nacimiento=data.get('fecha_nacimiento'),
            fecha_fallecimiento=data.get('fecha_fallecimiento'),
            doliente=data.get('doliente')
        )
        
        new_difunto = DifuntoModel.add_difunto(nuevo_difunto)
        
        
        return jsonify(new_difunto), 201

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


  
@main.route('/delete/<id>',methods=['DELETE'])
def delete_difunto(id):
    try:
        affected_rows = DifuntoModel.delete_difunto(int(id))
        if affected_rows == 1:
            return jsonify(id)
        
        return jsonify({'message':'Difunto no eliminado'}),500
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
    
@main.route('/notario/<id>')
def get_difunto_notario(id):
    try:
        difunto = DifuntoModel.get_difunto_notario(id)
        if difunto is not None:
            return jsonify(difunto)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
@main.route('/notario/ci/<id>')
def get_difunto_notario_ci(id):
    try:
        difunto = DifuntoModel.get_difunto_notario_ci(id)
        if difunto is not None:
            return jsonify(difunto)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500