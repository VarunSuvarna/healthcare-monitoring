from . import db
from datetime import datetime

class Reading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    heart_rate = db.Column(db.Float)
    blood_pressure_systolic = db.Column(db.Float)
    blood_pressure_diastolic = db.Column(db.Float)
    temperature = db.Column(db.Float)
    oxygen_saturation = db.Column(db.Float)
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'timestamp': self.timestamp.isoformat(),
            'heart_rate': self.heart_rate,
            'blood_pressure': f"{self.blood_pressure_systolic}/{self.blood_pressure_diastolic}",
            'temperature': self.temperature,
            'oxygen_saturation': self.oxygen_saturation
        } 
