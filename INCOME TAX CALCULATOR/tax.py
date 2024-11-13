from flask import Flask, request, jsonify

app = Flask(__name__, static_url_path='', static_folder='static')

def calculate_tax(income, age):
    if income < 800000:
        tax_rate = 0
    elif income > 800000 and age < 40:
        tax_rate = 0.3
    elif income > 800000 and 40 <= age < 60:
        tax_rate = 0.4
    else:
        tax_rate = 0.1

    tax = income * tax_rate
    total_income = income - tax
    return total_income

@app.route('/')
def index():
    return app.send_static_file('income.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        gross = float(data.get('gross'))
        age = int(data.get('age'))
        deduction = float(data.get('deduction'))
        extra = float(data.get('extra'))

        overall_income = gross + extra - deduction
        total_income = calculate_tax(overall_income, age)

        response = {'total_income': total_income}
        return jsonify(response)
    except Exception as e:
        # Log the error for debugging purposes
        print("An error occurred:", e)
        # Return a 500 Internal Server Error response
        return jsonify({'error': 'An internal server error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
