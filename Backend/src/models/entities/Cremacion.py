from utils.DateFormat  import DateFormat
from .Servicio import Servicio



class Cremacion(Servicio):

    def __init__(self, id_servicio, costo, difunto, fecha_cremacion):
        super().__init__(id_servicio, costo, difunto)
        self.fecha_cremacion = fecha_cremacion

    def to_json(self):
        cremacion_dict = {
            "id_cremacion": self.id_servicio,
            "costo": self.costo,
            "fecha_cremacion": DateFormat.convert_date(self.fecha_cremacion),
            "difunto": self.difunto
        }
        return cremacion_dict