from flask import Flask, request, jsonify
from flask_cors import CORS

import uuid
import cohere

co = cohere.Client('jYofvjhVq0o1AqvuyZpRCOqhDj3vITceimhfLjGO')

conversation_id = str(uuid.uuid4())

print(conversation_id)

preamble_override = 'You are an expert public speaking coach'
print(preamble_override)
print('Starting the chat. Type "quit" to end the chat.')



app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Store user inputs in a list
user_inputs = []

@app.route('/user_input', methods=['POST'])
def receive_input():
    data = request.get_json()
    user_input = data.get('user_input')
    response = co.chat(message=user_input, conversation_id=conversation_id, preamble_override=preamble_override)
    if user_input:
        user_inputs.append("User:" + user_input +"\n")
        user_inputs.append("Bot:" + response.text +"\n")
        return jsonify({'message': 'User input received'}), 200
    else:
        return jsonify({'message': 'No input data provided'}), 400

@app.route('/input_history', methods=['GET'])
def get_input_history():
    return jsonify({'input_history': user_inputs}), 200

if __name__ == '__main__':
    app.run(debug=True)

