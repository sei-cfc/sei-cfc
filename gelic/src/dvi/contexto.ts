/**
 * Ponte entre as duas metades do DVI: o pacote da preparação (src/dvi/preparar) vira o contexto que o
 * validador e o montador (src/dvi/montar) conferem. Função pura.
 *
 * - documentos: os lidos (com texto) e os não lidos que continuam nos autos (fora: sigilosos e cancelados),
 *   em ordem de nº SEI (o pacote não guarda a ordem da árvore dos não lidos; o SEI cresce com ela).
 *   Assinatura: a do pacote para os lidos; para os demais, a checagem `sem_assinatura`, que olha todos.
 * - textos: o texto que a IA viu, sem o envelope.
 * - checagens: as mecânicas, no formato do validador (os SEIs de cada candidato).
 */
import type { Checagens, ContextoDvi, DocumentoArvore } from './montar/achados';
import { classeDoc } from './preparar/fatos';
import type { PacoteDvi } from './preparar/index';
import { brlParaFloat } from './preparar/texto';

const FORA_DOS_AUTOS = /^(sigiloso|cancelado)/;
const REGRA_CRONOLOGIA: [RegExp, string][] = [
  [/^DFD\b/, 'dfd_posterior'],
  [/^Despacho de encaminhamento/, 'apos_encaminhamento'],
  [/^Termos de cientifica/, 'cientificacao_antes'],
];

/** Tira o envelope `<documento id nonce>…</documento nonce>` que a preparação pôs no texto. */
export const semEnvelope = (t: string) => t.replace(/^<documento [^>]*>\n/, '').replace(/\n<\/documento [^>]*>$/, '');

/** Valores do MCP sem proposta, do texto da checagem ("…(fontes): R$ a, R$ b. Observação: …"). */
function valoresMcp(texto: string): number[] {
  const corpo = texto.split('. Observação:')[0];
  const ini = corpo.lastIndexOf('): ');
  return [...corpo.slice(ini < 0 ? 0 : ini).matchAll(/R\$\s*(-?[\d.]+,\d{2})/g)].map(m => brlParaFloat(m[1]));
}

export function contextoDoPacote(p: PacoteDvi): ContextoDvi {
  const semAss = new Map<string, boolean>(); // sei → digitalizado
  for (const c of p.checagens) if (c.tipo === 'sem_assinatura') semAss.set(c.sei[0], /digitalizado/.test(c.texto));
  const documentos: DocumentoArvore[] = p.documentos.map(d => ({
    numero: d.numero, titulo: d.titulo, tipo: d.tipo,
    assinado: d.assinado && !semAss.has(d.numero),
    ...(semAss.get(d.numero) ? { digitalizado: true } : {}),
    classe: classeDoc({ seq: 0, titulo: d.titulo }, d.conteudo ? { 0: d.conteudo } : {}),
  }));
  const vistos = new Set(documentos.map(d => d.numero));
  for (const n of p.limites.documentosNaoLidos) {
    if (vistos.has(n.numero) || !n.titulo || FORA_DOS_AUTOS.test(n.motivo)) continue;
    vistos.add(n.numero);
    const digitalizado = semAss.get(n.numero) || /digitalizado/.test(n.motivo);
    documentos.push({
      numero: n.numero, titulo: n.titulo, assinado: !semAss.has(n.numero),
      ...(digitalizado ? { digitalizado: true } : {}),
      classe: classeDoc({ seq: 0, titulo: n.titulo }),
    });
  }
  documentos.sort((a, b) => Number(a.numero) - Number(b.numero) || (a.numero < b.numero ? -1 : 1));

  const seis = (tipo: string) => [...new Set(p.checagens.filter(c => c.tipo === tipo).flatMap(c => c.sei))];
  const checagens: Checagens = {
    processosDivergentes: seis('processo_divergente'),
    citadosAusentes: seis('citado_ausente'),
    tituloConteudo: seis('titulo_x_conteudo'),
    cronologia: p.checagens.filter(c => c.tipo === 'cronologia')
      .map(c => ({ regra: REGRA_CRONOLOGIA.find(([re]) => re.test(c.texto))?.[1] ?? 'cronologia', seis: c.sei })),
    mcpSemProposta: p.checagens.filter(c => c.tipo === 'mcp_sem_proposta').flatMap(c => valoresMcp(c.texto)),
  };
  return {
    processo: p.processo,
    documentos,
    textos: Object.fromEntries(p.documentos.map(d => [d.numero, semEnvelope(d.texto)])),
    checklist: { familia: p.familia, series: p.series },
    checagens,
    dviAnterior: p.dviAnterior?.numero ?? null,
  };
}
