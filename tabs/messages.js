export function init(container){
  // Messages tab simple demo
  container.querySelectorAll('.msg').forEach(m=> m.addEventListener('click', ()=> alert('Open conversation')));
}
