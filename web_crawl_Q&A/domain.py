from urllib.parse import urlparse

url = "https://media.utp.edu.co/archivos/Preguntas%20Frecuentes%20Posgrado%202021.pdf"
parsed_url = urlparse(url)
domain = parsed_url.netloc
print(domain)