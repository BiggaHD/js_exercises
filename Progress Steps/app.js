const circeles = document.querySelectorAll('.circle');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const progress = document.getElementById('progress');

let current = 1;

next.addEventListener('click', () => {
  current++;
  if (current > circeles.length) current = circeles.length;

  update();
});

prev.addEventListener('click', () => {
  current--;
  if (current < 1) current = 1;

  update();
});

const update = () => {
  circeles.forEach((circle, idx) => {
    if (idx < current) circle.classList.add('active');
    else circle.classList.remove('active');
  });

  const actives = ((current - 1) / (circeles.length - 1)) * 100 + '%';
  progress.style.width = actives;

  if (current === 1) prev.disabled = true;
  else if (current === circeles.length) next.disabled = true;
  else {
    prev.disabled = false;
    next.disabled = false;
  }
};
