from flask import Flask, render_template, url_for, request, json

app = Flask(__name__)
app

@app.route('/')
def index():
    json_data = '{"name": "John", "age": 30, "city": "New York"}'
    print(json.loads(json_data))

    data = {
    "name": "John",
    "age": 30,
    "city": "New York"
    }
    print(json.dumps(data))

    return render_template('home.html')

if __name__=='__main__':
    app.run(debug=True)
    
