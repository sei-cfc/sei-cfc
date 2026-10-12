/**
 * O diagnóstico em palavras: o mesmo resumo alimenta o selo da árvore e a ferramenta
 * `gelic_etapa` do agente, para os dois dizerem exatamente a mesma coisa.
 */
import { diagnosticar, ETAPA, FATO, MOTIVO_SEM_LIMITES, nomeModelo, type Diagnostico, type Opcao, type ValorFato } from './motor';
import { rotulo, type Tom } from './rotulos';

export interface DocumentoChave { numero: string; titulo: string; tipo: string }

export interface Resumo {
  /** null: nenhuma etapa do rito casa com os títulos. */
  etapa: string | null;
  nome: string;
  tom: Tom | 'fora';
  descricao: string;
  /** O que fazer agora: documento a produzir, ação, ou a escolha que falta. */
  proximo: string;
  /** Quando os títulos não bastam para escolher o documento: as opções, em palavras. */
  opcoes: string[];
  /** Modelos (templates) que a etapa aponta: um, ou as opções entre as quais escolher. */
  modelos: string[];
  /** Fatos que decidiram, em palavras: "Há: DVI", "Ainda não há: contrato, …" e os de ordem ("Algum documento depois de DVI: não"). */
  decisivos: string[];
  documentosChave: DocumentoChave[];
}

/** Os textos do etapas.json foram escritos para a skill do Claude Code; na tela do SEI, quem decide é a análise. */
const naTela = (s: string) => s.replace(/\ba skill\b/g, 'a análise');
const valor = (v: ValorFato) => (v === true ? 'sim' : v === false ? 'não' : v === null ? 'não se sabe pelos títulos' : v);
const frase = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const textoOpcao = (op: Opcao | undefined, id: string) =>
  op?.template ? nomeModelo(op.template) : op?.acao ? frase(naTela(op.acao)) : nomeModelo(id);

/** Presença junta numa linha (o que há, o que falta); ordem e escolha, um por linha. */
function porque(decisivos: Diagnostico['decisivos']): string[] {
  const presenca = (v: boolean) => decisivos.filter(f => FATO[f.id].regra?.tem !== undefined && f.valor === v).map(f => f.rotulo);
  const ha = presenca(true);
  const falta = presenca(false);
  const outros = decisivos.filter(f => FATO[f.id].regra?.tem === undefined).map(f => `${frase(f.rotulo)}: ${valor(f.valor)}`);
  return [...(ha.length ? [`Há: ${ha.join(', ')}`] : []), ...(falta.length ? [`Ainda não há: ${falta.join(', ')}`] : []), ...outros];
}

export function resumir(documentos: readonly { titulo: string; numero?: string }[]): Resumo {
  const d = diagnosticar(documentos.map(x => x.titulo));
  const documentosChave = d.reconhecidos.map(r => ({ numero: documentos[r.ordem - 1]?.numero ?? '', titulo: r.titulo, tipo: r.tipo }));
  if (!d.etapa || !d.resolucao) {
    return {
      etapa: null,
      nome: 'Fora do rito da Gelic',
      tom: 'fora',
      descricao: 'Nenhuma etapa do rito da Gelic casa com os títulos dos documentos deste processo.',
      proximo: 'Nada a sugerir pelos títulos. Se este processo é de contratação, confira se os documentos têm os títulos usuais (DFD, ETP, TR, DVI…).',
      opcoes: [],
      modelos: [],
      decisivos: [],
      documentosChave,
    };
  }
  const etapa = ETAPA[d.etapa];
  const { documento, opcoes, motivo } = d.resolucao;
  let proximo: string;
  let textosOpcoes: string[] = [];
  const modelos = documento?.template
    ? [documento.template]
    : (opcoes ?? []).map(id => etapa.documento.opcoes?.[id]?.template).filter((t): t is string => !!t);
  if (documento?.template) proximo = `Produzir: ${nomeModelo(documento.template)}${documento.fundamento ? ` (${documento.fundamento})` : ''}.`;
  else if (documento?.acao) proximo = `${frase(naTela(documento.acao))}.`;
  else {
    textosOpcoes = (opcoes ?? []).map(id => textoOpcao(etapa.documento.opcoes?.[id], id));
    // Sem o valor da contratação, a extensão não aplica a Portaria 233: o motivo útil é o da etapa.
    const porque = motivo === MOTIVO_SEM_LIMITES ? etapa.documento.motivo : motivo;
    proximo = `Escolher o documento${porque ? `: ${porque}` : ''}.`;
  }
  const r = rotulo(d.etapa);
  return {
    etapa: d.etapa,
    nome: r.nome,
    tom: r.tom,
    descricao: naTela(d.descricao ?? ''),
    proximo,
    opcoes: textosOpcoes,
    modelos,
    decisivos: porque(d.decisivos),
    documentosChave,
  };
}
