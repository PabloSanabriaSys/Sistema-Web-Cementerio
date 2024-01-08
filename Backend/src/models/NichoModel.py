from database.db import get_connection
from .entities.Nicho import Nicho
from .DifuntoModel import DifuntoModel

class NichoModel():
    
    @classmethod
    def get_nichos(self):
        try:
            with get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute('''SELECT n.id_servicio, s.costo, s.id_difunto, n.area, n.seccion, n.fecha_limite, n.fecha_entierro, n.tipo_nicho
                                    FROM "Nicho" n INNER JOIN "Servicio" s ON n.id_servicio = s.id_servicio;''')
                    rows = cursor.fetchall()
                    nichos = self._parse_nichos(rows)
                    return nichos

        except Exception as ex:
            raise Exception(ex)

    @staticmethod
    def _parse_nichos(rows):
        nichos = []
        for row in rows:
            nicho_data = {
                "id_servicio": row[0],
                "costo": row[1],
                "difunto": DifuntoModel.get_difunto(row[2]),
                "area": row[3],
                "seccion": row[4],
                "fecha_limite": row[5],
                "fecha_entierro": row[6],
                "tipo_nicho": row[7]
            }
            nicho_instance = Nicho(**nicho_data)
            nichos.append(nicho_instance.to_json())
        return nichos

    @classmethod
    def get_nicho(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('''SELECT n.id_servicio, s.costo, s.id_difunto, n.area, n.seccion, n.fecha_limite, n.fecha_entierro, n.tipo_nicho
                                    FROM "Nicho" n INNER JOIN "Servicio" s ON n.id_servicio = %s''',(id,))
                row = cursor.fetchone()
                nicho = None
                if row is not None:
                    row = {
                        "id_servicio": row[0],
                        "costo": row[1],
                        "difunto": DifuntoModel.get_difunto(row[2]),
                        "area": row[3],
                        "seccion": row[4],
                        "fecha_limite": row[5],
                        "fecha_entierro": row[6],
                        "tipo_nicho": row[7]
                    }
                    nicho = Nicho(**row)
                    nicho = nicho.to_json()
            connection.close()
            return nicho

                
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_nicho_difunto(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('''SELECT n.id_servicio FROM "Nicho" n INNER JOIN "Servicio" s ON s.id_servicio = n.id_servicio 
                               WHERE s.id_difunto =%s''',(id,))
                row = cursor.fetchone()
                print(row)
                if row is not None:
                    return True
            connection.close()
            return False
                
        except Exception as ex:
            raise Exception(ex)
            
    @classmethod
    def add_nicho(self, nicho):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                
                cursor.execute('''INSERT INTO "Servicio" (costo, id_difunto) VALUES (%s, %s) RETURNING id_servicio;''', (nicho.costo, nicho.difunto.get('id_difunto')))
                servicio_id = cursor.fetchone()[0]
                cursor.execute('''INSERT INTO "Nicho" (id_servicio, area, seccion, fecha_entierro, fecha_limite,  tipo_nicho) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id_servicio;''', (servicio_id, nicho.area, nicho.seccion,  nicho.fecha_entierro, nicho.fecha_limite,nicho.tipo_nicho))
                    
                new_nicho_id = cursor.fetchone()[0]
                connection.commit()

            connection.close()

            new_nicho = self.get_nicho(new_nicho_id)
            return new_nicho

        except Exception as ex:
            raise Exception(ex)


    @classmethod
    def delete_nicho(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('DELETE FROM "Nicho" WHERE id_servicio = %s',(id,) )
                
                row = cursor.rowcount
                connection.commit()
                
            connection.close()
            return row

        except Exception as ex:
            raise Exception(ex)
            