'use strict';
// Número fornecido pela fábrica. Confirme o dígito 9 do celular antes de publicar.
const WHATSAPP_NUMBER = '558587678264';
const BASE_WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const config = {kimono:'Preto',costura:'Vermelha'};
const colors = {kimono:{Preto:'#18191e',Azul:'#143d9d',Branco:'#eceff3'},costura:{Vermelha:'#f03a3e',Branca:'#f5f5f5',Dourada:'#d2a554',Azul:'#4c87f6',Preta:'#08090c'}};
const qs = (s)=>document.querySelector(s);
const sendUrl = (message)=>`${BASE_WHATSAPP}?text=${encodeURIComponent(message)}`;
const menuButton=qs('#menu-toggle');const menu=qs('#main-menu');
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
function safeLabel(v,fallback){return v.trim().slice(0,28).toUpperCase() || fallback;}
function updatePreview(){
 const name=safeLabel(qs('#nome-bordado').value,'SEU NOME');
 const team=safeLabel(qs('#nome-equipe').value,'SUA EQUIPE');
 const fill=colors.kimono[config.kimono],stitch=colors.costura[config.costura];
 const garment=qs('#gi-garment'); garment.setAttribute('fill',fill); garment.setAttribute('stroke',stitch);
 const paths=garment.querySelectorAll('path');paths.forEach((p,i)=>{if(i===0){p.setAttribute('fill',fill)}else if(i===1||i===2){p.setAttribute('fill',config.kimono==='Branco'?'#d9dce3':config.kimono==='Azul'?'#0b286e':'#0d0e13')}});
 const badge=qs('#svg-name'); badge.textContent=name.length>17?name.slice(0,17)+'…':name; badge.parentElement.querySelector('rect').setAttribute('stroke',stitch);
 qs('#preview-team-name').textContent=team;
 qs('#custom-whatsapp').href=sendUrl(`Olá! Quero pedir um orçamento para um kimono Rocha personalizado.\n• Cor do kimono: ${config.kimono}\n• Cor das costuras: ${config.costura}\n• Nome para bordar: ${qs('#nome-bordado').value.trim()||'A definir'}\n• Equipe: ${qs('#nome-equipe').value.trim()||'A definir'}\nGostaria também de saber sobre a opção sob medida.`);
}
document.querySelectorAll('.swatch').forEach(btn=>btn.addEventListener('click',()=>{const type=btn.dataset.type;config[type]=btn.dataset.value;document.querySelectorAll(`.swatch[data-type="${type}"]`).forEach(x=>{const selected=x===btn;x.classList.toggle('active',selected);x.setAttribute('aria-pressed',String(selected));});updatePreview();}));
['#nome-bordado','#nome-equipe'].forEach(s=>qs(s).addEventListener('input',updatePreview));
document.querySelectorAll('.js-whatsapp').forEach(link=>{link.href=sendUrl(link.dataset.message||'Olá! Quero conhecer os produtos da Rocha Kimonos.');});
qs('#year').textContent=new Date().getFullYear();
updatePreview();