from flask import Blueprint, jsonify, request
from  models.NichoModel import NichoModel
from  models.DifuntoModel import DifuntoModel
from  models.CremacionModel import CremacionModel

from models.entities.Nicho import Nicho

from models.entities.Difunto import Difunto

main = Blueprint('nicho_blueprint',__name__)

@main.route('/')
def get_nichos():
    try:
        nichos = NichoModel.get_nichos()
        return nichos
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
@main.route('/<id>')
def get_nicho(id):
    try:
        nicho = NichoModel.get_nicho(id)
        if nicho is not None:
            return jsonify(nicho)

        return jsonify({}),404
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
    
    
@main.route('/add', methods=['POST'])
def add_nicho():
    try:
        data = request.get_json()

        nuevo_nicho = Nicho(
            id_servicio=None,
            costo=data.get('costo'),
            difunto=DifuntoModel.get_difunto(data.get('difunto')),
            area=data.get('area'),
            seccion=data.get('seccion'),
            fecha_limite=data.get('fecha_limite'),
            fecha_entierro=data.get('fecha_entierro'),
            tipo_nicho=data.get('tipo_nicho'),
            
        )
        nicho_existente = NichoModel.get_nicho_difunto(data.get('difunto'))
        if nicho_existente is False:
            new_nicho = NichoModel.add_nicho(nuevo_nicho)

            return jsonify(new_nicho), 201

        else:
            return jsonify({'message':"El difunto ya tiene un Nicho"}), 200

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
    
@main.route('/delete/<id>',methods=['DELETE'])
def delete_nicho(id):
    try:
        affected_rows = NichoModel.delete_nicho(int(id))
        if affected_rows == 1:
            return jsonify(id)
        
        return jsonify({'message':'Nicho no eliminado'}),200
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
