from supabase_service import supabase
from flask import jsonify


def consultar_tabela():
    consulta = (supabase.table("produtos").select("nome_produto, categoria, barulho, link_imagem").execute())
    consulta_ok = consulta.data
    return jsonify(consulta_ok)