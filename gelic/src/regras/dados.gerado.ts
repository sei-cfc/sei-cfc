/* GERADO por gelic/gerar.ts a partir das fontes em texto. NAO EDITE: rode "npm run gerar". */
export const ETAPAS_JSON: unknown = {
 "_leia": "Etapas do fluxo da Gelic (fluxo/fluxo-gelic.drawio) e como reconhecê-las pelos documentos dos autos. 'tipos' traduz o título do documento no SEI para um tipo canônico (primeira regex que casar, sem diferenciar maiúsculas). 'marcas' acrescenta ao documento rótulos lidos do título inteiro (ex.: formulário de prorrogação × de acréscimo/supressão). 'etapas' são avaliadas em ordem: a primeira cuja condição vale é a etapa. Condições: tem / nao_tem / tem_algum (tipo presente nos autos), depois_de [a, b] ou lista de pares (o último a é posterior ao último b; '*' = qualquer documento; 'a|b' = qualquer dos tipos), nao_depois_de idem, marca / sem_marca [tipo, marca] ou lista de pares (o último documento do tipo tem / não tem a marca), familia (do _estado.json). Cada condição é um FATO de references/fatos-etapa.json: a regra calcula o fato pelos títulos, o Jev responde o mesmo fato (sim/não ou escolha de até 4 opções) e o código combina os fatos aqui — o Jev nunca escolhe a etapa ('if inteligente', scripts/etapa.py). 'descricao' é o que a pessoa lê. 'documento' é UM destes: {template, dados} (o documento a gerar; dados = blocos do modelo a ligar), {acao} (o que fazer quando não há documento; 'comando' opcional), ou {criterio, opcoes, motivo} quando os títulos não bastam — criterio 'usuario' (sempre pergunta), 'fato' (o valor do fato 'fato' escolhe a opção por 'por_valor'; valor sem opção, lista de opções ou fato incerto → pergunta entre as opções) ou 'portaria_233' (etapa.py calcula pelo valor com references/limites.json; enquanto os limites estiverem vazios, pergunta). Cada opção é {template, dados} ou {acao}. 'modelos' dá o nome legível de cada template citado. Não há modelo de despacho à Projur para contratação direta, minuta de contrato, edital ou aditivo de alteração (despacho-projur só tem os blocos prorrogacao e extincao, texto PROJUR imutável): nesses casos a etapa é uma ação.",
 "tipos": {
  "dvi": [
   "verifica[çc][ãa]o inicial",
   "(^|[^a-z])DVI([^a-z]|$)"
  ],
  "despacho_devolucao": [
   "despacho.*(devolu|ajuste|reexame)"
  ],
  "despacho_reserva": [
   "despacho.*(reserva|gecont|disponibilidade)"
  ],
  "nota_reserva": [
   "nota de reserva",
   "pr[ée]-?empenho"
  ],
  "despacho_projur": [
   "despacho.*projur",
   "envio [àa] projur"
  ],
  "parecer": [
   "parecer"
  ],
  "autorizacao": [
   "autoriza[çc][ãa]o de contrata[çc][ãa]o",
   "autoriza[çc][ãa]o.*(dispensa|inexigibilidade)"
  ],
  "aviso_dispensa": [
   "aviso de (dispensa|contrata[çc][ãa]o direta)"
  ],
  "edital": [
   "\\bedital\\b"
  ],
  "homologacao": [
   "homologa[çc][ãa]o",
   "adjudica[çc][ãa]o"
  ],
  "minuta_contrato": [
   "minuta de contrato"
  ],
  "contrato": [
   "^contrato\\b",
   "termo de contrato"
  ],
  "nota_empenho": [
   "nota de empenho",
   "\\bempenho\\b"
  ],
  "publicacao": [
   "publica[çc][ãa]o",
   "\\bPNCP\\b",
   "extrato"
  ],
  "formulario_alteracao": [
   "formul[áa]rio.*(prorroga|reajuste|repactua|altera|acr[ée]scimo|supress)",
   "pedido de (prorroga|reajuste|repactua)"
  ],
  "minuta_aditivo": [
   "minuta.*aditivo"
  ],
  "termo_aditivo": [
   "^termo aditivo",
   "aditivo \\["
  ],
  "apostila": [
   "apostil"
  ],
  "informacao_inexecucao": [
   "informa[çc][ãa]o t[ée]cnica",
   "inexecu[çc][ãa]o",
   "relat[óo]rio de fiscaliza"
  ],
  "notificacao": [
   "notifica[çc][ãa]o",
   "of[íi]cio.*(ci[êe]ncia|notific)"
  ],
  "termo_extincao": [
   "(termo|minuta).*(extin[çc][ãa]o|rescis[ãa]o)"
  ],
  "abertura_par": [
   "apura[çc][ãa]o de responsabilidade",
   "abertura (de )?PAR"
  ],
  "etp": [
   "estudo t[ée]cnico preliminar",
   "(^|[^a-z])ETP([^a-z]|$)"
  ],
  "tr": [
   "termo de refer[êe]ncia",
   "(^|[^a-z])TR([^a-z]|$)"
  ],
  "dfd": [
   "(^|[^a-z])DFD([^a-z]|$)",
   "documento de formaliza[çc][ãa]o"
  ]
 },
 "marcas": {
  "prorrogacao": [
   "prorroga"
  ],
  "acrescimo_supressao": [
   "acr[ée]scimo",
   "supress"
  ],
  "reajuste": [
   "reajuste",
   "repactua"
  ],
  "registro_precos": [
   "registro de pre[çc]os",
   "(^|[^a-z])SRP([^a-z]|$)"
  ],
  "inexigibilidade": [
   "inexigibilidade"
  ],
  "dispensa_eletronica": [
   "dispensa eletr[ôo]nica"
  ]
 },
 "modelos": {
  "despacho-projur": "Despacho de envio à Projur",
  "termo-extincao-unilateral": "Termo de extinção unilateral",
  "termo-aditivo-prorrogacao": "Termo aditivo de prorrogação",
  "termo-aditivo-alteracao": "Termo aditivo de alteração (acréscimo/supressão)",
  "termo-apostilamento-reajuste": "Termo de apostilamento de reajuste (modelo CFC)",
  "autorizacao-contratacao-direta": "Autorização de contratação direta",
  "aviso-dispensa-eletronica": "Aviso de dispensa eletrônica",
  "contrato-compras": "Contrato de compras (modelo PROJUR)",
  "contrato-servicos": "Contrato de serviços (modelo PROJUR)",
  "agu-contrato-compras": "Contrato de compras (modelo AGU)",
  "agu-contrato-servicos-sem-mo": "Contrato de serviços sem mão de obra exclusiva (modelo AGU)",
  "agu-contrato-servicos-com-mo": "Contrato de serviços com mão de obra exclusiva (modelo AGU)",
  "agu-contrato-obras": "Contrato de obras e serviços de engenharia (modelo AGU)",
  "agu-ata-registro-precos": "Ata de registro de preços (modelo AGU)"
 },
 "etapas": [
  {
   "id": "extincao_termo",
   "descricao": "Extinção unilateral com parecer jurídico juntado: lavrar o termo de extinção.",
   "quando": {
    "tem": [
     "informacao_inexecucao",
     "despacho_projur",
     "parecer"
    ],
    "nao_tem": [
     "termo_extincao"
    ],
    "depois_de": [
     "parecer",
     "despacho_projur"
    ]
   },
   "documento": {
    "template": "termo-extincao-unilateral",
    "dados": {}
   }
  },
  {
   "id": "extincao_projur",
   "descricao": "Inexecução contratual informada pela fiscalização e contratada notificada: enviar à Projur para parecer sobre a extinção.",
   "quando": {
    "tem": [
     "contrato",
     "informacao_inexecucao",
     "notificacao"
    ],
    "nao_tem": [
     "termo_extincao"
    ],
    "nao_depois_de": [
     "despacho_projur",
     "informacao_inexecucao"
    ]
   },
   "documento": {
    "template": "despacho-projur",
    "dados": {
     "extincao": true
    }
   }
  },
  {
   "id": "aguarda_parecer",
   "descricao": "Despacho enviado à Projur depois do último parecer juntado: aguardar o parecer.",
   "quando": {
    "tem": [
     "despacho_projur"
    ],
    "depois_de": [
     "despacho_projur",
     "parecer"
    ]
   },
   "documento": {
    "acao": "aguardar o parecer da Projur"
   }
  },
  {
   "id": "concluido",
   "descricao": "Instrumento (contrato, termo aditivo ou apostila) assinado, publicado e empenhado depois do último pedido: nada a fazer pela Gelic; arquivar ou devolver ao gestor.",
   "quando": {
    "tem_algum": [
     "termo_aditivo",
     "contrato",
     "apostila"
    ],
    "tem": [
     "publicacao",
     "nota_empenho"
    ],
    "depois_de": [
     [
      "nota_empenho",
      "termo_aditivo|contrato|apostila"
     ],
     [
      "termo_aditivo|contrato|apostila",
      "formulario_alteracao|dvi|despacho_reserva"
     ]
    ],
    "nao_depois_de": [
     [
      "informacao_inexecucao|notificacao|despacho_projur|parecer|formulario_alteracao",
      "nota_empenho"
     ]
    ]
   },
   "documento": {
    "acao": "nada a fazer: arquivar ou devolver ao gestor"
   }
  },
  {
   "id": "aditivo_assinado",
   "descricao": "Termo aditivo assinado depois do pedido, ainda sem publicação ou empenho posteriores: publicar e pedir o empenho.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "termo_aditivo"
    ],
    "depois_de": [
     "termo_aditivo",
     "formulario_alteracao"
    ]
   },
   "documento": {
    "acao": "publicar o extrato no PNCP e pedir o empenho à Gecont — sem modelo de despacho de empenho; redigir à mão"
   }
  },
  {
   "id": "aditivo_termo_prorrogacao",
   "descricao": "Prorrogação contratual com minuta de aditivo, envio à Projur e parecer juntado: lavrar o termo aditivo de prorrogação para assinatura, com os ajustes do parecer.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "minuta_aditivo",
     "despacho_projur",
     "parecer"
    ],
    "depois_de": [
     [
      "despacho_projur",
      "formulario_alteracao"
     ],
     [
      "minuta_aditivo",
      "formulario_alteracao"
     ],
     [
      "parecer",
      "despacho_projur"
     ]
    ],
    "nao_depois_de": [
     [
      "termo_aditivo",
      "formulario_alteracao"
     ]
    ],
    "marca": [
     "formulario_alteracao",
     "prorrogacao"
    ]
   },
   "documento": {
    "template": "termo-aditivo-prorrogacao",
    "dados": {}
   }
  },
  {
   "id": "aditivo_termo_alteracao",
   "descricao": "Acréscimo/supressão contratual com minuta de aditivo, envio à Projur e parecer juntado: lavrar o termo aditivo de alteração para assinatura, com os ajustes do parecer.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "minuta_aditivo",
     "despacho_projur",
     "parecer"
    ],
    "depois_de": [
     [
      "despacho_projur",
      "formulario_alteracao"
     ],
     [
      "minuta_aditivo",
      "formulario_alteracao"
     ],
     [
      "parecer",
      "despacho_projur"
     ]
    ],
    "nao_depois_de": [
     [
      "termo_aditivo",
      "formulario_alteracao"
     ]
    ],
    "marca": [
     "formulario_alteracao",
     "acrescimo_supressao"
    ],
    "sem_marca": [
     [
      "formulario_alteracao",
      "prorrogacao"
     ]
    ]
   },
   "documento": {
    "template": "termo-aditivo-alteracao",
    "dados": {}
   }
  },
  {
   "id": "aditivo_projur_prorrogacao",
   "descricao": "Prorrogação contratual com minuta de termo aditivo juntada depois do DVI/reserva e ainda não enviada à Projur: enviar à Projur para parecer.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "minuta_aditivo"
    ],
    "depois_de": [
     [
      "minuta_aditivo",
      "formulario_alteracao"
     ],
     [
      "minuta_aditivo",
      "dvi|despacho_reserva"
     ]
    ],
    "nao_depois_de": [
     [
      "despacho_projur",
      "formulario_alteracao"
     ],
     [
      "termo_aditivo",
      "formulario_alteracao"
     ]
    ],
    "marca": [
     "formulario_alteracao",
     "prorrogacao"
    ]
   },
   "documento": {
    "template": "despacho-projur",
    "dados": {
     "prorrogacao": true
    }
   }
  },
  {
   "id": "aditivo_projur_alteracao",
   "descricao": "Acréscimo/supressão contratual com minuta de termo aditivo juntada depois do DVI/reserva e ainda não enviada à Projur: enviar à Projur para parecer.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "minuta_aditivo"
    ],
    "depois_de": [
     [
      "minuta_aditivo",
      "formulario_alteracao"
     ],
     [
      "minuta_aditivo",
      "dvi|despacho_reserva"
     ]
    ],
    "nao_depois_de": [
     [
      "despacho_projur",
      "formulario_alteracao"
     ],
     [
      "termo_aditivo",
      "formulario_alteracao"
     ]
    ],
    "marca": [
     "formulario_alteracao",
     "acrescimo_supressao"
    ],
    "sem_marca": [
     [
      "formulario_alteracao",
      "prorrogacao"
     ]
    ]
   },
   "documento": {
    "acao": "enviar a minuta do aditivo de alteração à Projur para parecer — o modelo despacho-projur só tem os blocos de prorrogação e de extinção (texto PROJUR imutável); redigir o despacho à mão"
   }
  },
  {
   "id": "aditivo_minuta_prorrogacao",
   "descricao": "Prorrogação contratual já analisada, sem impeditivo e com reserva: minutar o termo aditivo de prorrogação.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "despacho_reserva"
    ],
    "depois_de": [
     [
      "despacho_reserva",
      "formulario_alteracao"
     ],
     [
      "formulario_alteracao",
      "contrato"
     ]
    ],
    "nao_depois_de": [
     [
      "minuta_aditivo",
      "formulario_alteracao"
     ],
     [
      "termo_aditivo",
      "formulario_alteracao"
     ]
    ],
    "marca": [
     "formulario_alteracao",
     "prorrogacao"
    ]
   },
   "documento": {
    "template": "termo-aditivo-prorrogacao",
    "dados": {}
   }
  },
  {
   "id": "aditivo_minuta_alteracao",
   "descricao": "Acréscimo/supressão contratual já analisado, sem impeditivo e com reserva: minutar o termo aditivo de alteração.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "despacho_reserva"
    ],
    "depois_de": [
     [
      "despacho_reserva",
      "formulario_alteracao"
     ],
     [
      "formulario_alteracao",
      "contrato"
     ]
    ],
    "nao_depois_de": [
     [
      "minuta_aditivo",
      "formulario_alteracao"
     ],
     [
      "termo_aditivo",
      "formulario_alteracao"
     ]
    ],
    "marca": [
     "formulario_alteracao",
     "acrescimo_supressao"
    ],
    "sem_marca": [
     [
      "formulario_alteracao",
      "prorrogacao"
     ]
    ]
   },
   "documento": {
    "template": "termo-aditivo-alteracao",
    "dados": {}
   }
  },
  {
   "id": "aditivo_instrumento_indefinido",
   "descricao": "Pedido contratual (reajuste, repactuação ou alteração sem dizer qual) já analisado e com reserva, sem aditivo assinado: o título do formulário não diz se é prorrogação ou acréscimo/supressão — escolher o instrumento.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "despacho_reserva"
    ],
    "depois_de": [
     [
      "despacho_reserva",
      "formulario_alteracao"
     ],
     [
      "formulario_alteracao",
      "contrato"
     ]
    ],
    "nao_depois_de": [
     "termo_aditivo",
     "formulario_alteracao"
    ],
    "sem_marca": [
     [
      "formulario_alteracao",
      "prorrogacao"
     ],
     [
      "formulario_alteracao",
      "acrescimo_supressao"
     ]
    ]
   },
   "documento": {
    "criterio": "fato",
    "fato": "instrumento_alteracao",
    "por_valor": {
     "apostila": "apostila"
    },
    "motivo": "o título do formulário não diz se é prorrogação ou acréscimo/supressão e o Jev não firmou o instrumento (reajuste/repactuação isolados costumam ir por apostila)",
    "opcoes": {
     "apostila": {
      "template": "termo-apostilamento-reajuste",
      "dados": {}
     },
     "termo-aditivo-prorrogacao": {
      "template": "termo-aditivo-prorrogacao",
      "dados": {}
     },
     "termo-aditivo-alteracao": {
      "template": "termo-aditivo-alteracao",
      "dados": {}
     }
    }
   }
  },
  {
   "id": "alteracao_reexame",
   "descricao": "Alteração contratual com DVI já emitido e documentos novos da unidade depois dele ou da última devolução da Gelic: reexame (a skill decide devolução ou envio à Gecont).",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "dvi"
    ],
    "depois_de": [
     [
      "dvi",
      "contrato"
     ],
     [
      "*",
      "dvi|despacho_devolucao"
     ]
    ]
   },
   "documento": {
    "criterio": "fato",
    "fato": "instrumento_alteracao",
    "por_valor": {
     "apostila": "apostila",
     "termo_aditivo": "reexame"
    },
    "padrao": "reexame",
    "motivo": "reajuste formalizado por apostila vai direto ao termo de apostilamento; termo aditivo, ou instrumento que os autos não dizem, segue o reexame dos documentos novos",
    "opcoes": {
     "reexame": {
      "acao": "reexaminar os documentos novos e emitir a devolução ou o despacho à Gecont (a skill escolhe o formato)",
      "comando": "$gelic <pasta>"
     },
     "apostila": {
      "template": "termo-apostilamento-reajuste",
      "dados": {}
     }
    }
   }
  },
  {
   "id": "alteracao_aguarda_unidade",
   "descricao": "Alteração contratual com DVI emitido e nenhum documento novo da unidade depois do DVI ou da última devolução: aguardar a resposta.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao",
     "dvi"
    ],
    "depois_de": [
     "dvi",
     "contrato"
    ],
    "nao_depois_de": [
     "*",
     "dvi|despacho_devolucao"
    ]
   },
   "documento": {
    "acao": "aguardar a unidade"
   }
  },
  {
   "id": "alteracao_analise",
   "descricao": "Contrato vigente com pedido de prorrogação, reajuste, repactuação ou alteração ainda não analisado pela Gelic: analisar e emitir o DVI.",
   "quando": {
    "tem": [
     "contrato",
     "formulario_alteracao"
    ],
    "depois_de": [
     "formulario_alteracao",
     "contrato"
    ],
    "nao_depois_de": [
     "dvi",
     "contrato"
    ]
   },
   "documento": {
    "acao": "analisar o pedido e emitir o DVI (a skill escolhe o formato)",
    "comando": "$gelic prorrogacao|reajuste <pasta>"
   }
  },
  {
   "id": "empenho",
   "descricao": "Contrato assinado sem nota de empenho: pedir o empenho à Gecont.",
   "quando": {
    "tem": [
     "contrato"
    ],
    "nao_tem": [
     "nota_empenho",
     "formulario_alteracao"
    ]
   },
   "documento": {
    "acao": "pedir o empenho à Gecont — sem modelo de despacho de empenho; redigir à mão"
   }
  },
  {
   "id": "dispensa_autorizacao",
   "descricao": "Dispensa eletrônica com resultado homologado e sem autorização: minutar a autorização de contratação direta.",
   "quando": {
    "tem": [
     "aviso_dispensa",
     "homologacao"
    ],
    "nao_tem": [
     "autorizacao",
     "contrato"
    ]
   },
   "documento": {
    "template": "autorizacao-contratacao-direta",
    "dados": {}
   }
  },
  {
   "id": "dispensa_em_andamento",
   "descricao": "Aviso de dispensa eletrônica publicado, sem homologação: aguardar a sessão e a homologação.",
   "quando": {
    "tem": [
     "aviso_dispensa"
    ],
    "nao_tem": [
     "homologacao",
     "autorizacao",
     "contrato"
    ]
   },
   "documento": {
    "acao": "aguardar a sessão e a homologação da dispensa eletrônica"
   }
  },
  {
   "id": "contrato_direta",
   "descricao": "Contratação direta autorizada e sem contrato: minutar o contrato (modelo PROJUR de compras ou de serviços).",
   "quando": {
    "tem": [
     "autorizacao"
    ],
    "nao_tem": [
     "contrato"
    ]
   },
   "documento": {
    "criterio": "fato",
    "fato": "objeto_contrato",
    "por_valor": {
     "compras": "contrato-compras",
     "servicos": "contrato-servicos"
    },
    "motivo": "compras × serviços não se lê dos títulos dos autos e o Jev não firmou o objeto",
    "opcoes": {
     "contrato-compras": {
      "template": "contrato-compras",
      "dados": {}
     },
     "contrato-servicos": {
      "template": "contrato-servicos",
      "dados": {}
     }
    }
   }
  },
  {
   "id": "ata_registro_precos",
   "descricao": "Licitação para registro de preços (edital SRP) homologada e sem ata: minutar a ata de registro de preços.",
   "quando": {
    "tem": [
     "edital",
     "homologacao"
    ],
    "nao_tem": [
     "contrato",
     "autorizacao",
     "aviso_dispensa"
    ],
    "marca": [
     "edital",
     "registro_precos"
    ]
   },
   "documento": {
    "template": "agu-ata-registro-precos",
    "dados": {}
   }
  },
  {
   "id": "contrato_licitacao",
   "descricao": "Licitação homologada e sem contrato: minutar o contrato (modelo AGU conforme o objeto).",
   "quando": {
    "tem": [
     "homologacao"
    ],
    "nao_tem": [
     "contrato",
     "autorizacao",
     "aviso_dispensa"
    ]
   },
   "documento": {
    "criterio": "fato",
    "fato": "objeto_contrato",
    "por_valor": {
     "compras": "agu-contrato-compras",
     "servicos": [
      "agu-contrato-servicos-sem-mo",
      "agu-contrato-servicos-com-mo"
     ],
     "obras": "agu-contrato-obras"
    },
    "motivo": "o tipo de objeto (compras, serviços com/sem mão de obra exclusiva, obras) não se lê dos títulos dos autos e o Jev não o firmou",
    "opcoes": {
     "agu-contrato-compras": {
      "template": "agu-contrato-compras",
      "dados": {}
     },
     "agu-contrato-servicos-sem-mo": {
      "template": "agu-contrato-servicos-sem-mo",
      "dados": {}
     },
     "agu-contrato-servicos-com-mo": {
      "template": "agu-contrato-servicos-com-mo",
      "dados": {}
     },
     "agu-contrato-obras": {
      "template": "agu-contrato-obras",
      "dados": {}
     }
    }
   }
  },
  {
   "id": "contratacao_projur",
   "descricao": "Contratação com reserva e minuta de contrato ou edital pronta, ainda não enviada à Projur: enviar à Projur para parecer.",
   "quando": {
    "tem": [
     "despacho_reserva"
    ],
    "tem_algum": [
     "minuta_contrato",
     "edital"
    ],
    "nao_tem": [
     "despacho_projur",
     "parecer",
     "contrato",
     "homologacao",
     "autorizacao",
     "aviso_dispensa"
    ]
   },
   "documento": {
    "acao": "enviar a minuta de contrato/edital à Projur para parecer — o modelo despacho-projur só tem os blocos de prorrogação e de extinção (texto PROJUR imutável); redigir o despacho à mão"
   }
  },
  {
   "id": "licitacao_em_andamento",
   "descricao": "Edital com parecer da Projur juntado e sem homologação: aguardar a licitação (publicação, sessão e homologação).",
   "quando": {
    "tem": [
     "edital",
     "despacho_projur",
     "parecer"
    ],
    "depois_de": [
     "parecer",
     "despacho_projur"
    ],
    "nao_tem": [
     "homologacao",
     "contrato",
     "autorizacao",
     "aviso_dispensa"
    ]
   },
   "documento": {
    "acao": "aguardar a licitação (publicação do edital, sessão e homologação)"
   }
  },
  {
   "id": "direta_pos_parecer",
   "descricao": "Contratação direta com reserva e parecer da Projur juntado, sem autorização nem aviso: minutar a autorização de contratação direta ou o aviso de dispensa eletrônica.",
   "quando": {
    "tem": [
     "despacho_reserva",
     "despacho_projur",
     "parecer"
    ],
    "depois_de": [
     "parecer",
     "despacho_projur"
    ],
    "nao_tem": [
     "edital",
     "autorizacao",
     "aviso_dispensa",
     "contrato",
     "homologacao"
    ]
   },
   "documento": {
    "criterio": "fato",
    "fato": "forma_contratacao_direta",
    "por_valor": {
     "sem_disputa": "autorizacao-contratacao-direta",
     "dispensa_eletronica": "aviso-dispensa-eletronica"
    },
    "motivo": "autorização (inexigibilidade ou dispensa sem disputa) × aviso de dispensa eletrônica depende da hipótese legal, que os títulos não dizem e o Jev não firmou",
    "opcoes": {
     "autorizacao-contratacao-direta": {
      "template": "autorizacao-contratacao-direta",
      "dados": {}
     },
     "aviso-dispensa-eletronica": {
      "template": "aviso-dispensa-eletronica",
      "dados": {}
     }
    }
   }
  },
  {
   "id": "autorizacao",
   "descricao": "Contratação direta com instrução saneada e reserva orçamentária, sem minuta de contrato, edital ou envio à Projur: pelo valor e pela Portaria 233, minutar a autorização de contratação direta, o aviso de dispensa eletrônica ou enviar à Projur.",
   "quando": {
    "tem": [
     "despacho_reserva"
    ],
    "nao_tem": [
     "autorizacao",
     "aviso_dispensa",
     "edital",
     "contrato",
     "minuta_contrato",
     "despacho_projur",
     "parecer",
     "homologacao"
    ]
   },
   "documento": {
    "criterio": "portaria_233",
    "motivo": "a escolha depende do valor da contratação, dos limites do art. 75 e do critério da Portaria PRES CFC 233/2025",
    "opcoes": {
     "autorizacao-contratacao-direta": {
      "template": "autorizacao-contratacao-direta",
      "dados": {}
     },
     "aviso-dispensa-eletronica": {
      "template": "aviso-dispensa-eletronica",
      "dados": {}
     },
     "despacho-projur": {
      "acao": "enviar à Projur para parecer — o modelo despacho-projur só tem os blocos de prorrogação e de extinção (texto PROJUR imutável); redigir o despacho à mão"
     }
    }
   }
  },
  {
   "id": "preparatoria_reexame",
   "descricao": "Fase preparatória com DVI emitido e documentos novos da unidade depois dele ou da última devolução da Gelic: reexame (a skill decide devolução ou despacho à Gecont para reserva).",
   "quando": {
    "tem": [
     "dvi"
    ],
    "nao_tem": [
     "contrato",
     "despacho_reserva"
    ],
    "depois_de": [
     "*",
     "dvi|despacho_devolucao"
    ]
   },
   "documento": {
    "acao": "reexaminar os documentos novos e emitir a devolução ou o despacho à Gecont para reserva (a skill escolhe o formato)",
    "comando": "$gelic <pasta>"
   }
  },
  {
   "id": "preparatoria_aguarda_unidade",
   "descricao": "Fase preparatória com DVI emitido e nada novo depois do DVI ou da última devolução da Gelic: aguardar a unidade.",
   "quando": {
    "tem": [
     "dvi"
    ],
    "nao_tem": [
     "contrato",
     "despacho_reserva"
    ],
    "nao_depois_de": [
     "*",
     "dvi|despacho_devolucao"
    ]
   },
   "documento": {
    "acao": "aguardar a unidade"
   }
  },
  {
   "id": "preparatoria_analise",
   "descricao": "Fase preparatória (DFD, ETP, TR, pesquisa de preços) recebida e ainda sem DVI: analisar e emitir o DVI.",
   "quando": {
    "tem_algum": [
     "tr",
     "etp",
     "dfd"
    ],
    "nao_tem": [
     "dvi",
     "contrato"
    ]
   },
   "documento": {
    "acao": "analisar a fase preparatória e emitir o DVI (a skill escolhe o formato)",
    "comando": "$gelic <tipo> <pasta>"
   }
  }
 ]
};

