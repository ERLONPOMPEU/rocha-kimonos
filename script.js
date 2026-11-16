'use strict';
const WHATSAPP_NUMBER='558587678264';
const BASE_WHATSAPP='https://wa.me/'+WHATSAPP_NUMBER;
const qs=s=>document.querySelector(s);
const config={kimono:'Preto',costura:'Vermelha'};
const menuButton=qs('#menu-toggle'),menu=qs('#main-menu');
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}))}
const nameField=qs('#nome-bordado'),teamField=qs('#nome-equipe'),verseField=qs('#versiculo-bordado'),placeField=qs('#local-bordado');
const getValue=(el)=>el?.value?.trim()||'Não informado';
const makeUrl=msg=>BASE_WHATSAPP+'?text='+encodeURIComponent(msg);
function updateSelection(){
 const parts=['Olá! Quero solicitar um orçamento de kimono personalizado Rocha Kimonos.','Cor do kimono: '+config.kimono,'Cor das costuras: '+config.costura,'Nome para bordado: '+getValue(nameField),'Nome da equipe/escudo: '+getValue(teamField),'Versículo ou frase: '+getValue(verseField),'Posição desejada: '+(placeField?.value||'A combinar'),'Gostaria de confirmar as medidas, as opções disponíveis e o preço.'];
 const btn=qs('#custom-whatsapp');if(btn)btn.href=makeUrl(parts.join('\n'));
 const sum=qs('#selection-summary');if(sum)sum.textContent='Sua seleção: kimono '+config.kimono.toLowerCase()+' com costura '+config.costura.toLowerCase()+'. A aplicação dos bordados será confirmada no atendimento.';
}
document.querySelectorAll('.swatch[data-type][data-value]').forEach(btn=>btn.addEventListener('click',()=>{
 const type=btn.dataset.type;if(!(type in config))return;config[type]=btn.dataset.value;
 document.querySelectorAll('.swatch[data-type="'+type+'"]').forEach(x=>{let active=x===btn;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});updateSelection()
}));
[nameField,teamField,verseField,placeField].filter(Boolean).forEach(el=>el.addEventListener('input',updateSelection));
document.querySelectorAll('.js-whatsapp').forEach(link=>{link.href=makeUrl(link.dataset.message||'Olá! Quero conhecer os produtos Rocha Kimonos.')});
if(qs('#year'))qs('#year').textContent=String(new Date().getFullYear());
updateSelection();
