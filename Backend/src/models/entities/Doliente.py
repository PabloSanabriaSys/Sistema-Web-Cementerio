
class Doliente():

    def __init__(self, id_doliente, carnet, nombre, apellido_paterno, apellido_materno, numero_celular):
        self.id_doliente = id_doliente
        self.carnet = carnet
        self.nombre = nombre
        self.apellido_paterno = apellido_paterno
        self.apellido_materno = apellido_materno
        self.numero_celular = numero_celular

    def to_json(self):
        doliente_dict = {
            "id_doliente": self.id_doliente,
            "carnet": self.carnet,
            "nombre": self.nombre,
            "apellido_paterno": self.apellido_paterno,
            "apellido_materno": self.apellido_materno,
            "numero_celular": self.numero_celular
        }
        return (doliente_dict)
