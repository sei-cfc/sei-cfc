/**
 * Todos os documentos que a Gelic produz, para o seletor "Gerar documento" do selo e para o
 * agente. Dois caminhos:
 *  - análise: DVI, devolução e despacho à Gecont saem da leitura dos autos (skill gelic-gerar-dvi;
 *    a análise decide o formato pelas regras da Gelic);
 *  - modelo: o texto fixo é o do modelo (PROJUR, AGU, CFC, Gelic) e a IA só preenche as variáveis
 *    (skill gelic-documento-modelo, motor em src/modelos/).
 *
 * `tipoSei` é a convenção da Gelic no SEI: o nome do tipo de documento a procurar
 * (sei_opcoes tipos_documento) e, quando o tipo é genérico (Despacho), o nome na árvore. O título
 * na árvore tem de casar com a regra do etapas.json, senão o selo não reconhece o documento.
 */
import type { Resumo } from '../regras/resumo';
import type { Perfil } from '../perfil';

export type Via = 'analise' | 'modelo';
export interface DocumentoGelic {
  id: string;
  nome: string;
  grupo: string;
  via: Via;
  /** Template de regras/modelos (via modelo). */
  modelo?: string;
  tipoSei: { tipo: string; nomeArvore?: string; observacao?: string };
  /** Skill que o pedido do selo nomeia (sem ela, a da via: gelic-gerar-dvi ou gelic-documento-modelo). */
  skill?: string;
  /** Peça sem modelo: o seletor só a mostra, com este motivo, e não oferece gerar. */
  indisponivel?: string;
}

export const GRUPOS = ['Análise da Gelic', 'Despachos', 'Contratação direta', 'Licitação', 'Contratos', 'Alterações contratuais', 'Extinção e sanção'] as const;

