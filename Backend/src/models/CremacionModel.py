from database.db import get_connection
from .entities.Cremacion import Cremacion
from .DifuntoModel import DifuntoModel

class CremacionModel():
    
    @classmethod
    def get_cremaciones(self):
        try:
            with get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute('''SELECT c.id_servicio, s.costo, s.id_difunto, c.fecha_cremacion
                                    FROM "Cremacion" c INNER JOIN "Servicio" s ON c.id_servicio = s.id_servicio;''')
                    rows = cursor.fetchall()
                    cremaciones = self._parse_cremaciones(rows)
                    return cremaciones

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def _parse_cremaciones(cls, rows):
        cremaciones = []
        for row in rows:
            cremacion_data = {
                "id_servicio": row[0],
                "costo": row[1],
                "difunto": DifuntoModel.get_difunto(row[2]),
                "fecha_cremacion": row[3]
            }
            cremacion_instance = Cremacion(**cremacion_data)
            cremaciones.append(cremacion_instance.to_json())
        return cremaciones
                
        
    @classmethod
    def get_cremacion(self, id):
        try:
            with get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute('''SELECT c.id_servicio, s.costo, s.id_difunto, c.fecha_cremacion
                                    FROM "Cremacion" c INNER JOIN "Servicio" s ON c.id_servicio = %s''',(id,))
                    row = cursor.fetchone()
                    cremacion = None
                    if row is not None:
                        row_data = {
                            "id_servicio": row[0],
                            "costo": row[1],
                            "difunto": DifuntoModel.get_difunto(row[2]),
                            "fecha_cremacion": row[3]
                        }
                        cremacion = Cremacion(**row_data)
                        cremacion = cremacion.to_json()
            return cremacion

        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_cremacion_difunto(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('''SELECT c.id_servicio FROM "Cremacion" c INNER JOIN "Servicio" s ON s.id_servicio = c.id_servicio
                               WHERE s.id_difunto=%s''',(id,))
                row = cursor.fetchone()
                if row is not None:
                    return True
            connection.close()
            return False
                
        except Exception as ex:
            raise Exception(ex)

        
        
    @classmethod
    def add_cremacion(self, cremacion):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute('''INSERT INTO "Servicio" (costo, id_difunto) VALUES (%s, %s) RETURNING id_servicio;''', (cremacion.costo, cremacion.difunto.get('id_difunto')))
                servicio_id = cursor.fetchone()[0]

                cursor.execute('''INSERT INTO "Cremacion" (id_servicio, fecha_cremacion) VALUES (%s, %s) RETURNING id_servicio;''', (servicio_id, cremacion.fecha_cremacion))

                new_cremacion_id = cursor.fetchone()[0]
                connection.commit()

            connection.close()

            new_cremacion = self.get_cremacion(new_cremacion_id)
            return new_cremacion

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_cremacion(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('DELETE FROM "Cremacion" WHERE id_servicio = %s', (id,))
                row = cursor.rowcount
                connection.commit()
                
            connection.close()
            return row

        except Exception as ex:
            raise Exception(ex)
            