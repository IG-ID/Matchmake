export function init(container){
  const btn = container.querySelector('.btn-save');
  btn?.addEventListener('click', ()=> alert('Settings saved'));
}
