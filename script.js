// Inicializa EmailJS
emailjs.init("SEU_USER_ID"); // Substitua pelo seu User ID do EmailJS

// Elementos
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');
const whatsappBtn = document.getElementById('whatsapp-button');

// Validação em tempo real
form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => validateField(field));
});

// Validação de campo
function validateField(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  if (!field.value.trim()) {
    errorElement.textContent = 'Este campo é obrigatório.';
    return false;
  }

  if (field.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value)) {
    errorElement.textContent = 'E-mail inválido.';
    return false;
  }

  errorElement.textContent = '';
  return true;
}

// Envio do formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const isValid = [...form.elements].every(el => {
    if (el.tagName !== 'BUTTON') {
      return validateField(el);
    }
    return true;
  });

  if (!isValid) return;

  emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', form)
    .then(() => {
      statusMessage.textContent = 'Mensagem enviada com sucesso!';
      statusMessage.style.color = 'green';
      form.reset();
    }, (error) => {
      statusMessage.textContent = 'Erro ao enviar. Tente novamente.';
      statusMessage.style.color = 'red';
      console.error('Erro:', error);
    });
});

// Envio via WhatsApp
whatsappBtn.addEventListener('click', () => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  const text = `Olá!%0A%0A*Nome:* ${name}%0A*E-mail:* ${email}%0A*Assunto:* ${subject}%0A*Mensagem:* ${message}`;
  const whatsappURL = `https://wa.me/?text=${text}`;
  window.open(whatsappURL, '_blank');
});