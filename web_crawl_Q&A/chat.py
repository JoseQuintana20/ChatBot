################################################################################
### Step 1 Leer .SCV
################################################################################

import requests
import re
import urllib.request
from bs4 import BeautifulSoup
from collections import deque
from html.parser import HTMLParser
from urllib.parse import urlparse
import os
import pandas as pd
import tiktoken
import openai
from openai.embeddings_utils import distances_from_embeddings
import pandas as pd
import numpy as np
from openai.embeddings_utils import distances_from_embeddings, cosine_similarity
import time

openai.api_key = "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"

# Define root domain to crawl
domain = "ingenierias.utp.edu.co"
full_url = "https://ingenierias.utp.edu.co"

################################################################################
### Step 7
################################################################################

# Load the cl100k_base tokenizer which is designed to work with the ada-002 model
tokenizer = tiktoken.get_encoding("cl100k_base")

df = pd.read_csv('processed/scraped.csv', index_col=0)
df.columns = ['title', 'text']

# Tokenize the text and save the number of tokens to a new column
df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))

# Visualize the distribution of the number of tokens per row using a histogram
df.n_tokens.hist()

################################################################################
### Step 8
################################################################################

max_tokens = 500

# Function to split the text into chunks of a maximum number of tokens
def split_into_many(text, max_tokens = max_tokens):

    # Split the text into sentences
    sentences = text.split('. ')

    # Get the number of tokens for each sentence
    n_tokens = [len(tokenizer.encode(" " + sentence)) for sentence in sentences]
    
    chunks = []
    tokens_so_far = 0
    chunk = []

    # Loop through the sentences and tokens joined together in a tuple
    for sentence, token in zip(sentences, n_tokens):

        # If the number of tokens so far plus the number of tokens in the current sentence is greater 
        # than the max number of tokens, then add the chunk to the list of chunks and reset
        # the chunk and tokens so far
        if tokens_so_far + token > max_tokens:
            chunks.append(". ".join(chunk) + ".")
            chunk = []
            tokens_so_far = 0

        # If the number of tokens in the current sentence is greater than the max number of 
        # tokens, go to the next sentence
        if token > max_tokens:
            continue

        # Otherwise, add the sentence to the chunk and add the number of tokens to the total
        chunk.append(sentence)
        tokens_so_far += token + 1

    return chunks
    

shortened = []

# Loop through the dataframe
for row in df.iterrows():

    # If the text is None, go to the next row
    if row[1]['text'] is None:
        continue

    # If the number of tokens is greater than the max number of tokens, split the text into chunks
    if row[1]['n_tokens'] > max_tokens:
        shortened += split_into_many(row[1]['text'])
    
    # Otherwise, add the text to the list of shortened texts
    else:
        shortened.append( row[1]['text'] )

################################################################################
### Step 9
################################################################################

df = pd.DataFrame(shortened, columns = ['text'])
df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))
df.n_tokens.hist()

################################################################################
### Step 10
################################################################################

df['embeddings'] = df.text.apply(lambda x: openai.Embedding.create(input=x, engine='text-embedding-ada-002')['data'][0]['embedding'])
df.to_csv('processed/embeddings.csv')
df.head()

################################################################################
### Step 11
################################################################################

df=pd.read_csv('processed/embeddings.csv', index_col=0)
df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)

df.head()

################################################################################
### Step 12
################################################################################

def create_context(
    question, df, max_len=1800, size="ada"
):
    """
    Cree un contexto para una pregunta encontrando el contexto m??s similar del marco de datos
    """

    # Get the embeddings for the question
    q_embeddings = openai.Embedding.create(input=question, engine='text-embedding-ada-002')['data'][0]['embedding']

    # Get the distances from the embeddings
    df['distances'] = distances_from_embeddings(q_embeddings, df['embeddings'].values, distance_metric='cosine')


    returns = []
    cur_len = 0

    # Sort by distance and add the text to the context until the context is too long
    for i, row in df.sort_values('distances', ascending=True).iterrows():
        
        # Add the length of the text to the current length
        cur_len += row['n_tokens'] + 4
        
        # If the context is too long, break
        if cur_len > max_len:
            break
        
        # Else add it to the text that is being returned
        returns.append(row["text"])

    # Return the context
    return "\n\n###\n\n".join(returns)

