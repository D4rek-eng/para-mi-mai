import './style.css'

const letters = [
  { label: 'El comienzo', title: 'Hoy nació mi persona favorita', text: 'El mundo se puso un poquito más bonito el día que llegaste tú. Y yo tuve la suerte inmensa de encontrarte en este viaje.', sign: 'Con amor y cero exageración... bueno, quizá un poquito' },
  { label: 'La subida', title: 'Contigo hasta el vértigo se siente bonito', text: 'Gracias por cada risa inesperada, cada consejo y cada plan que empezó con “solo un ratito” y terminó en una anécdota legendaria.', sign: 'Nuestra amistad: velocidad máxima, frenos opcionales' },
  { label: 'El descenso', title: 'Eres mi lugar feliz', text: 'Cuando todo baja, tú sabes cómo hacerme sentir arriba. Qué privilegio quererte, celebrarte y llamarte mi mejor amiga.', sign: 'Firmado: alguien que te quiere de aquí a la próxima curva' },
  { label: 'La curva', title: 'La persona más valiosa del mundo para mí', text: 'Amo haberte conocido. Entre tantas rutas posibles, la vida eligió cruzarnos, y esa es mi coincidencia favorita de todas.', sign: 'P.D. Te escogería en cualquier vagón' },
  { label: 'La llegada', title: 'Feliz cumpleaños, mi mejor amiga', text: 'Que este nuevo año te encuentre riendo fuerte, soñando enorme y rodeada de todo el amor que mereces. Gracias por hacerme feliz solo por existir.', sign: 'Hoy celebramos tu vida. Yo celebro tenerte' },
]

document.querySelector('#app').innerHTML = `
  <main class="experience">
    <header class="topbar"><div class="brand"><span class="brand-mark">✦</span><span>amiga <em>express</em></span></div><div class="date-pill"><span class="status-dot"></span> 26 · 09 · 2026</div></header>
    <section class="intro"><div class="eyebrow">Un recorrido solo para ti</div><h1>La montaña rusa<br><span>de tenerte en mi vida</span></h1><p class="lead">Sube, baja y abre las cartas que preparé<br class="desktop-only"> para celebrar el día en que llegaste al mundo.</p></section>
    <section class="ride-layout" aria-label="Montaña rusa de cartas de cumpleaños">
      <div class="ride-panel"><div class="panel-meta"><span id="stationLabel">Estación 01 de 05</span><span id="rideState">Lista para partir</span></div><div class="track-scene" id="trackScene"><div class="sun"></div><div class="cloud cloud-a"></div><div class="cloud cloud-b"></div><div class="mountains back"></div><div class="mountains front"></div><div class="track-line"></div><div class="rail rail-one"></div><div class="rail rail-two"></div><div class="cart" id="cart" aria-hidden="true"><span class="cart-roof"></span><span class="cart-body">♥</span><i></i><i></i></div><div class="track-marker marker-1">01</div><div class="track-marker marker-2">02</div><div class="track-marker marker-3">03</div><div class="track-marker marker-4">04</div><div class="track-marker marker-5">05</div></div><div class="ride-controls"><button class="icon-button" id="prevButton" aria-label="Carta anterior" title="Carta anterior">←</button><div class="progress" id="progress" aria-label="Progreso del recorrido"></div><button class="primary-button" id="nextButton"><span id="buttonLabel">Comenzar el recorrido</span><span class="button-arrow">→</span></button></div></div>
      <article class="letter-card" id="letterCard" aria-live="polite"><div class="card-top"><span id="letterLabel">El comienzo</span><span class="stamp">para ti <b>♡</b></span></div><div class="card-copy"><div class="card-number" id="cardNumber">01</div><h2 id="letterTitle"></h2><p id="letterText"></p><div class="card-sign" id="letterSign"></div></div><div class="card-bottom"><span>con cariño,</span><span class="scribble">tu persona</span></div></article>
    </section>
    <footer class="footer-note"><span>Hecho con amor, risas y demasiadas ganas de celebrarte</span><span class="key-hint">Usa ← → o la barra espaciadora</span></footer>
    <section class="finale" id="finale" aria-hidden="true" aria-labelledby="finalTitle">
      <div class="finale-heart" aria-hidden="true">♥</div>
      <div class="sent-mail"><span class="mail-check">✓</span><span>Correo enviado</span></div>
      <p class="finale-kicker">Destino alcanzado · mensaje especial</p>
      <h2 id="finalTitle">Para mi MAI</h2>
      <p class="finale-subtitle">La carta que no cabía en ninguna estación</p>
      <div class="big-letter" id="bigLetter">
        <div class="envelope-back"></div><div class="letter-sheet"><span class="letter-to">Para mi MAI,</span><p>Hoy celebro que hayas nacido, pero también celebro la suerte de haberte conocido. Eres una mujer valiente, fuerte y de esas personas que hacen que el mundo se sienta un poquito menos complicado.</p><p>Te quiero muchísimo. Eres la mejor del mundo, aunque a veces haga las cosas mal, me equivoque de camino o convierta un plan sencillo en una historia de tres temporadas. Incluso entonces, me quieres con todo tu corazón, y eso vale más que cualquier perfección.</p><p>Gracias por existir, por hacerme reír, por estar y por ser tú. Me haces feliz de una manera que no sé explicar, pero sí agradecer: todos los días.</p><span class="letter-signature">Feliz cumpleaños, mi MAI.<br>Siempre contigo, <em>tu persona</em> ♥</span></div><div class="envelope-flap"></div>
      </div>
      <button class="restart-button" id="restartButton">Volver a subir al tren <span>↗</span></button>
    </section>
  </main>
`

