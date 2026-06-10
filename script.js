const nav = document.getElementById('nav');

function updateNav() {
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }

    const sections = document.querySelectorAll('section[id]');
    let current = 'about';
    sections.forEach(s => {
        if (window.pageYOffset >= s.offsetTop - 200) current = s.id;
    });

    const map = { about: 0, experience: 1, education: 2, project: 3, contact: 4 };
    document.querySelectorAll('.nav-link li').forEach((li, i) => {
        li.classList.toggle('active', i === (map[current] ?? 0));
    });
}

window.addEventListener('scroll', updateNav);
window.addEventListener('load', updateNav);

document.querySelectorAll('.nav-link a').forEach((a, i) => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const ids = ['about', 'experience', 'education', 'project', 'contact'];
        document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.nav-link li').forEach((li, idx) => {
            li.classList.toggle('active', idx === i);
        });
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = {
            name:    document.getElementById('name').value,
            email:   document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        console.log('Form submitted:', data);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}
