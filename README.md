## Introducción

El proyecto se trata de una herramienta alojada en una instancia AWS EC2, diseñada para interactuar con el modelo de inteligencia artificial GPT-3.5 a través de solicitudes HTTP. El backend de la herramienta se desarrolló en Python con la ayuda del microframework Flask, y el frontend se diseñó utilizando HTML, CSS y JavaScript.
Arquitectura del Sistema

## Frontend

El frontend de la aplicación se desarrolló utilizando HTML, CSS y JavaScript. Su principal función es proporcionar una interfaz de usuario intuitiva y amigable que permita al usuario interactuar fácilmente con el modelo de inteligencia artificial.

## Backend

El backend de la aplicación, desarrollado con Python y Flask, se encarga de manejar las solicitudes HTTP a la API de GPT-3.5. Flask es un microframework que permite desarrollar aplicaciones web de manera eficiente y sencilla.
## Infraestructura

La infraestructura de la aplicación reside en una instancia AWS EC2. Amazon Web Services (AWS) es una plataforma segura de servicios de computación en la nube que ofrece potencia de cómputo, almacenamiento de bases de datos, entrega de contenido y otras funcionalidades para ayudar a las empresas a escalar y crecer.

## Interacción con GPT-3.5

La interacción con el modelo de inteligencia artificial GPT-3.5 se realiza a través de solicitudes HTTP. El código en Python es responsable de generar estas solicitudes y procesar las respuestas de la API de GPT-3.5.
![Interaccion](https://i.imgur.com/qzFecc6.png)


## Uso del Sistema

Este sistema permite a los usuarios recibir un plan de tareas domésticas y un menú de comidas personalizado basado en inteligencia artificial. Para hacer uso de la herramienta, los usuarios deben seguir los siguientes pasos:

    1. Acceder a la interfaz web: La aplicación se aloja en una página web a la que los usuarios pueden acceder desde cualquier navegador.
![Interfaz](https://i.imgur.com/K5L469V.png)


    2. Introducir datos: Los usuarios deben proporcionar ciertos datos para personalizar su experiencia. Estos datos pueden incluir, pero no se limitan a:
        Nombres de los miembros del hogar.
        Número de personas en el hogar.
        Preferencias de tareas domésticas: los usuarios pueden indicar qué tareas prefieren realizar y cuáles no.
        Preferencias de comida: los usuarios pueden especificar cualquier restricción dietética, alimentos que les gustan o no les gustan, entre otros.
![Datos](https://i.imgur.com/d5v5b3M.png)

    3. Generar plan: Una vez que se han ingresado todos los datos, la IA genera un plan personalizado de tareas domésticas y un menú de comidas para los usuarios.
![Datos](https://i.imgur.com/MLoiV9U.png)
Los planes generados pueden ser diferentes para cada hogar en función de los datos introducidos y las preferencias personales. La inteligencia artificial utiliza la API de GPT-3.5 para analizar los datos ingresados y generar un plan adecuado.