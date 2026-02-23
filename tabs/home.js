export function init(container){
  // Optional: initialize interactive parts of the Home tab
  const cards = container.querySelectorAll('.card');
  cards.forEach((c,i)=> c.addEventListener('click', ()=> alert(`Open featured ${i+1}`)));
}
