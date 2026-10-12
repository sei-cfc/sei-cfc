/**
 * Página de configuração do PCA (js/gelic/pca.html): endereço, token pessoal e "Testar conexão". Aberta pelo selo
 * ("Configurar o PCA"). Só nós de texto; o token nunca é mostrado de volta, só se há um guardado.
 */
import type { Area } from '../peca/guardados';
import type { ConfigPca } from './cliente';
import { URL_PADRAO, type RespostaSaude } from './contrato';
import { apagarConfigPca, guardarConfigPca, lerConfigPca, validarUrl } from './config';

export interface DepsPaginaPca {
  area: Area;
  /** GET /saude com o token: lança ErroPca com a mensagem em palavras. */
  testar: (c: ConfigPca) => Promise<RespostaSaude>;
}

type Filho = Node | string | null | undefined | false;
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filho[]): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}

export async function montarPaginaPca(doc: Document, deps: DepsPaginaPca): Promise<void> {
  const raiz = doc.getElementById('gelic-peca')!;
  const atual = await lerConfigPca(deps.area);
  const url = el(doc, 'input', { type: 'text', id: 'gelic-pca-url', 'data-gelic-pca': 'url', autocomplete: 'off', spellcheck: 'false' }) as HTMLInputElement;
  url.value = atual?.url ?? URL_PADRAO;
  const token = el(doc, 'input', { type: 'password', id: 'gelic-pca-token', 'data-gelic-pca': 'token', autocomplete: 'off', spellcheck: 'false',
    placeholder: atual ? 'token guardado: deixe em branco para manter' : 'cole aqui o token gerado em Meu perfil, no PCA' }) as HTMLInputElement;
  const status = el(doc, 'p', { class: 'gelic-faixa', role: 'status', 'data-gelic-pca': 'status' },
    atual ? `Configurado${atual.usuario ? ` como ${atual.usuario}` : ''}${atual.pode_enviar === undefined ? '' : atual.pode_enviar ? ' · pode enviar a coleta' : ' · só consulta'}${atual.pode_instruir ? ' · pode vincular processos' : ''}.` : 'Sem configuração: nada é enviado ao PCA.');
  const botao = (acao: string, rotulo: string, primario = false) =>
    el(doc, 'button', { type: 'button', 'data-gelic-acao': acao, class: primario ? 'gelic-botao gelic-primario' : 'gelic-botao' }, rotulo) as HTMLButtonElement;
  const salvar = botao('salvar', 'Testar e guardar', true);
  const apagar = botao('apagar', 'Apagar a configuração');
  apagar.hidden = !atual;

  const mostrar = (texto: string, tom: 'ok' | 'erro' | 'falta') => {
    status.textContent = texto;
    status.className = `gelic-faixa${tom === 'ok' ? '' : tom === 'erro' ? ' gelic-faixa-erro' : ' gelic-faixa-falta'}`;
  };

  salvar.addEventListener('click', async () => {
    const u = validarUrl(url.value);
    if (!u) return mostrar('Endereço inválido: use o endereço https do PCA (ex.: https://pca.sistemascfc.org).', 'erro');
    const t = token.value.trim() || atual?.token || '';
    if (!t) return mostrar('Cole o token gerado em Meu perfil, no PCA.', 'falta');
    salvar.disabled = true;
    mostrar('Testando a conexão…', 'falta');
    try {
      const s = await deps.testar({ url: u, token: t });
      await guardarConfigPca(deps.area, { url: u, token: t, ...(s.usuario ? { usuario: s.usuario } : {}), pode_enviar: !!s.pode_enviar,
        ...(typeof s.pode_instruir === 'boolean' ? { pode_instruir: s.pode_instruir } : {}), conferido_em: Date.now() });
      token.value = '';
      token.placeholder = 'token guardado: deixe em branco para manter';
      apagar.hidden = false;
      mostrar(`Conectado como ${s.usuario ?? '(usuário sem e-mail)'}${s.pode_enviar ? ' · pode enviar a coleta dos processos' : ' · só consulta (sem permissão de editar o PCA)'}${s.pode_instruir ? ' · pode vincular processos' : ''}. Guardado.`, 'ok');
    } catch (e) {
      mostrar(`Não guardado: ${(e as Error).message}.`, 'erro');
    } finally {
      salvar.disabled = false;
    }
  });
  apagar.addEventListener('click', async () => {
    await apagarConfigPca(deps.area);
    token.value = '';
    token.placeholder = 'cole aqui o token gerado em Meu perfil, no PCA';
    apagar.hidden = true;
    mostrar('Configuração apagada: nada é enviado ao PCA.', 'falta');
  });

  raiz.replaceChildren(
    el(doc, 'div', { class: 'gelic-cab' }, el(doc, 'h1', {}, 'PCA · configuração'),
      el(doc, 'p', {}, 'Liga o SEI Pro ao sistema do Plano de Contratações Anual (PCA) do CFC.')),
    status,
    el(doc, 'div', { class: 'gelic-campo' }, el(doc, 'label', { for: 'gelic-pca-url' }, 'Endereço do PCA'), url),
    el(doc, 'div', { class: 'gelic-campo' }, el(doc, 'label', { for: 'gelic-pca-token' }, 'Token pessoal'), token,
      el(doc, 'span', { class: 'gelic-origem' }, 'Gere em Meu perfil, no PCA. Ele aparece uma vez só; gerar outro revoga o anterior.')),
    el(doc, 'div', { class: 'gelic-botoes' }, salvar, apagar),
    el(doc, 'h2', {}, 'O que a extensão faz com o PCA'),
    el(doc, 'ul', {},
      el(doc, 'li', {}, 'Mostra no selo o item do PCA ligado ao processo.'),
      el(doc, 'li', {}, 'No SEI CFC Gelic, com permissão de editar o PCA: ao abrir um processo que mudou, envia o histórico e os instrumentos contratuais (contrato, aditivo, apostilamento...), e o PCA atualiza o acompanhamento do item.'),
      el(doc, 'li', {}, 'No DFD do SEI CFC: preenche o item e o exercício do PCA.'),
      el(doc, 'li', {}, 'No "Iniciar processo" do SEI CFC: busca o item (objeto, valor, via) e, com permissão de instruir (grupo demandante), vincula o processo criado ao item.'),
      el(doc, 'li', {}, 'Processo sigiloso nunca é lido; documento restrito vai sem conteúdo. Nada é gravado no SEI sem a sua confirmação.')),
  );
}
