/**
 * Montagem dos documentos da análise da Gelic (porte da metade "montar" da skill gelic): a IA escreve só os
 * achados; o código valida, decide o formato (DVI, devolução, despacho à Gecont, comparativo) e desenha o corpo.
 * O motor de modelos entra para o Gecont: quem importa isto no agente deve fazê-lo sob demanda (import()).
 */
export { validarAchados, seriesComAchados, seriesDaFamilia } from './achados';
export type { Achado, Achados, BlocoAchados, Checagens, ContextoDvi, DadosGecont, DocumentoArvore, EntradaChecklist, Familia, StatusChecklist, Validacao } from './achados';
export { dadosGecont, decidirFormato, ErroFormato, ErroMontagem, impede, montarDocumento, NOME_FORMATO, paraHtmlDvi, resumirAchados, resumo } from './montar';
export type { BlocoDvi, ClasseSei, DocumentoMontado, Formato, Pedido, TipoSei } from './montar';
