from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Patient

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/patients', methods=['GET'])
@jwt_required
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.to_dict() for patient in patients])

@patients_bp.route('/patients/<int:id>', methods=['GET'])
@jwt_required
def get_patient(id):
    patient = Patient.query.get_or_404(id)
    return jsonify(patient.to_dict())

@patients_bp.route('/patients', methods=['POST'])
@jwt_required
def create_patient():
    data = request.get_json()
    patient = Patient(**data)
    db.session.add(patient)
    db.session.commit()
    return jsonify(patient.to_dict()), 201
