/**
 * Como o selo abre a janela do formulário das peças: como ABA na mesma janela do navegador, nunca popup. A ponte do
 * agente (PontePainel, do upstream) só enxerga as abas do SEI da janela em que a página está; numa janela própria, a
 * aba do processo some e a peça não abre. Na mesma janela, o painel lateral (gancho G1) também funciona.
 */
export const urlDaPeca = (modelo: string, protocolo: string, documento?: string) =>
  `js/gelic/peca.html?modelo=${encodeURIComponent(modelo)}&processo=${encodeURIComponent(protocolo)}${documento ? `&documento=${encodeURIComponent(documento)}` : ''}`;

/** Nome da aba por processo e peça: clicar de novo volta à mesma aba, em vez de abrir outra que disputaria a ponte. */
export const alvoDaPeca = (modelo: string, protocolo: string) => `gelic-peca-${modelo}-${protocolo.replace(/\D/g, '')}`;

export function abrirPeca(abrir: (url: string, alvo: string) => unknown, modelo: string, protocolo: string, documento?: string): void {
  abrir(urlDaPeca(modelo, protocolo, documento), alvoDaPeca(modelo, protocolo));
}

/** A verificação prévia do processo (src/verificacao/): também como aba, uma por processo. */
export const urlDaVerificacao = (protocolo: string) => `js/gelic/verificar.html?processo=${encodeURIComponent(protocolo)}`;
export const alvoDaVerificacao = (protocolo: string) => `gelic-verificar-${protocolo.replace(/\D/g, '')}`;
export function abrirVerificacao(abrir: (url: string, alvo: string) => unknown, protocolo: string): void {
  abrir(urlDaVerificacao(protocolo), alvoDaVerificacao(protocolo));
}