export const DOCUMENTOS: readonly DocumentoGelic[] = [
  { id: 'dvi', nome: 'DVI — Despacho de Verificação Inicial', grupo: 'Análise da Gelic', via: 'analise', tipoSei: { tipo: 'DVI' } },
  { id: 'devolucao', nome: 'Despacho de devolução para ajustes', grupo: 'Análise da Gelic', via: 'analise', tipoSei: { tipo: 'Despacho', nomeArvore: 'Devolução para Ajustes', observacao: 'confirme o nome na primeira vez' } },
  // A análise decide QUANDO é Gecont (nenhum impeditivo); o texto sai do modelo despacho-gecont-reserva.
  { id: 'gecont', nome: 'Despacho à Gecont — solicitação de reserva', grupo: 'Análise da Gelic', via: 'analise', modelo: 'despacho-gecont-reserva', tipoSei: { tipo: 'Despacho', nomeArvore: 'Solicitação Reserva Gecont' } },

  { id: 'despacho-projur', nome: 'Despacho de envio à Projur (prorrogação ou extinção)', grupo: 'Despachos', via: 'modelo', modelo: 'despacho-projur', tipoSei: { tipo: 'Despacho', nomeArvore: 'Envio à Projur' } },
  { id: 'despacho-abertura-par', nome: 'Despacho de abertura de PAR', grupo: 'Despachos', via: 'modelo', modelo: 'despacho-abertura-par', tipoSei: { tipo: 'Despacho', nomeArvore: 'Abertura de PAR' } },

  { id: 'autorizacao-contratacao-direta', nome: 'Autorização de contratação direta (inexigibilidade ou dispensa)', grupo: 'Contratação direta', via: 'modelo', modelo: 'autorizacao-contratacao-direta', tipoSei: { tipo: 'Autorização de Contratação Direta', observacao: 'há um tipo por hipótese (ex.: "Autorização de Contratação Direta - Inex - NLL")' } },
  { id: 'aviso-dispensa-eletronica', nome: 'Aviso de dispensa eletrônica', grupo: 'Contratação direta', via: 'modelo', modelo: 'aviso-dispensa-eletronica', tipoSei: { tipo: 'Aviso de Dispensa' } },

  { id: 'agu-edital-pregao', nome: 'Edital de pregão eletrônico (modelo AGU)', grupo: 'Licitação', via: 'modelo', modelo: 'agu-edital-pregao', tipoSei: { tipo: 'Edital' } },
  { id: 'agu-edital-tecnica-preco', nome: 'Edital de concorrência — técnica e preço (modelo AGU)', grupo: 'Licitação', via: 'modelo', modelo: 'agu-edital-tecnica-preco', tipoSei: { tipo: 'Edital' } },
  { id: 'agu-edital-credenciamento', nome: 'Edital de credenciamento (modelo AGU)', grupo: 'Licitação', via: 'modelo', modelo: 'agu-edital-credenciamento', tipoSei: { tipo: 'Edital' } },
  { id: 'agu-ata-registro-precos', nome: 'Ata de registro de preços (modelo AGU)', grupo: 'Licitação', via: 'modelo', modelo: 'agu-ata-registro-precos', tipoSei: { tipo: 'Ata de Registro de Preços' } },

  { id: 'contrato-compras', nome: 'Contrato de compras (modelo PROJUR, contratação direta)', grupo: 'Contratos', via: 'modelo', modelo: 'contrato-compras', tipoSei: { tipo: 'Contrato', observacao: 'título na árvore começando por "Contrato"' } },
  { id: 'contrato-servicos', nome: 'Contrato de serviços (modelo PROJUR, contratação direta)', grupo: 'Contratos', via: 'modelo', modelo: 'contrato-servicos', tipoSei: { tipo: 'Contrato', observacao: 'título na árvore começando por "Contrato"' } },
  { id: 'agu-contrato-compras', nome: 'Contrato de compras (modelo AGU, licitação)', grupo: 'Contratos', via: 'modelo', modelo: 'agu-contrato-compras', tipoSei: { tipo: 'Contrato' } },
  { id: 'agu-contrato-servicos-sem-mo', nome: 'Contrato de serviços sem mão de obra exclusiva (modelo AGU)', grupo: 'Contratos', via: 'modelo', modelo: 'agu-contrato-servicos-sem-mo', tipoSei: { tipo: 'Contrato' } },
  { id: 'agu-contrato-servicos-com-mo', nome: 'Contrato de serviços com mão de obra exclusiva (modelo AGU)', grupo: 'Contratos', via: 'modelo', modelo: 'agu-contrato-servicos-com-mo', tipoSei: { tipo: 'Contrato' } },
  { id: 'agu-contrato-obras', nome: 'Contrato de obras e serviços de engenharia (modelo AGU)', grupo: 'Contratos', via: 'modelo', modelo: 'agu-contrato-obras', tipoSei: { tipo: 'Contrato' } },

  { id: 'termo-aditivo-prorrogacao', nome: 'Termo aditivo de prorrogação (Lei 14.133)', grupo: 'Alterações contratuais', via: 'modelo', modelo: 'termo-aditivo-prorrogacao', tipoSei: { tipo: 'Termo Aditivo', observacao: 'minuta: título com "Minuta de Termo Aditivo"' } },
  { id: 'termo-aditivo-prorrogacao-8666', nome: 'Termo aditivo de prorrogação (contrato da Lei 8.666)', grupo: 'Alterações contratuais', via: 'modelo', modelo: 'termo-aditivo-prorrogacao-8666', tipoSei: { tipo: 'Termo Aditivo', observacao: 'minuta: título com "Minuta de Termo Aditivo"' } },
  { id: 'termo-aditivo-alteracao', nome: 'Termo aditivo de acréscimo ou supressão', grupo: 'Alterações contratuais', via: 'modelo', modelo: 'termo-aditivo-alteracao', tipoSei: { tipo: 'Termo Aditivo', observacao: 'minuta: título com "Minuta de Termo Aditivo"' } },
  { id: 'termo-apostilamento-reajuste', nome: 'Termo de apostilamento de reajuste', grupo: 'Alterações contratuais', via: 'modelo', modelo: 'termo-apostilamento-reajuste', tipoSei: { tipo: 'Termo de Apostilamento' } },

  { id: 'termo-extincao-unilateral', nome: 'Termo de extinção unilateral', grupo: 'Extinção e sanção', via: 'modelo', modelo: 'termo-extincao-unilateral', tipoSei: { tipo: 'Termo de Extinção', observacao: 'minuta: título com "Minuta de Termo de Extinção"' } },
];

export const DOCUMENTO: Readonly<Record<string, DocumentoGelic>> = Object.fromEntries(DOCUMENTOS.map(d => [d.id, d]));

/**
 * O que cada perfil vê no "Gerar documento". A Gelic, o catálogo inteiro. O CFC (quem instrui o
 * processo) não vê as peças de análise e de contrato da Gelic: o grupo dele tem os modelos do demandante
 * portados do app "gera" do PCA (src/modelos/cfc.ts, skill cfc-documento). ETP, TR e mapa de riscos (feitos no
 * Compras.gov.br) aparecem como indisponíveis.
 */
export interface Catalogo {
  grupos: readonly string[];
  documentos: readonly DocumentoGelic[];
  /** Texto do grupo sem documentos. */
  aviso?: string;
}
export const GRUPO_DEMANDANTE = 'Peças do demandante';
/**
 * O gera não grava no SEI, então não há tipo de documento conhecido para estas peças: o agente pergunta ao
 * usuário e confere com sei_opcoes; o nome na árvore é o rótulo do gera.
 */
export const TIPO_A_CONFIRMAR = 'a confirmar';
const tipoCfc = (nomeArvore: string) => ({ tipo: TIPO_A_CONFIRMAR, nomeArvore, observacao: 'tipo de documento do SEI ainda não mapeado: pergunte ao usuário e confira com sei_opcoes' });
const cfc = (id: string, nome: string, nomeArvore: string): DocumentoGelic =>
  ({ id, nome, grupo: GRUPO_DEMANDANTE, via: 'modelo', modelo: id, skill: 'cfc-documento', tipoSei: tipoCfc(nomeArvore) });
