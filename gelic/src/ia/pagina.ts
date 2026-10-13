/**
 * A página "Configurar a IA" (js/gelic/configurar-ia.html). Só DOM: a configuração do agente, o teste da chave, a
 * lista de modelos e o storage chegam por DepsConfigurarIa (main.ts monta as reais; os testes, as falsas). Texto de
 * fora entra como nó de texto. OpenRouter e Anthropic lado a lado, cada um com o seu passo a passo: o que dá para
 * conferir é conferido; o resto a pessoa marca.
 */
import { formatoDaChave, impressaoDaChave, mesclarConfig, NOME_DO_SERVICO, passosDe, resumoDoEstado, SERVICOS_IA, type ResumoIa, type ServicoIa } from './estado';

export interface ModeloIa { id: string; nome: string; precoEntrada: number; precoSaida: number }
export interface DepsConfigurarIa {
  lerConfig(): Promise<Record<string, unknown> | undefined>;
  gravarConfig(c: Record<string, unknown>): Promise<void>;
  conferir(servico: ServicoIa, chave: string): Promise<{ ok: boolean; limite?: number | null; usado?: number }>;
  /** A permissão do navegador para falar com o serviço (pedida no clique; o OpenRouter não precisa). */
  autorizar(servico: ServicoIa): Promise<boolean>;
  modelos(servico: ServicoIa, chave: string): Promise<ModeloIa[]>;
  lerPassos(): Promise<Record<string, string[]>>;
  gravarPassos(p: Record<string, string[]>): Promise<void>;
  gravarResumo(r: ResumoIa): Promise<void>;
  modeloPadrao: Readonly<Record<ServicoIa, string>>;
  agora(): Date;
}

type Filhos = (Node | string | null | undefined | false)[];
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filhos): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));
const AJUDA: Readonly<Record<ServicoIa, string>> = {
  openrouter: 'Um só cadastro dá acesso a modelos de vários fabricantes, com preço por uso. A chave pode ter limite de gasto, e a extensão confere.',
  anthropic: 'Conta direto com a Anthropic (Claude). O limite de gasto é da organização, no console.',
};

/** `testada`: a chave que passou no teste (editar o campo depois não herda o resultado). */
interface Coluna { conferida: boolean; testada: string; limite?: number | null; usado?: number; modelos: ModeloIa[] }

