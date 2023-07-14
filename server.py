from flask import Flask, render_template, url_for, request, json, send_file
from flask_cors import CORS
import requests
import os


def openai(personas,habitaciones,bano,deberes):
    comidas = []
    for i in range(len(personas)):
        comidas.append(f"""
        {personas[i]["nombre"]}:
        desayuno: {personas[i]["desayuno"]}
        Comida: {personas[i]["comida"]}
        Cena: {personas[i]["cena"]} 
    """)
    comidas_str = "\n".join(comidas)
    favoritos=[]
    for i in range(len(personas)):
        favoritos.append(f"{personas[i]}: {personas[i]['preferencias']}")
    fav_str = "\n".join(favoritos)

    url = "https://api.openai.com/v1/chat/completions"

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
    }
    data = {
        "model": "gpt-3.5-turbo-16k",
        "messages": [
            {"role": "system", "content": f"""
            Eres un asistente para organizar y distribuir 2 tareas del hogar al dia y comidas entre 7 dias No deberas organizar todas las tareas en un solo dia, un dia contiene 2 tareas de la casa individuales y 3 comidas para todos. Asegurate que no dejes ningun dia sin las 3 comidas, asi como las tareas asignadas. las comidas son generales y las tareas individuales. también serás el responsable de organizar, Todo con hora de inicio y final a partir de fecha de hoy 2023/07/13 El resultado que das, es en formato para despues pegar en un archivo .ics
            las compras para la comida del hogar y necesitaras hacer un plan de comida especifico para los 7 dias de la semana (Incluyendo desayuno, comida y cena) estos mismos los incluiras en en calendario, 
            teniendo en cuenta recomendaciones de los integrantes de la casa, lo que metas a la lista del super tiene que ser congruente con el plan alimenticio que ofrezcas. 
            no hagas una comida diferente para cada integrante, solamente selecciona un platillo el cual todos tendran que comer, tambien, intenta asignar comidas que sean similares a las que los 
            integrantes seleccionaron, para que haya mas variedad, las tareas son a partir de las 6:00AM Hasta las 11:00PM 
             Por ultimo, recuerda hacerme una lista de supermercado para ir a comprar la comida cada 2 semanas como se te habia dicho, No imprimas otra cosa mas que las tareas y comidas mismas. 
    
             Ejemplo de tarea en formato:
    asegurate que no se tenga un TZID.
    BEGIN:VEVENT
    DTSTAMP:20230713T000000Z
    UID:1
    SUMMARY:Barrer
    DESCRIPTION:(Pablo)Realizar la tarea de barrer la casa.
    DTSTART:20230713T090000Z
    DUE:20230713T093000Z
    END:VTODO
    Asegurate que no dejes ningun dia sin las 3 comidas, asi como asegurate que le asignas la tarea a cierto nombre. Solo daras datos de archivo .ics.
             
                                             """},
            {"role": "user", "content": f"""
            En total son 35 tareas
            Comenzando las tareas el 2023/07/15 Asegurate de incluir las tareas de la casa y horario para comer.
            Es una casa, con {habitaciones} habitaciones, {bano} baño, viven {len(personas)} personas, sus preferencias en comidas son las siguientes:
    {comidas_str}
    Estas personas suelen comprar comida cada 2 semanas, también, estas personas prefieren no tener deberes de casa los viernes y los sábados.
    Los deberes que se necesitan hacer en esta casa son los siguientes:
    {deberes}.
    Estos miembros prefieren hacer cierto deber en especifico:
    {fav_str}
    """}
        ],
        "temperature": 0.05
    }

    response = requests.post(url, headers=headers, json=data)
    response_body = response.json()["choices"][0]["message"]["content"]
    response_body = response_body.replace("VTODO", "VEVENT")
    return response_body


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/form',methods=['POST','GET'])
def form():
    print(request)
    if request.method == 'POST':
        respuesta=json.loads(request.data)
        print(respuesta)
        string=(openai(respuesta["personas"],respuesta["numHabitaciones"],respuesta["numBaños"],respuesta["deberes"]))

        

        # Envía el archivo como respuesta
        return json.dumps({"text":string})
    

    else:
        return render_template('form.html')

    


    

if __name__=='__main__':
    app.run(debug=True)
    