const semModelo = (id: string, nome: string, nomeArvore: string, motivo: string): DocumentoGelic =>
  ({ id, nome, grupo: GRUPO_DEMANDANTE, via: 'modelo', indisponivel: motivo, tipoSei: tipoCfc(nomeArvore) });

/**
 * ETP, TR e mapa de riscos são feitos no Compras.gov.br, pela mesma extensão (decisão de 2026-10-10); no SEI entra o PDF exportado.
 * O motor do TR (regras/modelos-cfc/tr) continua no repositório para a paridade com o gera: só o formulário sai.
 */
const NO_COMPRAS = 'feito no Compras.gov.br: junte ao processo o PDF exportado de lá';

/** As peças do demandante com formulário ou feitas no Compras, na ordem da sequência (regras/modelos-cfc/sequencia.json). */
export const DOCUMENTOS_CFC: readonly DocumentoGelic[] = [
  cfc('dfd', 'DFD — Documento de Formalização da Demanda', 'Documento de Formalização da Demanda (DFD)'),
  cfc('termos_cientificacao', 'Termos de cientificação', 'Termos de cientificação'),
  semModelo('etp', 'ETP — Estudo Técnico Preliminar', 'Estudo Técnico Preliminar (ETP)', NO_COMPRAS),
  cfc('mapa_precos', 'Mapa comparativo de preços', 'Mapa Comparativo de Preços'),
  semModelo('mapa_riscos', 'Mapa de riscos', 'Mapa de Riscos', NO_COMPRAS),
  // modelo: o motor ainda o conhece (paridade); indisponivel: nem o selo nem o agente o oferecem
  { ...semModelo('tr', 'TR — Termo de Referência', 'Termo de Referência', NO_COMPRAS), modelo: 'tr' },
  // entre unidades, o padrão é despacho, não memorando (2026-10-10): tipo Despacho, como os despachos da Gelic
  { ...cfc('despacho_delic', 'Despacho de envio à Gelic', 'Envio à Gelic'), tipoSei: { tipo: 'Despacho', nomeArvore: 'Envio à Gelic' } },
];

export const CATALOGOS: Readonly<Record<Perfil, Catalogo>> = {
  gelic: { grupos: GRUPOS, documentos: DOCUMENTOS },
  cfc: { grupos: [GRUPO_DEMANDANTE], documentos: DOCUMENTOS_CFC },
};

/** Etapas em que o próximo documento sai da análise (o formato exato a skill decide). */
const PELA_ANALISE: Readonly<Record<string, string[]>> = {
  preparatoria_analise: ['dvi'],
  alteracao_analise: ['dvi'],
  preparatoria_reexame: ['devolucao', 'gecont'],
  alteracao_reexame: ['devolucao', 'gecont'],
};

/** Documentos sugeridos pela etapa (na ordem: o que a regra aponta primeiro), só os do catálogo do perfil. */
export function sugeridos(resumo: Pick<Resumo, 'etapa' | 'modelos'>, catalogo: Catalogo = CATALOGOS.gelic): DocumentoGelic[] {
  const ids = [...(resumo.etapa ? PELA_ANALISE[resumo.etapa] ?? [] : []), ...resumo.modelos];
  const doPerfil = new Map(catalogo.documentos.filter(d => !d.indisponivel).map(d => [d.id, d]));
  return [...new Set(ids)].map(id => doPerfil.get(id)).filter((d): d is DocumentoGelic => !!d);
}

/** Pedido ao agente para gerar o documento (nomeia a skill e o processo: funciona igual em qualquer modelo). */
export function pedidoDeDocumento(doc: DocumentoGelic, protocolo: string, etapa: string): string {
  if (doc.indisponivel) throw new Error(`${doc.nome}: ${doc.indisponivel}`);
  if (doc.skill) {
    return `Leia a skill ${doc.skill} e siga-a para gerar o documento "${doc.nome}" (modelo ${doc.modelo}) no processo ${protocolo}.${etapa ? ` O selo indica a etapa "${etapa}".` : ''}`;
  }
  const contexto = etapa ? ` O selo da Gelic indica a etapa "${etapa}".` : '';
  if (doc.via === 'analise') {
    return `Leia a skill gelic-gerar-dvi e siga-a para preparar o documento "${doc.nome}" do processo ${protocolo}. Se as regras da Gelic indicarem outro formato para esta etapa (DVI, devolução ou despacho à Gecont), explique antes de propor.${contexto}`;
  }
  return `Leia a skill gelic-documento-modelo e siga-a para gerar o documento "${doc.nome}" (modelo ${doc.modelo}) no processo ${protocolo}.${contexto}`;
}
