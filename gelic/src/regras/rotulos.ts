/**
 * Nome curto de cada etapa do etapas.json, para caber no selo da árvore. A descrição longa
 * continua vindo do etapas.json. O teste exige um rótulo por etapa: etapa nova na skill
 * quebra o teste até ganhar nome aqui (na tela, sem rótulo, aparece o id).
 *
 * `tom`: acao = a Gelic tem algo a fazer; espera = aguardando outra unidade ou a sessão;
 * fim = nada a fazer pela Gelic.
 */
export type Tom = 'acao' | 'espera' | 'fim';

export const ROTULOS: Readonly<Record<string, { nome: string; tom: Tom }>> = {
  preparatoria_analise: { nome: 'Preparatória · análise inicial (DVI)', tom: 'acao' },
  preparatoria_aguarda_unidade: { nome: 'Preparatória · aguardando a unidade', tom: 'espera' },
  preparatoria_reexame: { nome: 'Preparatória · reexame', tom: 'acao' },
  autorizacao: { nome: 'Contratação direta · autorização, aviso ou Projur', tom: 'acao' },
  direta_pos_parecer: { nome: 'Contratação direta · pós-parecer', tom: 'acao' },
  contratacao_projur: { nome: 'Contratação · envio à Projur', tom: 'acao' },
  licitacao_em_andamento: { nome: 'Licitação em andamento', tom: 'espera' },
  contrato_licitacao: { nome: 'Licitação homologada · contrato', tom: 'acao' },
  ata_registro_precos: { nome: 'Registro de preços · ata', tom: 'acao' },
  contrato_direta: { nome: 'Contratação direta · contrato', tom: 'acao' },
  dispensa_em_andamento: { nome: 'Dispensa eletrônica em andamento', tom: 'espera' },
  dispensa_autorizacao: { nome: 'Dispensa homologada · autorização', tom: 'acao' },
  empenho: { nome: 'Contrato assinado · pedir empenho', tom: 'acao' },
  alteracao_analise: { nome: 'Alteração contratual · análise inicial (DVI)', tom: 'acao' },
  alteracao_aguarda_unidade: { nome: 'Alteração contratual · aguardando a unidade', tom: 'espera' },
  alteracao_reexame: { nome: 'Alteração contratual · reexame', tom: 'acao' },
  aditivo_instrumento_indefinido: { nome: 'Alteração contratual · escolher o instrumento', tom: 'acao' },
  aditivo_minuta_alteracao: { nome: 'Acréscimo/supressão · minuta do aditivo', tom: 'acao' },
  aditivo_minuta_prorrogacao: { nome: 'Prorrogação · minuta do aditivo', tom: 'acao' },
  aditivo_projur_alteracao: { nome: 'Acréscimo/supressão · envio à Projur', tom: 'acao' },
  aditivo_projur_prorrogacao: { nome: 'Prorrogação · envio à Projur', tom: 'acao' },
  aditivo_termo_alteracao: { nome: 'Acréscimo/supressão · termo aditivo', tom: 'acao' },
  aditivo_termo_prorrogacao: { nome: 'Prorrogação · termo aditivo', tom: 'acao' },
  aditivo_assinado: { nome: 'Aditivo assinado · publicar e empenhar', tom: 'acao' },
  concluido: { nome: 'Concluído pela Gelic', tom: 'fim' },
  aguarda_parecer: { nome: 'Aguardando parecer da Projur', tom: 'espera' },
  extincao_projur: { nome: 'Extinção · envio à Projur', tom: 'acao' },
  extincao_termo: { nome: 'Extinção · termo de extinção', tom: 'acao' },
};

export function rotulo(etapa: string): { nome: string; tom: Tom } {
  return ROTULOS[etapa] ?? { nome: etapa.replaceAll('_', ' '), tom: 'acao' };
}
