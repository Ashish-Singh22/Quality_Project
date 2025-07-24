# blueprint file (e.g., worker_upload.py)
from flask import Blueprint, request, jsonify
from .qualityUpload import process_quality_file  # Import from your file

qualityUpload_bp = Blueprint('qualityUpload_bp', __name__)

@qualityUpload_bp.route('/quality-upload', methods=['POST'])
def calculate_qualityUpload():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No file part in request'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'success': False, 'message': 'No file selected'})

        # Pass the file stream to the worker_picker_kpi function
        result = process_quality_file(file)
        print(result['success'])

        return jsonify(result)
    
    except Exception as e:
        print(str(e))
        return jsonify({'success': False, 'message': str(e)})