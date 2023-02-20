import requests
from bs4 import BeautifulSoup

# Hacemos una petición a la página web
url = 'https://www.utp.edu.co'
response = requests.get(url)

# Verificamos que la respuesta sea correcta
if response.status_code == 200:
    # Parseamos el contenido de la respuesta con BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Podemos acceder a los elementos de la página web utilizando el método "select" de BeautifulSoup
    elements = soup.select('div')
    
    # Iteramos sobre los elementos y extraemos la información que necesitemos
    for element in elements:
        print(element.text)
