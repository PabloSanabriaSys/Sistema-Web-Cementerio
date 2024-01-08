from utils.DateFormat  import DateFormat
from .Servicio import Servicio

class Nicho(Servicio):

    def __init__(self, id_servicio, costo, difunto, area, seccion, fecha_limite, fecha_entierro, tipo_nicho):
        super().__init__(id_servicio, costo,difunto)
        self.area = area
        self.seccion = seccion
        self.fecha_limite = fecha_limite
        self.fecha_entierro = fecha_entierro
        self.tipo_nicho = tipo_nicho

    def to_json(self):
        nicho_dict = {
            "id_nicho": self.id_servicio,
            "costo": self.costo,
            "area": self.area,
            "seccion": self.seccion,
            "fecha_limite": DateFormat.convert_date(self.fecha_limite),
            "fecha_entierro": DateFormat.convert_date(self.fecha_entierro),
            "tipo_nicho": self.tipo_nicho,
            "difunto": self.difunto
        }
        return nicho_dict
