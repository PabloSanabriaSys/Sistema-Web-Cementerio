from database.db import get_connection,get_connection_notario
from .entities.Difunto import Difunto

class DifuntoModel():
    
    @classmethod
    def get_difuntos(self):
        try:
            
            connection = get_connection()
            difuntos = []
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM "Difunto" ORDER BY id_difunto ASC ')
                resulset = cursor.fetchall()
                for row in resulset:
                    #print(row)
                    difunto_instance = Difunto(*row)  # Crear instancia de Difunto y asignarla a una variable
                    difuntos.append(difunto_instance.to_json()) 
                    
            connection.close()
            #print(difuntos)
            return difuntos

                
        except Exception as ex:
            raise Exception(ex)
        
        
    @classmethod
    def get_difunto(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM "Difunto" WHERE id_difunto = %s',(id,) )
                row = cursor.fetchone()

                difunto = None
                if row is not None:
                    difunto = Difunto(*row)
                    difunto = difunto.to_json()
            connection.close()
            return difunto

                
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_difunto_ci(self,ci):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM "Difunto" WHERE carnet= %s',(ci,) )
                row = cursor.fetchone()

                difunto = None
                if row is not None:
                    difunto = Difunto(*row)
                    difunto = difunto.to_json()
            connection.close()
            return difunto

                
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def add_difunto(self, difunto):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    'INSERT INTO "Difunto" (carnet, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, fecha_fallecimiento, id_doliente) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id_difunto',
                    (difunto.carnet, difunto.nombre, difunto.apellido_paterno, difunto.apellido_materno, difunto.fecha_nacimiento, difunto.fecha_fallecimiento, difunto.doliente)
                )
                
                new_difunto_id = cursor.fetchone()[0]
                connection.commit()

            connection.close()
            print('a')

            new_difunto = self.get_difunto(new_difunto_id)
            return new_difunto

        except Exception as ex:
            raise Exception(ex)
        
        
    @classmethod
    def delete_difunto(self,id):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                cursor.execute('DELETE FROM "Difunto" WHERE id_difunto = %s',(id,) )
                
                row = cursor.rowcount
                connection.commit()
                
            connection.close()
            return row

        except Exception as ex:
            raise Exception(ex)
        
        
    @classmethod
    def get_difunto_notario(self,id):
        try:
            connection = get_connection_notario()
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT "ciDifunto", "nombreDifunto", "apellidoMaternoDifunto", "apellidoPaternoDifunto", "fechaFallecimiento","fechaNacDifunto" FROM "Difunto_not" WHERE id_difunto=%s',(id,) )
                row = cursor.fetchone()
                row = (None,*row,None)
                print(row)
                difunto = None
                if row is not None:
                    difunto = Difunto(*row)
                    difunto = difunto.to_json()
            connection.close()
            return difunto

                
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_difunto_notario_ci(self,id):
        try:
            connection = get_connection_notario()
            
            with connection.cursor() as cursor:
                cursor.execute('SELECT "ciDifunto", "nombreDifunto", "apellidoMaternoDifunto", "apellidoPaternoDifunto", "fechaFallecimiento","fechaNacDifunto" FROM "Difunto_not" WHERE "ciDifunto"=%s',(id,) )
                row = cursor.fetchone()
                row = (None,*row,None)
                print(row)
                difunto = None
                if row is not None:
                    difunto = Difunto(*row)
                    difunto = difunto.to_json()
            connection.close()
            return difunto

                
        except Exception as ex:
            raise Exception(ex)
        

            