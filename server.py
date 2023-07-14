from flask import Flask, render_template, url_for, request, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    json_data = '{"name": "John", "age": 30, "city": "New York"}'
    print(json.loads(json_data))

    data = {
    "desa": "John",
    "comida": 30,
    "city": "New York"
    }
    print(json.dumps(data))

    return render_template('home.html')

@app.route('/form',methods=['POST'])
def form():
    print(request)
    if request.method == 'POST':
        respuesta=json.loads(request.data)
        print(respuesta["numHabitaciones"])
        return json.dumps({"text":"GOOD"})
    

if __name__=='__main__':
    app.run(debug=True)
    