export async function montarConfigurarIa(doc: Document, deps: DepsConfigurarIa): Promise<void> {
  const raiz = doc.getElementById('gelic-ia')!;
  const config = (await deps.lerConfig().catch(() => undefined)) ?? {};
  const marcados: Record<string, string[]> = await deps.lerPassos().catch(() => ({}));
  const emUso = SERVICOS_IA.includes(config.servico as ServicoIa) && typeof config.chave === 'string' && config.chave ? (config.servico as ServicoIa) : null;
  const aviso = el(doc, 'p', { class: 'gelic-ia-aviso', role: 'status', 'aria-live': 'polite' });

  function coluna(servico: ServicoIa): HTMLElement {
    const estado: Coluna = { conferida: false, testada: '', modelos: [] };
    const daqui = emUso === servico;
    const chave = el(doc, 'input', { type: 'password', 'data-gelic-chave': '', id: `gelic-ia-chave-${servico}`, autocomplete: 'off', spellcheck: 'false' }) as HTMLInputElement;
    chave.value = daqui ? String(config.chave) : '';
    const lista = el(doc, 'datalist', { id: `gelic-ia-modelos-${servico}` });
    const modelo = el(doc, 'input', { type: 'text', 'data-gelic-modelo': '', id: `gelic-ia-modelo-${servico}`, list: `gelic-ia-modelos-${servico}` }) as HTMLInputElement;
    modelo.value = daqui && typeof config.modelo === 'string' && config.modelo ? config.modelo : deps.modeloPadrao[servico];
    const passos = el(doc, 'ol', { class: 'gelic-ia-passos' });
    const status = el(doc, 'p', { class: 'gelic-ia-status', role: 'status', 'aria-live': 'polite' });
    const avisar = (t: string, tom: 'ok' | 'erro' | '' = '') => { status.textContent = t; status.className = `gelic-ia-status${tom ? ` gelic-status-${tom}` : ''}`; };

    const desenharPassos = () => {
      const ps = passosDe(servico, { conferida: estado.conferida, limite: estado.limite, modelo: modelo.value, marcados: marcados[servico] ?? [] });
      passos.replaceChildren(...ps.map(p => {
        const marca = p.tipo === 'manual'
          ? (() => {
            const c = el(doc, 'input', { type: 'checkbox', 'data-gelic-marcar': p.id, 'aria-label': p.texto }) as HTMLInputElement;
            if (p.feito) c.setAttribute('checked', '');
            c.checked = p.feito;
            c.addEventListener('click', () => void (async () => {
              const atual = new Set(marcados[servico] ?? []);
              if (atual.has(p.id)) atual.delete(p.id); else atual.add(p.id);
              marcados[servico] = [...atual];
              await deps.gravarPassos({ ...marcados }).catch(() => undefined);
              desenharPassos();
            })());
            return c;
          })()
          : el(doc, 'span', { class: 'gelic-ia-auto', title: 'conferido pela extensão', 'aria-hidden': 'true' }, p.feito ? '✓' : '○');
        return el(doc, 'li', { 'data-gelic-passo': p.id, 'data-feito': String(p.feito), class: 'gelic-ia-passo' },
          marca, ' ', p.texto, ' ',
          p.link ? el(doc, 'a', { href: p.link, target: '_blank', rel: 'noopener noreferrer' }, 'abrir') : null,
          p.nota ? el(doc, 'small', { class: 'gelic-nota' }, ` ${p.nota}`) : null);
      }));
    };
    modelo.addEventListener('input', desenharPassos);
    chave.addEventListener('input', () => { estado.conferida = false; estado.limite = undefined; desenharPassos(); });

    const testar = el(doc, 'button', { type: 'button', class: 'gelic-botao', 'data-gelic-acao': 'testar' }, 'Testar') as HTMLButtonElement;
    const usar = el(doc, 'button', { type: 'button', class: 'gelic-botao gelic-primario', 'data-gelic-acao': 'usar' }, 'Usar este serviço') as HTMLButtonElement;
    testar.addEventListener('click', () => void (async () => {
      const formato = formatoDaChave(servico, chave.value);
      if (formato) { avisar(formato, 'erro'); return; }
      testar.disabled = true;
      try {
        if (!(await deps.autorizar(servico))) { avisar('Sem a permissão do navegador para falar com o serviço: clique de novo e aceite.', 'erro'); return; }
        avisar('Testando…');
        const testando = chave.value.trim();
        const r = await deps.conferir(servico, testando);
        // a chave mudou durante o teste: o resultado é da anterior
        if (chave.value.trim() !== testando) { avisar('A chave mudou durante o teste: clique em Testar de novo.', 'erro'); return; }
        estado.conferida = r.ok;
        estado.testada = r.ok ? testando : '';
        estado.limite = r.limite;
        estado.usado = r.usado;
        desenharPassos();
        if (!r.ok) { avisar('A chave não respondeu: confira se colou inteira e se a conta tem crédito.', 'erro'); return; }
        const gasto = typeof r.limite === 'number' ? ` Limite de US$ ${r.limite.toFixed(2)}${typeof r.usado === 'number' ? `, usado US$ ${r.usado.toFixed(2)}` : ''}.` : r.limite === null ? ' A chave está sem limite de gasto.' : '';
        avisar(`A chave funcionou.${gasto}`, r.limite === null ? 'erro' : 'ok');
        estado.modelos = await deps.modelos(servico, chave.value.trim()).catch(() => []);
        lista.replaceChildren(...estado.modelos.map(m => el(doc, 'option', { value: m.id }, m.nome)));
      } catch (e) {
        avisar(mensagem(e), 'erro');
      } finally {
        testar.disabled = false;
      }
    })());
    usar.addEventListener('click', () => void (async () => {
      if (!estado.conferida || estado.testada !== chave.value.trim()) { avisar('Teste a chave antes de usar este serviço.', 'erro'); return; }
      if (!modelo.value.trim()) { avisar('Escolha o modelo.', 'erro'); return; }
      usar.disabled = true;
      try {
        const atual = (await deps.lerConfig().catch(() => undefined)) ?? config;
        await deps.gravarConfig(mesclarConfig(atual, { servico, chave: chave.value, modelo: modelo.value }));
        await deps.gravarResumo(resumoDoEstado({
          servico, modelo: modelo.value.trim(), testada: true, impressao: await impressaoDaChave(chave.value),
          ...(estado.limite !== undefined ? { limite: estado.limite } : {}), ...(typeof estado.usado === 'number' ? { usado: estado.usado } : {}), em: deps.agora(),
        }));
        avisar(`Pronto: o SEI CFC usa ${NOME_DO_SERVICO[servico]}, modelo ${modelo.value.trim()}.`, 'ok');
        aviso.textContent = 'Se o painel do agente estiver aberto, feche e abra de novo, para ele ler a configuração nova.';
      } catch (e) {
        avisar(mensagem(e), 'erro');
      } finally {
        usar.disabled = false;
      }
    })());
    desenharPassos();
    return el(doc, 'section', { class: 'gelic-ia-col', 'data-gelic-servico': servico },
      el(doc, 'h2', {}, NOME_DO_SERVICO[servico], daqui ? el(doc, 'span', { class: 'gelic-ia-emuso' }, ' · em uso') : null),
      el(doc, 'p', { class: 'gelic-nota' }, AJUDA[servico]),
      passos,
      el(doc, 'label', { for: `gelic-ia-chave-${servico}` }, 'Chave'), chave,
      el(doc, 'label', { for: `gelic-ia-modelo-${servico}` }, 'Modelo'), modelo, lista,
      el(doc, 'div', { class: 'gelic-botoes' }, testar, usar),
      status);
  }

  raiz.replaceChildren(
    el(doc, 'header', { class: 'gelic-cab' }, el(doc, 'h1', {}, 'Configurar a IA (opcional)'),
      el(doc, 'p', {}, 'A IA é opcional no SEI CFC: a verificação sem IA e os formulários funcionam sem ela. Com ela, a verificação julga o conteúdo e os formulários preenchem o que falta.')),
    el(doc, 'p', { class: 'gelic-nota' }, 'Cada pessoa usa a própria chave. A chave fica só neste navegador e vai só ao serviço escolhido; a página do SEI nunca a lê. Escolha um dos dois.'),
    el(doc, 'div', { class: 'gelic-ia-colunas' }, ...SERVICOS_IA.map(coluna)),
    aviso);
}
