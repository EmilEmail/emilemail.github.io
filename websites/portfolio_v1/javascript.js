let mainTag = document.querySelector('main');
let aboutBtn = document.querySelector('.about-btn');
let cvBtn = document.querySelector('.cv-btn');


////////////////ABOUT ME////////////////
aboutBtn.addEventListener('click', () => {
    document.getElementById('project-button-wrapper').style.display = 'none';
        let divTag = document.createElement('div');
        let h2Tag = document.createElement('h2');
        let pTag = document.createElement('p');
    
        h2Tag.textContent = 'Emil Edberg';
        pTag.textContent = 'Här ska information finnas om mig...';
    
        h2Tag.classList.add('h2');
        pTag.classList.add('p');
    
        divTag.appendChild(h2Tag);
        divTag.appendChild(pTag);
        mainTag.appendChild(divTag);
    }
});


////////////////CV////////////////

cvBtn.addEventListener('click', () => {
    document.getElementById('project-button-wrapper').style.display = 'none';

    let divTag = document.createElement('div');
    let h2Tag = document.createElement('h2');
    let pTag = document.createElement('p');

    h2Tag.textContent = 'Mitt CV';
    pTag.textContent = 'Här ska mitt CV vara...';

    h2Tag.classList.add('h2');
    pTag.classList.add('p');

    divTag.appendChild(h2Tag);
    divTag.appendChild(pTag);
    mainTag.appendChild(divTag);
});