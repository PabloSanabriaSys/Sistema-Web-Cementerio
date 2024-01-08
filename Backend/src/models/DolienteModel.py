from database.db import get_connection
from .entities.Doliente import Doliente

class DolienteModel():
    
    @classmethod
    def get_dolientes(self):
        try:
            connection = get_connection()
            dolientes = []
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM "Doliente" ORDER BY id_doliente ASC ')
                resulset = cursor.fetchall()
                for row in resulset:
                    #print(row)
                    difunto_instance = Doliente(*row)  # Crear instancia de Difunto y asignarla a una variable
                    dolientes.append(difunto_instance.to_json()) 
                    
            connection.close()
            #print(difuntos)
            return dolientes

                
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_doliente(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM "Doliente" WHERE id_doliente = %s',(id,) )
                row = cursor.fetchone()

                doliente = None
                if row is not None:
                    doliente = Doliente(*row)
                    doliente = doliente.to_json()
            connection.close()
            return doliente

                
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_doliente_ci(self,ci):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM "Doliente" WHERE carnet= %s',(ci,) )
                row = cursor.fetchone()

                doliente = None
                if row is not None:
                    doliente = Doliente(*row)
                    doliente = doliente.to_json()
            connection.close()
            return doliente

                
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def add_doliente(self,doliente):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    'INSERT INTO "Doliente" (nombre, apellido_paterno, apellido_materno, carnet, numero_celular) VALUES (%s, %s, %s, %s, %s) RETURNING id_doliente',
                    (doliente.nombre, doliente.apellido_paterno, doliente.apellido_materno, doliente.carnet, doliente.numero_celular)
                )
                new_doliente_id = cursor.fetchone()[0]
                connection.commit()

            connection.close()

            new_doliente = self.get_doliente(new_doliente_id)
            return new_doliente

        except Exception as ex:
            raise Exception(ex)
        
        
    @classmethod
    def delete_doliente(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('DELETE FROM "Doliente" WHERE id_doliente = %s',(id,) )
                
                row = cursor.rowcount
                connection.commit()
                
            connection.close()
            return row

        except Exception as ex:
            raise Exception(ex)
