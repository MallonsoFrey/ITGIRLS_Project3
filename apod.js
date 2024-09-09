export const main = document.querySelector('.main');
export const mainContent = document.querySelector('.main__content');
export const apodLink = document.querySelector('.apod');

export function getData() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=TVrvR0LgwIjSOHwBsUFSkXqF1jizNTL1Ob6IG2gB')
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject({status: res.status, statusText: res.statusText});
        }
    })
    .then(data => {
        console.log(data);
        renderData(data);
    })
    .catch((err) => {
    const errContainer = document.createElement('div');
    errContainer.textContent = `Error: ${err.status} ${err.statusText}`;
    main.appendChild(errContainer);
    });
}

function renderData(obj) {
    const apodContainer = document.createElement('div');
    apodContainer.className = 'apod_content';
    apodContainer.innerHTML =
    `<h2>Astronomy Picture of the Day</h2>
    <h3>${obj.title}</h3>
    <img src=${obj.url} alt="Astronomy Picture of the Day"/>
    <a class="imagehd" href=${obj.hdurl} target="_blank">Tap for high-resolution image</a>
    <p>${obj.explanation}</p>`;
    mainContent.remove();
    main.append(apodContainer);
}