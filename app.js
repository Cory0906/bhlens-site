const menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open);});
let category='0';const search=document.querySelector('#search');
function filter(){const q=(search?.value||'').trim().toLocaleLowerCase();let count=0;document.querySelectorAll('.product').forEach(p=>{p.hidden=!((category==='0'||p.dataset.category===category)&&p.dataset.search.toLocaleLowerCase().includes(q));if(!p.hidden)count++;});const empty=document.querySelector('#empty');if(empty)empty.hidden=count>0;}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filter();}));search?.addEventListener('input',filter);
const form=document.querySelector('#enquiry');
if(form){const zh=document.documentElement.lang.startsWith('zh');
form.elements.model.value=new URLSearchParams(location.search).get('model')||'';
const labelOf=el=>el.type==='radio'?(zh?'需求性质':'Requirement type'):el.closest('label')?.childNodes[0]?.textContent.trim()||el.name;
const lines=()=>{const out=[];for(const el of form.elements){if(!el.name||(el.type==='radio'&&!el.checked)||!el.value.trim())continue;out.push(labelOf(el)+': '+el.value.trim());}const drawing=document.querySelector('#drawing')?.files?.[0];if(drawing)out.push((zh?'图纸文件（请附上）':'Drawing file (please attach)')+': '+drawing.name);return out;};
const status=t=>{document.querySelector('#form-status').textContent=t;};
form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const who=d.get('company')||d.get('name');const what=d.get('model')||d.get('request_type');const subject=(zh?'询盘':'Enquiry')+': '+what+(who?' · '+who:'');const body=[...lines(),'',zh?'（通过 bhlens.com 询盘表单生成）':'(Prepared with the bhlens.com enquiry form)'].join('\n');location.href='mailto:'+form.dataset.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);status(form.dataset.success);});
document.querySelector('#download-draft')?.addEventListener('click',()=>{const text=['BOHAI OPTICS — ENQUIRY / 询盘','To / 收件人: '+form.dataset.email,'',...lines()].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download='bohai-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);status(form.dataset.downloaded);});}
