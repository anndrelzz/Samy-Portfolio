let currentSlideIndex = 0;
let currentProjectImages = [];

const projects = [
    {
        title: "Projeto 01 - Criação Luminosa",
        description: "Primeiro projeto na faculdade desenvolvido no 1º semestre, explorando forma, luz e efeitos de sombra. Luminária concebida a partir de peças curvas moduladas, modeladas digitalmente e conectadas por encaixes que dispensam ferragens.",
        imagePlaceholders: [
            "img/Proj1_img7.png", // Esta será a capa e a primeira no carrossel
            "img/Proj1_img1.png", 
            "img/Proj1_img2.png", 
            "img/Proj1_img3.png", 
            "img/Proj1_img4.png", 
            "img/Proj1_img5.png", 
            "img/Proj1_img6.png"  
        ]
    },
    {
        title: "Projeto 02 - Casa Pátio",
        description: "Projeto de Casa Pátio desenvolvido no 3º semestre, pensando no dimensionamento, layout, iluminação, ventilação e relações com o espaço vazio, atendendo ao programa mínimo e preferências do perfil de usuário proposto.",
        imagePlaceholders: ["Placeholder Imagem 2.1", "Placeholder Imagem 2.2"]
    },
    {
        title: "Projeto 03 - Centro Comunitário Elo",
        description: "Centro comunitário realizado em grupo no 4º semestre. O conceito 'Elo' simboliza união e conexão entre pessoas e espaços, promovendo interações e fortalecimento de vínculos culturais. Forma circular que cria um espaço inclusivo e sem hierarquias.",
        imagePlaceholders: ["Placeholder Imagem 3.1"]
    },
    {
        title: "Projeto 04 - Residência",
        description: "Projeto residencial desenvolvido individualmente no 4º semestre utilizando ArchiCAD, incluindo planta baixa, cortes, fachadas e isométricas explodidas.",
        imagePlaceholders: ["Placeholder Imagem 4.1", "Placeholder Imagem 4.2"]
    },
    {
        title: "Projeto 05 - Edificação Vertical",
        description: "Projeto de edificação vertical comercial e residencial desenvolvido em grupo no 5º semestre. Volumetria orgânica com cantos arredondados e projeções diagonais, criando efeito visual ondulado através do espelhamento dos pavimentos.",
        imagePlaceholders: ["Placeholder Imagem 5.1"]
    },
    {
        title: "Projeto 06 - Interiores Residenciais",
        description: "Projeto de interiores desenvolvido na Rengel Engenharia e Arquitetura, incluindo modelagem, detalhamento executivo e mobiliário para Hall de Entrada, Sala de Estar, Sala de Jantar e Cozinha. Realizado com SketchUp, Layout e D5 Render.",
        imagePlaceholders: ["Placeholder Imagem 6.1", "Placeholder Imagem 6.2", "Placeholder Imagem 6.3"]
    }
];

function changeSlide(n) {
    showSlides(currentSlideIndex += n);
}

function showSlides(n) {
    const slides = document.querySelectorAll('#projectCarousel .carousel-slide');
    if (slides.length === 0) return; // Não há slides para mostrar

    if (n >= slides.length) {currentSlideIndex = 0}
    if (n < 0) {currentSlideIndex = slides.length - 1}

    // Oculta todos os slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    // Mostra o slide atual
    slides[currentSlideIndex].style.display = 'flex';
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    const carousel = document.getElementById('projectCarousel');
    let prevButton = document.querySelector('.carousel-prev');
    let nextButton = document.querySelector('.carousel-next');

    // 1. Atualiza Detalhes do Projeto
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;

    // 2. Inicializa Dados do Carrossel
    currentProjectImages = project.imagePlaceholders;
    currentSlideIndex = 0;
    carousel.innerHTML = ''; // Limpa slides anteriores

    // 3. Popula Slides do Carrossel com <img> tags
    project.imagePlaceholders.forEach((imageUrl) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = project.title; // Adiciona alt text para acessibilidade
        slide.appendChild(img); 
        carousel.appendChild(slide);
    });
    
    // 4. Garante que os botões de navegação existam e adiciona/atualiza listeners
    // Remove e recria os botões para evitar múltiplos listeners
    if (prevButton) prevButton.remove();
    if (nextButton) nextButton.remove();

    prevButton = document.createElement('button');
    prevButton.className = 'carousel-prev';
    prevButton.innerHTML = '&#10094;'; // Caractere seta para a esquerda
    prevButton.addEventListener('click', (e) => { e.stopPropagation(); changeSlide(-1); }); // Impede que o clique feche o modal
    document.querySelector('.carousel-container').appendChild(prevButton);

    nextButton = document.createElement('button');
    nextButton.className = 'carousel-next';
    nextButton.innerHTML = '&#10095;'; // Caractere seta para a direita
    nextButton.addEventListener('click', (e) => { e.stopPropagation(); changeSlide(1); }); // Impede que o clique feche o modal
    document.querySelector('.carousel-container').appendChild(nextButton);

    // 5. Exibe o primeiro slide e o modal
    showSlides(0);
    
    // Exibe/oculta botões de navegação se houver mais de uma imagem
    if (currentProjectImages.length > 1) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}


function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-project-index', index); 
        // Usa a primeira imagem do carrossel para o card, se houver
        const cardImageSrc = project.imagePlaceholders.length > 0 ? project.imagePlaceholders[0] : '';
        const cardImageContent = cardImageSrc ? `<img src="${cardImageSrc}" alt="${project.title}">` : `Projeto ${index + 1}`;

        projectCard.innerHTML = `
            <div class="project-image">${cardImageContent}</div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = card.getAttribute('data-project-index');
            openModal(projects[index]);
        });
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
    
    // Listeners para fechar o modal
    const modal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.modal-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Fecha o modal se clicar fora do conteúdo
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});