export const FATOS_JSON: unknown = {
 "_leia": "Fatos que decidem a etapa (scripts/etapa.py). O Jev NÃO escolhe a etapa: responde, numa chamada só por processo, estas perguntas curtas — 'noul' (sim/não, resposta = probabilidade de sim) ou 'choice' com no máximo 4 opções — lendo só título, ordem, data e cargos dos documentos (sem o tipo que a regra deu). A regra calcula o mesmo fato pelos títulos: 'tem' (há documento do tipo), 'depois_de' [a, b] (o último a é posterior ao último b; '*' = qualquer documento; 'a|b' = qualquer dos tipos), 'marca' (rótulos do título do último documento do tipo → valor, na ordem dada; sem rótulo: noul = false, choice = regra não sabe), 'marca_em_algum' (rótulo em qualquer título; dois valores diferentes = regra não sabe), null (só o Jev responde). 'aplica_se': sem documento desse tipo o fato não se aplica. Cada condição de references/etapas.json (tem/nao_tem/tem_algum, depois_de/nao_depois_de, marca/sem_marca) aponta para um fato daqui; o código combina os valores e acha a etapa. 'contexto' vai no estado enviado ao Jev.",
 "contexto": "Autos de processo administrativo de contratação do Conselho Federal de Contabilidade (Lei 14.133/2021), no SEI. Os documentos estão em ordem cronológica de juntada: ordem, título, data de assinatura e cargos de quem assinou. Responda sobre o estado atual dos autos.",
 "fatos": [
  {
   "id": "tem_apostila",
   "tipo": "noul",
   "rotulo": "apostila",
   "pergunta": "Há apostila (apostilamento) nos autos?",
   "regra": {
    "tem": "apostila"
   }
  },
  {
   "id": "tem_autorizacao",
   "tipo": "noul",
   "rotulo": "autorização de contratação direta",
   "pergunta": "Há autorização da contratação direta assinada pela autoridade competente (ex.: 'Autorização de Contratação Direta'; justificativa ou parecer sobre dispensa/inexigibilidade não é autorização) nos autos?",
   "regra": {
    "tem": "autorizacao"
   }
  },
  {
   "id": "tem_aviso_dispensa",
   "tipo": "noul",
   "rotulo": "aviso de dispensa",
   "pergunta": "Há aviso de dispensa eletrônica publicado para disputa de propostas (justificativa de dispensa ou de inexigibilidade não conta) nos autos?",
   "regra": {
    "tem": "aviso_dispensa"
   }
  },
  {
   "id": "tem_contrato",
   "tipo": "noul",
   "rotulo": "contrato celebrado",
   "pergunta": "Há contrato celebrado (termo de contrato, não minuta) nos autos?",
   "regra": {
    "tem": "contrato"
   }
  },
  {
   "id": "tem_despacho_projur",
   "tipo": "noul",
   "rotulo": "despacho à Projur",
   "pergunta": "Há despacho de envio à Procuradoria Jurídica (Projur) nos autos?",
   "regra": {
    "tem": "despacho_projur"
   }
  },
  {
   "id": "tem_despacho_reserva",
   "tipo": "noul",
   "rotulo": "despacho de reserva",
   "pergunta": "Há despacho de reserva orçamentária (envio à Gecont) nos autos?",
   "regra": {
    "tem": "despacho_reserva"
   }
  },
  {
   "id": "tem_dfd",
   "tipo": "noul",
   "rotulo": "DFD",
   "pergunta": "Há Documento de Formalização de Demanda (DFD) nos autos?",
   "regra": {
    "tem": "dfd"
   }
  },
  {
   "id": "tem_dvi",
   "tipo": "noul",
   "rotulo": "DVI",
   "pergunta": "Há Despacho de Verificação Inicial (DVI) da Gelic nos autos?",
   "regra": {
    "tem": "dvi"
   }
  },
  {
   "id": "tem_edital",
   "tipo": "noul",
   "rotulo": "edital",
   "pergunta": "Há edital de licitação nos autos?",
   "regra": {
    "tem": "edital"
   }
  },
  {
   "id": "tem_etp",
   "tipo": "noul",
   "rotulo": "ETP",
   "pergunta": "Há Estudo Técnico Preliminar (ETP) nos autos?",
   "regra": {
    "tem": "etp"
   }
  },
  {
   "id": "tem_formulario_alteracao",
   "tipo": "noul",
   "rotulo": "pedido de alteração contratual",
   "pergunta": "Há pedido ou formulário de prorrogação, reajuste, repactuação ou alteração contratual nos autos?",
   "regra": {
    "tem": "formulario_alteracao"
   }
  },
  {
   "id": "tem_homologacao",
   "tipo": "noul",
   "rotulo": "homologação",
   "pergunta": "Há termo de homologação ou adjudicação nos autos?",
   "regra": {
    "tem": "homologacao"
   }
  },
  {
   "id": "tem_informacao_inexecucao",
   "tipo": "noul",
   "rotulo": "informação de inexecução",
   "pergunta": "Há informação técnica ou relatório da fiscalização (inexecução contratual) nos autos?",
   "regra": {
    "tem": "informacao_inexecucao"
   }
  },
  {
   "id": "tem_minuta_aditivo",
   "tipo": "noul",
   "rotulo": "minuta de aditivo",
   "pergunta": "Há minuta de termo aditivo nos autos?",
   "regra": {
    "tem": "minuta_aditivo"
   }
  },
  {
   "id": "tem_minuta_contrato",
   "tipo": "noul",
   "rotulo": "minuta de contrato",
   "pergunta": "Há minuta de contrato nos autos?",
   "regra": {
    "tem": "minuta_contrato"
   }
  },
  {
   "id": "tem_nota_empenho",
   "tipo": "noul",
   "rotulo": "nota de empenho",
   "pergunta": "Há nota de empenho nos autos?",
   "regra": {
    "tem": "nota_empenho"
   }
  },
  {
   "id": "tem_notificacao",
   "tipo": "noul",
   "rotulo": "notificação",
   "pergunta": "Há notificação ou ofício de ciência à contratada nos autos?",
   "regra": {
    "tem": "notificacao"
   }
  },
  {
   "id": "tem_parecer",
   "tipo": "noul",
   "rotulo": "parecer jurídico",
   "pergunta": "Há parecer jurídico nos autos?",
   "regra": {
    "tem": "parecer"
   }
  },
  {
   "id": "tem_publicacao",
   "tipo": "noul",
   "rotulo": "publicação",
   "pergunta": "Há publicação ou extrato (DOU/PNCP) nos autos?",
   "regra": {
    "tem": "publicacao"
   }
  },
  {
   "id": "tem_termo_aditivo",
   "tipo": "noul",
   "rotulo": "termo aditivo celebrado",
   "pergunta": "Há termo aditivo celebrado (não minuta) nos autos?",
   "regra": {
    "tem": "termo_aditivo"
   }
  },
  {
   "id": "tem_termo_extincao",
   "tipo": "noul",
   "rotulo": "termo de extinção",
   "pergunta": "Há termo ou minuta de extinção/rescisão contratual nos autos?",
   "regra": {
    "tem": "termo_extincao"
   }
  },
  {
   "id": "tem_tr",
   "tipo": "noul",
   "rotulo": "TR",
   "pergunta": "Há Termo de Referência (TR) nos autos?",
   "regra": {
    "tem": "tr"
   }
  },
  {
   "id": "algum_documento_depois_do_dvi",
   "tipo": "noul",
   "rotulo": "algum documento depois do DVI ou da devolução",
   "pergunta": "Algum documento foi juntado depois do último 'DVI' ou do último despacho de devolução da Gelic?",
   "regra": {
    "depois_de": [
     "*",
     "dvi|despacho_devolucao"
    ]
   }
  },
  {
   "id": "despacho_projur_depois_de_formulario_alteracao",
   "tipo": "noul",
   "rotulo": "despacho à Projur depois de pedido de alteração contratual",
   "pergunta": "Algum documento 'despacho à Projur' foi juntado depois do último 'pedido de alteração contratual'? (Se não há 'pedido de alteração contratual' nos autos, responda sim quando houver 'despacho à Projur'.)",
   "regra": {
    "depois_de": [
     "despacho_projur",
     "formulario_alteracao"
    ]
   }
  },
  {
   "id": "despacho_projur_depois_de_informacao_inexecucao",
   "tipo": "noul",
   "rotulo": "despacho à Projur depois de informação de inexecução",
   "pergunta": "Algum documento 'despacho à Projur' foi juntado depois do último 'informação de inexecução'? (Se não há 'informação de inexecução' nos autos, responda sim quando houver 'despacho à Projur'.)",
   "regra": {
    "depois_de": [
     "despacho_projur",
     "informacao_inexecucao"
    ]
   }
  },
  {
   "id": "despacho_projur_depois_de_parecer",
   "tipo": "noul",
   "rotulo": "despacho à Projur depois de parecer jurídico",
   "pergunta": "Algum documento 'despacho à Projur' foi juntado depois do último 'parecer jurídico'? (Se não há 'parecer jurídico' nos autos, responda sim quando houver 'despacho à Projur'.)",
   "regra": {
    "depois_de": [
     "despacho_projur",
     "parecer"
    ]
   }
  },
  {
   "id": "despacho_reserva_depois_de_formulario_alteracao",
   "tipo": "noul",
   "rotulo": "despacho de reserva depois de pedido de alteração contratual",
   "pergunta": "Algum documento 'despacho de reserva' foi juntado depois do último 'pedido de alteração contratual'? (Se não há 'pedido de alteração contratual' nos autos, responda sim quando houver 'despacho de reserva'.)",
   "regra": {
    "depois_de": [
     "despacho_reserva",
     "formulario_alteracao"
    ]
   }
  },
  {
   "id": "dvi_depois_de_contrato",
   "tipo": "noul",
   "rotulo": "DVI depois de contrato celebrado",
   "pergunta": "Algum documento 'DVI' foi juntado depois do último 'contrato celebrado'? (Se não há 'contrato celebrado' nos autos, responda sim quando houver 'DVI'.)",
   "regra": {
    "depois_de": [
     "dvi",
     "contrato"
    ]
   }
  },
  {
   "id": "formulario_alteracao_depois_de_contrato",
   "tipo": "noul",
   "rotulo": "pedido de alteração contratual depois de contrato celebrado",
   "pergunta": "Algum documento 'pedido de alteração contratual' foi juntado depois do último 'contrato celebrado'? (Se não há 'contrato celebrado' nos autos, responda sim quando houver 'pedido de alteração contratual'.)",
   "regra": {
    "depois_de": [
     "formulario_alteracao",
     "contrato"
    ]
   }
  },
  {
   "id": "novidade_depois_do_empenho",
   "tipo": "noul",
   "rotulo": "informação de inexecução ou notificação ou despacho à Projur ou parecer jurídico ou pedido de alteração contratual depois de nota de empenho",
   "pergunta": "Algum documento 'informação de inexecução ou notificação ou despacho à Projur ou parecer jurídico ou pedido de alteração contratual' foi juntado depois do último 'nota de empenho'? (Se não há 'nota de empenho' nos autos, responda sim quando houver 'informação de inexecução ou notificação ou despacho à Projur ou parecer jurídico ou pedido de alteração contratual'.)",
   "regra": {
    "depois_de": [
     "informacao_inexecucao|notificacao|despacho_projur|parecer|formulario_alteracao",
     "nota_empenho"
    ]
   }
  },
  {
   "id": "minuta_aditivo_depois_de_dvi_ou_reserva",
   "tipo": "noul",
   "rotulo": "minuta de aditivo depois de DVI ou despacho de reserva",
   "pergunta": "Algum documento 'minuta de aditivo' foi juntado depois do último 'DVI ou despacho de reserva'? (Se não há 'DVI ou despacho de reserva' nos autos, responda sim quando houver 'minuta de aditivo'.)",
   "regra": {
    "depois_de": [
     "minuta_aditivo",
     "dvi|despacho_reserva"
    ]
   }
  },
  {
   "id": "minuta_aditivo_depois_de_formulario_alteracao",
   "tipo": "noul",
   "rotulo": "minuta de aditivo depois de pedido de alteração contratual",
   "pergunta": "Algum documento 'minuta de aditivo' foi juntado depois do último 'pedido de alteração contratual'? (Se não há 'pedido de alteração contratual' nos autos, responda sim quando houver 'minuta de aditivo'.)",
   "regra": {
    "depois_de": [
     "minuta_aditivo",
     "formulario_alteracao"
    ]
   }
  },
  {
   "id": "empenho_depois_do_instrumento",
   "tipo": "noul",
   "rotulo": "nota de empenho depois de termo aditivo celebrado ou contrato celebrado ou apostila",
   "pergunta": "Algum documento 'nota de empenho' foi juntado depois do último 'termo aditivo celebrado ou contrato celebrado ou apostila'? (Se não há 'termo aditivo celebrado ou contrato celebrado ou apostila' nos autos, responda sim quando houver 'nota de empenho'.)",
   "regra": {
    "depois_de": [
     "nota_empenho",
     "termo_aditivo|contrato|apostila"
    ]
   }
  },
  {
   "id": "parecer_depois_de_despacho_projur",
   "tipo": "noul",
   "rotulo": "parecer jurídico depois de despacho à Projur",
   "pergunta": "Algum documento 'parecer jurídico' foi juntado depois do último 'despacho à Projur'? (Se não há 'despacho à Projur' nos autos, responda sim quando houver 'parecer jurídico'.)",
   "regra": {
    "depois_de": [
     "parecer",
     "despacho_projur"
    ]
   }
  },
  {
   "id": "termo_aditivo_depois_de_formulario_alteracao",
   "tipo": "noul",
   "rotulo": "termo aditivo celebrado depois de pedido de alteração contratual",
   "pergunta": "Algum documento 'termo aditivo celebrado' foi juntado depois do último 'pedido de alteração contratual'? (Se não há 'pedido de alteração contratual' nos autos, responda sim quando houver 'termo aditivo celebrado'.)",
   "regra": {
    "depois_de": [
     "termo_aditivo",
     "formulario_alteracao"
    ]
   }
  },
  {
   "id": "instrumento_depois_do_pedido",
   "tipo": "noul",
   "rotulo": "termo aditivo celebrado ou contrato celebrado ou apostila depois de pedido de alteração contratual ou DVI ou despacho de reserva",
   "pergunta": "Algum documento 'termo aditivo celebrado ou contrato celebrado ou apostila' foi juntado depois do último 'pedido de alteração contratual ou DVI ou despacho de reserva'? (Se não há 'pedido de alteração contratual ou DVI ou despacho de reserva' nos autos, responda sim quando houver 'termo aditivo celebrado ou contrato celebrado ou apostila'.)",
   "regra": {
    "depois_de": [
     "termo_aditivo|contrato|apostila",
     "formulario_alteracao|dvi|despacho_reserva"
    ]
   }
  },
  {
   "id": "tipo_pedido_alteracao",
   "tipo": "choice",
   "rotulo": "tipo do pedido de alteração contratual",
   "pergunta": "O pedido (ou formulário) de alteração contratual mais recente dos autos pede o quê?",
   "opcoes": {
    "prorrogacao": "prorrogação do prazo de vigência",
    "acrescimo_supressao": "acréscimo ou supressão quantitativa do objeto",
    "reajuste_repactuacao": "reajuste ou repactuação de preços",
    "nao_identificavel": "não há pedido de alteração, ou os autos não permitem dizer"
   },
   "aplica_se": "formulario_alteracao",
   "regra": {
    "marca": "formulario_alteracao",
    "valores": {
     "prorrogacao": "prorrogacao",
     "acrescimo_supressao": "acrescimo_supressao",
     "reajuste": "reajuste_repactuacao"
    }
   }
  },
  {
   "id": "edital_registro_precos",
   "tipo": "noul",
   "rotulo": "edital de registro de preços (SRP)",
   "pergunta": "O edital mais recente dos autos é para registro de preços (SRP)?",
   "aplica_se": "edital",
   "regra": {
    "marca": "edital",
    "valores": {
     "registro_precos": true
    }
   }
  },
  {
   "id": "instrumento_alteracao",
   "tipo": "choice",
   "rotulo": "instrumento da alteração contratual",
   "pergunta": "Pelos autos, a alteração contratual pedida será formalizada por qual instrumento?",
   "opcoes": {
    "termo_aditivo": "termo aditivo",
    "apostila": "apostila (apostilamento)",
    "nao_identificavel": "os autos não permitem dizer"
   },
   "aplica_se": "formulario_alteracao",
   "regra": null
  },
  {
   "id": "objeto_contrato",
   "tipo": "choice",
   "rotulo": "objeto da contratação",
   "pergunta": "Qual é a natureza do objeto da contratação?",
   "opcoes": {
    "compras": "compra ou fornecimento de bens",
    "servicos": "prestação de serviços",
    "obras": "obra ou serviço de engenharia",
    "nao_identificavel": "os autos não permitem dizer"
   },
   "regra": null
  },
  {
   "id": "forma_contratacao_direta",
   "tipo": "choice",
   "rotulo": "forma da contratação direta",
   "pergunta": "Se é contratação direta, por qual forma?",
   "opcoes": {
    "dispensa_eletronica": "dispensa eletrônica (com disputa)",
    "sem_disputa": "inexigibilidade ou dispensa sem disputa",
    "nao_identificavel": "não é contratação direta, ou os autos não permitem dizer"
   },
   "regra": {
    "marca_em_algum": {
     "dispensa_eletronica": "dispensa_eletronica",
     "inexigibilidade": "sem_disputa"
    }
   }
  }
 ]
};
