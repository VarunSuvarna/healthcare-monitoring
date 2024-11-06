from . import db
from datetime import datetime

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    contact_number = db.Column(db.String(20))
    emergency_contact = db.Column(db.String(20))
    readings = db.relationship('Reading', backref='patient', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'contact_number': self.contact_number,
            'emergency_contact': self.emergency_contact
        }
