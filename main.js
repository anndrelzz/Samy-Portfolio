const projects = [
    {
        title: "Projeto 01 - Criação Luminosa",
        description: "Primeiro projeto na faculdade desenvolvido no 1º semestre, explorando forma, luz e efeitos de sombra. Luminária concebida a partir de peças curvas moduladas, modeladas digitalmente e conectadas por encaixes que dispensam ferragens."
    },
    {
        title: "Projeto 02 - Casa Pátio",
        description: "Projeto de Casa Pátio desenvolvido no 3º semestre, pensando no dimensionamento, layout, iluminação, ventilação e relações com o espaço vazio, atendendo ao programa mínimo e preferências do perfil de usuário proposto."
    },
    {
        title: "Projeto 03 - Centro Comunitário Elo",
        description: "Centro comunitário realizado em grupo no 4º semestre. O conceito 'Elo' simboliza união e conexão entre pessoas e espaços, promovendo interações e fortalecendo vínculos culturais. Forma circular que cria um espaço inclusivo e sem hierarquias."
    },
    {
        title: "Projeto 04 - Residência",
        description: "Projeto residencial desenvolvido individualmente no 4º semestre utilizando ArchiCAD, incluindo planta baixa, cortes, fachadas e isométricas explodidas."
    },
    {
        title: "Projeto 05 - Edificação Vertical",
        description: "Projeto de edificação vertical comercial e residencial desenvolvido em grupo no 5º semestre. Volumetria orgânica com cantos arredondados e projeções diagonais, criando efeito visual ondulado através do espelhamento dos pavimentos."
    },
    {
        title: "Projeto 06 - Interiores Residenciais",
        description: "Projeto de interiores desenvolvido na Rengel Engenharia e Arquitetura, incluindo modelagem, detalhamento executivo e mobiliário para Hall de Entrada, Sala de Estar, Sala de Jantar e Cozinha. Realizado com SketchUp, Layout e D5 Render."
    }
];

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">Projeto ${index + 1}</div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });

    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    animateSkills();

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(138, 120, 105, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 12px rgba(138, 120, 105, 0.1)';
        }
    });
});
