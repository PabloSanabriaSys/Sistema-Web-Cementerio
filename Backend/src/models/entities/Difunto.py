from utils.DateFormat  import DateFormat
class Difunto():

    def __init__(self, id_difunto, carnet, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, fecha_fallecimiento,doliente):
        self.id_difunto = id_difunto
        self.carnet = carnet
        self.nombre = nombre
        self.apellido_paterno = apellido_paterno
        self.apellido_materno = apellido_materno
        self.fecha_nacimiento = fecha_nacimiento
        self.fecha_fallecimiento = fecha_fallecimiento
        self.doliente = doliente
        print(fecha_nacimiento,' ',fecha_fallecimiento)

    def to_json(self):
        difunto_dict = {
            "id_difunto": self.id_difunto,
            "carnet": self.carnet,
            "nombre": self.nombre,
            "apellido_paterno": self.apellido_paterno,
            "apellido_materno": self.apellido_materno,
            "fecha_nacimiento": DateFormat.convert_date(self.fecha_nacimiento),
            "fecha_fallecimiento": DateFormat.convert_date(self.fecha_fallecimiento),
            "doliente": self.doliente
        }
        return difunto_dict