let current = -1
const cart = document.querySelector('#cart')
const scene = document.querySelector('#trackScene')
const letterCard = document.querySelector('#letterCard')
const nextButton = document.querySelector('#nextButton')
const prevButton = document.querySelector('#prevButton')
const finale = document.querySelector('#finale')
const bigLetter = document.querySelector('#bigLetter')
const restartButton = document.querySelector('#restartButton')

function render(index) {
  current = index
  const letter = letters[Math.max(index, 0)]
  document.querySelector('#stationLabel').textContent = `Estación ${String(Math.max(index + 1, 1)).padStart(2, '0')} de 05`
  document.querySelector('#rideState').textContent = index < 0 ? 'Lista para partir' : index === 4 ? 'Llegada especial' : 'Carta desbloqueada'
  document.querySelector('#letterLabel').textContent = letter.label
  document.querySelector('#cardNumber').textContent = String(Math.max(index + 1, 1)).padStart(2, '0')
  document.querySelector('#letterTitle').textContent = letter.title
  document.querySelector('#letterText').textContent = letter.text
  document.querySelector('#letterSign').textContent = letter.sign
  document.querySelector('#buttonLabel').textContent = index < 0 ? 'Comenzar el recorrido' : index === 4 ? 'Volver a empezar' : 'Siguiente carta'
    nextButton.classList.toggle('is-finish', index === 4)
  prevButton.disabled = index <= 0
  const cartStops = [5, 27, 51, 75, 95]
  cart.style.setProperty('--cart-position', `${cartStops[Math.max(index, 0)]}%`)
  scene.dataset.stage = Math.max(index, 0)
  letterCard.classList.remove('reveal'); void letterCard.offsetWidth; letterCard.classList.add('reveal')
  document.querySelectorAll('.progress-dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex <= index))
}

letters.forEach((_, index) => { const dot = document.createElement('span'); dot.className = 'progress-dot'; dot.setAttribute('aria-label', `Ir a la carta ${index + 1}`); dot.addEventListener('click', () => render(index)); document.querySelector('#progress').append(dot) })
function openFinale() {
  finale.classList.add('is-visible')
  finale.setAttribute('aria-hidden', 'false')
  bigLetter.classList.remove('is-open')
  window.setTimeout(() => bigLetter.classList.add('is-open'), 750)
}

function closeFinale() {
  finale.classList.remove('is-visible')
  finale.setAttribute('aria-hidden', 'true')
  render(-1)
}

nextButton.addEventListener('click', () => current >= letters.length - 1 ? openFinale() : render(current + 1))
prevButton.addEventListener('click', () => render(Math.max(current - 1, 0)))
restartButton.addEventListener('click', closeFinale)
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); nextButton.click() } if (event.key === 'ArrowLeft') { event.preventDefault(); prevButton.click() } })
render(-1)
