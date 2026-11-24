const mobileMenuButton = document.querySelector('#mobileMenuButton');
const mainNav = document.querySelector('#mainNav');
const filterButtons = document.querySelectorAll('[data-filter]');
const menuCards = document.querySelectorAll('.menu-card');
const addButtons = document.querySelectorAll('[data-add]');
const cartPanel = document.querySelector('#cartPanel');
const cartBackdrop = document.querySelector('#cartBackdrop');
const cartCount = document.querySelector('#cartCount');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const copyOrderButton = document.querySelector('#copyOrderButton');
const toast = document.querySelector('#toast');
const cart = new Map();
let toastTimer;

const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function closeMobileMenu() {
  mainNav.classList.remove('open');
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  mobileMenuButton.setAttribute('aria-label', 'Abrir menu');
}

mobileMenuButton.addEventListener('click', () => {
  const isOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  mobileMenuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    menuCards.forEach(card => {
      card.hidden = selected !== 'todos' && card.dataset.category !== selected;
    });
  });
});

function updateCart() {
  const entries = [...cart.entries()];
  const quantity = entries.reduce((sum, [, item]) => sum + item.quantity, 0);
  const total = entries.reduce((sum, [, item]) => sum + item.price * item.quantity, 0);
  cartCount.textContent = quantity;
  cartTotal.textContent = money(total);
  copyOrderButton.disabled = entries.length === 0;

  if (!entries.length) {
    cartItems.innerHTML = '<div class="empty-cart"><span class="empty-cart-icon">＋</span><h3>A sacola está vazia.</h3><p>Seu próximo favorito está esperando no cardápio.</p><button type="button" class="text-link" id="backToMenuButton">Explorar cardápio ↗</button></div>';
    document.querySelector('#backToMenuButton').addEventListener('click', () => {
      closeCart();
      document.querySelector('#cardapio').scrollIntoView({ behavior: 'smooth' });
    });
    return;
  }

  cartItems.replaceChildren();
  entries.forEach(([name, item]) => {
    const row = document.createElement('div');
    row.className = 'cart-row';

    const details = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = name;
    const description = document.createElement('p');
    description.textContent = `${money(item.price)} por unidade`;
    details.append(title, description);

    const side = document.createElement('div');
    side.className = 'cart-row-side';
    const price = document.createElement('span');
    price.className = 'cart-row-price';
    price.textContent = money(item.price * item.quantity);

    const controls = document.createElement('div');
    controls.className = 'quantity-control';
    const decrease = document.createElement('button');
    decrease.type = 'button';
    decrease.textContent = '−';
    decrease.setAttribute('aria-label', `Diminuir ${name}`);
    decrease.addEventListener('click', () => changeQuantity(name, -1));
    const count = document.createElement('span');
    count.textContent = item.quantity;
    const increase = document.createElement('button');
    increase.type = 'button';
    increase.textContent = '+';
    increase.setAttribute('aria-label', `Aumentar ${name}`);
    increase.addEventListener('click', () => changeQuantity(name, 1));
    controls.append(decrease, count, increase);
    side.append(price, controls);
    row.append(details, side);
    cartItems.append(row);
  });
}

function changeQuantity(name, amount) {
  const item = cart.get(name);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart.delete(name);
  updateCart();
}

function openCart() {
  cartPanel.hidden = false;
  cartBackdrop.hidden = false;
  cartPanel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  document.querySelector('#closeCartButton').focus();
}

function closeCart() {
  cartPanel.hidden = true;
  cartBackdrop.hidden = true;
  cartPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const current = cart.get(name);
    if (current) current.quantity += 1;
    else cart.set(name, { price, quantity: 1 });
    updateCart();
    showToast(`${name} adicionado à sacola`);
  });
});

document.querySelector('#openCartButton').addEventListener('click', openCart);
document.querySelector('#closeCartButton').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeCart();
    closeMobileMenu();
  }
});

document.querySelector('#copyOrderButton').addEventListener('click', async () => {
  const entries = [...cart.entries()];
  if (!entries.length) return;
  const lines = entries.map(([name, item]) => `${item.quantity}x ${name} — ${money(item.price * item.quantity)}`);
  const total = entries.reduce((sum, [, item]) => sum + item.price * item.quantity, 0);
  const summary = `Meu pedido Mordi:\n${lines.join('\n')}\n\nTotal: ${money(total)}`;
  try {
    await navigator.clipboard.writeText(summary);
    showToast('Resumo copiado. Agora é só compartilhar.');
  } catch {
    const temporary = document.createElement('textarea');
    temporary.value = summary;
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.append(temporary);
    temporary.select();
    document.execCommand('copy');
    temporary.remove();
    showToast('Resumo copiado. Agora é só compartilhar.');
  }
});

document.querySelector('#currentYear').textContent = new Date().getFullYear();

const video = document.querySelector('#featuredVideo');
if (video) {
  video.addEventListener('error', () => {
    const help = document.querySelector('#videoHelp');
    help.hidden = false;
  });
}

updateCart();
