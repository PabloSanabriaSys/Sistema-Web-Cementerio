import datetime

class DateFormat():
    @classmethod
    def convert_date(self,date):
        if date==None:
            return None
        return datetime.datetime.strftime(date, '%Y-%m-%d')