export function init(container){
  // Simple interaction example for matches
  container.querySelectorAll('.match-item').forEach(el=> el.addEventListener('click', ()=> alert(`Open profile: ${el.textContent}`)));
}
