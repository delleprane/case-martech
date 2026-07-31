document.addEventListener('DOMContentLoaded', () => {

    // Evento entre_em_contato (click) - todas as páginas
    const contato = document.querySelector('.menu-lista-contato');

    if (contato) {
        contato.addEventListener('click', () => {
            gtag('event', 'click', {
                page_location: window.location.href,
                element_name: 'entre_em_contato',
                element_group: 'menu'
            });
        });
    }

    // Evento download_pdf (file_download) - todas as páginas
    const download = document.querySelector('.menu-lista-download');

    if (download) {
        download.addEventListener('click', () => {
            gtag('event', 'file_download', {
                page_location: window.location.href,
                element_name: 'download_pdf',
                element_group: 'menu'
            });
        })
    }

    // Evento click nos cards da análise (ver_mais) - analise.html
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {

        card.addEventListener('click', () => {

            if (!card.dataset.id) {
                console.warn('Evento click não enviado: card sem identificação.');
                return;
            }

            gtag('event', 'click', {
                page_location: window.location.href,
                element_name: card.dataset.id,
                element_group: 'ver_mais'
            });
        });
    });

    // Eventos do Formulário de contato (sobre.html)
    const form = document.querySelector('.contato');
    if (form) {
        const campos = form.querySelectorAll('input');

        let formStarted = false;

        campos.forEach((campo) => {
            campo.addEventListener('input', () => {

                if (formStarted) return;

                if (!form.id || !form.name) {
                    console.warn('Evento form_start não enviado: formulário sem identificação.');
                    return;
                }
                
                formStarted = true;

                gtag('event', 'form_start', {
                    page_location: window.location.href,
                    form_id: form.id,
                    form_name: form.name,
                    form_destination: form.action || ''
                });

            });
        });

        form.addEventListener('submit', function () {

            const submitButton = form.querySelector('button[type="submit"]')

            if (!form.id || !form.name || !submitButton) {
                console.warn('Evento form_submit não enviado: parâmetros obrigatórios ausentes.');
                return;
            }

            gtag('event', 'form_submit', {
                page_location: window.location.href,
                form_id: form.id,
                form_name: form.name,
                form_destination: form.action || '',
                form_submit_text: submitButton.innerText
            });
        });

        let formSuccessViewed = false;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {

                if (
                    mutation.attributeName === 'class' &&
                    document.body.classList.contains('lightbox-open') && 
                    !formSuccessViewed
                ) {

                    formSuccessViewed = true;

                    if (!form.id || !form.name) {
                        console.warn('Evento view_form_success não enviado: formulário sem identificação.');
                        return;
                    }

                    gtag('event', 'view_form_success', {
                        page_location: window.location.href,
                        form_id: form.id,
                        form_name: form.name
                    });
                }
            });
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

});

