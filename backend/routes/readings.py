from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Reading, Patient
from services.alert_service import AlertService

readings_bp = Blueprint('readings', __name__)
alert_service = AlertService()

@readings_bp.route('/readings/<int:patient_id>', methods=['GET'])
@jwt_required
def get_readings(patient_id):
    readings = Reading.query.filter_by(patient_id=patient_id).all()
    return jsonify([reading.to_dict() for reading in readings])

@readings_bp.route('/readings', methods=['POST'])
def create_reading():
    data = request.get_json()
    reading = Reading(**data)
    db.session.add(reading)
    db.session.commit()
    
    # Check for alerts
    alerts = alert_service.check_vitals(reading)
    if alerts:
        # Handle alerts (e.g., send notifications)
        pass
        
    return jsonify(reading.to_dict()), 201
