from app import app
from flask import render_template, jsonify
from funcoes import consultar_tabela

@app.route('/')
def home():
    return render_template("homepage.html")


@app.route('/testar')
def teste():
    return render_template("teste.html")
    pass

@app.route('/api/produtos')
def get_produtos():
    return consultar_tabela()