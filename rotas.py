from app import app
from flask import render_template, jsonify
from funcoes import consultar_tabela, consultar_marcas

@app.route('/')
def home():
    return render_template("homepage.html")


@app.route('/capturar_som')
def capturar():
    return render_template("captura.html")

@app.route('/api/produtos')
def get_produtos():
    return consultar_tabela()

@app.route('/api/marcas')
def get_marcas():
    return consultar_marcas()