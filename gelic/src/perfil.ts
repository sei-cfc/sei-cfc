/**
 * Perfil da extensão: o mesmo código gera dois pacotes instaláveis em separado.
 *  - gelic: SEI CFC Gelic, a análise da Gerência de Licitações e Contratos (o comportamento original);
 *  - cfc:   SEI CFC, para quem instrui os processos (DFD, ETP, mapa de riscos, TR, pesquisa de preços).
 *
 * O perfil vem do manifest do pacote (`sei_pro_perfil`, gravado por empacotar.ts) e é lido em tempo de
 * execução: o bundle do agente (gancho G2) é um só para os dois pacotes. Sem a chave (manifest da Gelic,
 * testes em Node), é gelic.
 */
export type Perfil = 'gelic' | 'cfc';
export const PERFIS: readonly Perfil[] = ['gelic', 'cfc'];
export const CHAVE_PERFIL = 'sei_pro_perfil';

export function perfilDoManifesto(manifesto: unknown): Perfil {
  const v = (manifesto as Record<string, unknown> | null | undefined)?.[CHAVE_PERFIL];
  return PERFIS.includes(v as Perfil) ? (v as Perfil) : 'gelic';
}

export function perfilAtual(): Perfil {
  try {
    return perfilDoManifesto(globalThis.chrome?.runtime?.getManifest?.());
  } catch {
    return 'gelic';
  }
}
