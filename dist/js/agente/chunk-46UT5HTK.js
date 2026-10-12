/* GERADO por agente-ia/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
function i(){try{let n=new Uint8Array(4);return crypto.getRandomValues(n),[...n].map(t=>t.toString(16).padStart(2,"0")).join("")}catch{return Math.random().toString(16).slice(2,10)}}function s(n,t,o){let e=t.replace(/<\/\s*documento\b[^>]*>/gi,r=>`\u2039${r.slice(1)}`).split(o).join("\u2039nonce omitido\u203A");return`<documento id="${n}" nonce="${o}">
${e}
</documento nonce="${o}">`}export{i as a,s as b};
