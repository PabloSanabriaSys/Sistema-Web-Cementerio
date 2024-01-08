from flask import Blueprint, jsonify, request
from  models.CremacionModel import CremacionModel
from  models.DifuntoModel import DifuntoModel

from models.entities.Cremacion import Cremacion

main = Blueprint('cremacion_blueprint',__name__)

@main.route('/')
def get_cremacion():
    try:
        cremaciones = CremacionModel.get_cremaciones()
        return cremaciones
        
    except Exception as ex:
        return jsonify({'message':'error'}),500
    

@main.route('/add', methods=['POST'])
def add_cremacion():
    try:
        data = request.get_json()

        nueva_cremacion = Cremacion(
            id_servicio=None,
            costo=data.get('costo'),
            fecha_cremacion=data.get('fecha_cremacion'),
            difunto=DifuntoModel.get_difunto(data.get('difunto')),
        )

        nicho_existente = CremacionModel.get_cremacion_difunto(data.get('difunto'))
        
        if nicho_existente is False:
            new_cremacion = CremacionModel.add_cremacion(nueva_cremacion)

            return jsonify(new_cremacion), 201

        else:
            return jsonify({"message":"El difunto ya tiene una Cremacion"}), 200

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


  
@main.route('/delete/<id>',methods=['DELETE'])
def delete_cremacion(id):
    try:
        affected_rows = CremacionModel.delete_cremacion(int(id))
        if affected_rows == 1:
            return jsonify(id)
        
        return jsonify({'message':'Cremacion no eliminado'}),500
        
    except Exception as ex:
        return jsonify({'message': str(ex)}),500
