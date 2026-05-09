from supabase_service import supabase
from flask import jsonify


def consultar_tabela():
    consulta = (supabase.table("produtos").select("id_marca, nome_produto, categoria, barulho, link_imagem").execute())
    consulta_ok = consulta.data
    return jsonify(consulta_ok)

def consultar_marcas():
    consulta = (supabase.table("marcas").select("id, nome").execute())
    consulta_ok = consulta.data
    return jsonify(consulta_ok)