def answer_question(
    df,
    model="text-davinci-003",
    question="??Qui??n eres?",
    max_len=1800,
    size="ada",
    debug=False,
    max_tokens=300,
    stop_sequence=None
):
    """
    Responda una pregunta basada en el contexto m??s similar de los textos del marco de datos
    """
    context = create_context(
        question,
        df,
        max_len=max_len,
        size=size,
    )
    # If debug, print the raw model response
    if debug:
        print("Contexto:\n" + context)
        print("\n\n")

    try:
        # Create a completions using the questin and context
        response = openai.Completion.create(
            prompt=f'''Eres DaVinci, un chatbot de la Facultad de Ingenier??a de la Universidad Tecnol??gica de 
            Pereira. Tu objetivo es ayudar a los estudiantes con cualquier pregunta o duda que tengan 
            sobre la Facultad. 
            Pregunta: Hola
            DaVinci: ??Saludos! Soy DaVinci, tu amigo virtual. Estoy aqu?? para responder tus preguntas y brindarte 
            la ayuda que necesitas. Si mis respuestas no te satisfacen, puedes escribirnos a decanoingenierias@utp.edu.co.
            Pregunta: DaVinci, ??Qu?? es la UTP?
            DaVinci: La Universidad Tecnol??gica de Pereira (UTP) es una instituci??n de educaci??n superior ubicada 
            en la ciudad de Pereira, Colombia. Fue fundada en 1962 y es reconocida por su enfoque en la formaci??n 
            de ingenieros y tecn??logos de alta calidad. La UTP ofrece programas de pregrado y posgrado en diversas 
            ??reas de la ingenier??a, incluyendo mec??nica, electr??nica, sistemas, industrial, civil y de materiales, 
            entre otras.
            Pregunta: Cu??ntame sobre la Facultad de Ingenier??a.
            DaVinci: La Facultad de Ingenier??a es una de las m??s prestigiosas de la UTP y cuenta con un cuerpo 
            docente altamente capacitado y una amplia experiencia en la industria. Los estudiantes de la Facultad 
            tienen la oportunidad de participar en proyectos pr??cticos y programas de intercambio internacional, 
            lo que les permite ampliar sus horizontes y adquirir una experiencia valiosa en su campo de estudio. 
            La Facultad ofrece programas de pregrado en: Ingenier??a de Sistemas y Computaci??n, Ingenier??a Electr??nica, 
            Ingenier??a El??ctrica, Ingenier??a F??sica y Tecnolog??a en Desarrollo de Software. Adem??s, cuenta con 
            posgraorado posgrados como: Especializaci??n en Electr??nica Digital, Especializaci??n en Tecnolog??as de la 
            Informaci??n y las Comunicaciones, Maestr??a en Ingenier??a de Sistemas y Computaci??n, Maestr??a en Ingenier??a El??ctrica 
            y Doctorado en Ingenier??a. 
            Persona: ??Qu?? tipos de Certificados expide la oficina de Admisiones, Registro y Control Acad??mico?
            DaVinci: La oficina de Admisiones, Registro y Control Acad??mico expide certificados de estudios y notas sobre el estado de los estudiantes matriculados activos, retirados o graduados, Embajada, Empresas Privadas y de Pensiones. Otros certificados con caracter??sticas especiales, son revisados por la funcionaria y el Jefe de la oficina, si no se encuentran por fuera de los par??metros del Reglamento Estudiantil vigente, se pueden expedir. Para m??s informaci??n sobre los certificados acad??micos: certificadosacademicos@utp.edu.co
            Persona: ??D??nde solicito un curso de extensi??n?
            DaVinci: Para solicitar un curso de extensi??n, debe ingresar a su portal estudiantil y seleccionar la 
            opci??n de solicitudes generales, all?? encontrar?? la opci??n de solicitud "Cursos de Extensi??n", recuerda 
            que esta solicitud est?? sujeta al calendario acad??mico del semestre en curso link: https://www2.utp.edu.co/registro/n-a/529/calendario-academico
            Pregunta: ??C??mo puedo visitar las redes sociales de la Facultad?
            DaVinci: Para enterarte de ofertas laborales, pr??cticas, monitor??as, charlas, te invitamos a seguir 
            nuestras redes sociales en Facebook a trav??s del enlace https://www.facebook.com/IngenieriasUTP y en Instagram a trav??s de https://www.instagram.com/ingenieriasutp/ (@ingenieriasutp).
            DaVinci: Si mi respuesta no te satisface, puedes escribirnos a decanoingenierias@utp.edu.co.
            Responda la pregunta seg??n el contexto a continuaci??n, y si la pregunta no se puede responder seg??n el contexto, diga \"Repita por favor\"\n\nContexto: {context}\n\n---\n\nPregunta: {question}\nDaVinci: ''',
            temperature=0,
            max_tokens=max_tokens,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop=stop_sequence,
            model=model,
        )
        return response["choices"][0]["text"].strip()
    except Exception as e:
        print(e)
        return ""

################################################################################
### Step 13
################################################################################

################################################################################
### Step 6
################################################################################

# Define the questions you want to ask
questions = [
    "Hola, DaVinci",
    "??Cu??les son las redes sociales?",
    "??D??nde solicito un curso de extensi??n?",
    "??Cu??les son los Programas Acad??micos de la Facultad de Ingenier??a?",
    "??Qu?? aspectos debe tener presente para que mi curso dirigido sea aprobado? ",
    "??A partir de qu?? d??a se puede solicitar curso dirigido?",
    "??Hasta qu?? d??a se tramitan las solicitudes de curso dirigido?",
    "??Yo puedo sugerir el docente?",
    "??Cu??l es la Misi??n de la Facultad?",
    "??Qu?? debo tener en cuenta al momento de tomar la decisi??n de cancelar el semestre?",
    "??C??mo se inscriben los estudiantes a la habilitaci??n?",
    "??Qu?? tipos de Certificados expide la oficina de Admisiones, Registro y Control Acad??mico?"
]

# Print the most similar text for each question
for i in range(len(questions)):
    print("Persona: " + questions[i])
    print("DaVinci: " + answer_question(df, question=questions[i]))
    print("\n")
