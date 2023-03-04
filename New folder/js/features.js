const loadCards = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayCards(data))
}

// display all cards
const displayCards = (cards) => {
    const cardsContainer = document.getElementById('cards-container');

    // display 6 cards
     cards.data.tools = cards.data.tools.slice(0, 6);

    // loop for each cards
    cards.data.tools.forEach(card => {
        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('col');
        let innerHTML = `<div class="card h-100 p-4 rounded-3">
                <img src="${card.image}" style="height: 250px;" class="card-img-top img-fluid rounded-3" alt="...">
                <div class="card-body mt-3">
                    <h5 class="card-title">Features</h5>
                    <ol class="px-3 text-secondary"> `;
                    for (const feature of card.features) {
                        innerHTML += `<li>${feature ? feature : 'No data found'}</li>`;
                    }
                    innerHTML += `

                                </ol>
                            </div>
                            <div class="pt-3 card-footer d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>${card.name ? card.name : 'NO data found'}</h5>
                                    <i class="fa">&#xf133;</i><p class="d-inline ps-2">${card.published_in ? card.published_in : 'NO data found'}</p>
                                </div>
                                <div>
                                <button onclick="loadCardDetails('${card.id}')" type="button" class="border-0 rounded-circle px-2" data-bs-toggle="modal" data-bs-target="#singleCards">
                                    <i class="fa text-danger">&#xf061;</i>
                                </button>
                                </div>
                            </div>
                        </div>
                    `
        cardsDiv.innerHTML = innerHTML;
        cardsContainer.appendChild(cardsDiv);
    });

}


// single card details
const loadCardDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showCardDetails(data.data));
}

const showCardDetails = card => {
    const cardModal = document.getElementById('card-modal');
    cardModal.innerHTML = ' ';
    let innerHTML = `
        <div>
            <button id="btn-close" type="button" class="btn-close bg-danger rounded-circle p-2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="p-5 row row-cols-1 row-cols-md-1 row-cols-lg-2 g-5">
            <div class="col">
                <div id="bg-color" class="card rounded-4 border-danger p-3" style="height: auto;">
                    <div class="card-body">
                        <h4 class="card-title mb-4">${card.description}</h4>
                        <div class="d-flex justify-content-around mb-4">
                            <div class="bg-white w-25 rounded-4 py-3 text-success d-flex flex-column justify-content-center align-items-center">
                                <h6><span>${card.pricing ? card.pricing[0].price : 'Free '}</span> <br> <span>${card.pricing ? card.pricing[0].plan : 'of cost'}</span></h6>
                            </div>

                            <div class="bg-white w-25 text-center rounded-4 text py-3 text-warning">
                                <h6><span>${card.pricing ? card.pricing[0].price : 'Free'}</span> <br> <span>${card.pricing ? card.pricing[1].plan : ' of cost'}</span></h6>
                            </div>

                            <div class="bg-white w-25 text-center rounded-4 text py-3 text-danger">
                                <h6><span>${card.pricing ? card.pricing[0].price : 'Free'}</span> <br> <span>${card.pricing ? card.pricing[2].plan : ' of cost'}</span></h6>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h4>Features</h4>
                                <ul> 
                                    <li>Customizable responses</li>
                                    <li>Multilingual support</li>
                                    <li>Seamless integration</li>
                                </ul>
                            </div>
                            <div>
                                <h4>Integrations</h4>
                                <ul>`;
                                for (const integration of card.integrations) {
                                    innerHTML += `<li>${integration ? integration : 'No data found'}</li>`;
                                }
                                innerHTML += `
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card p-4 rounded-4" style="height: auto;">
                    <div style="position: relative;">`
    if (card.accuracy.score) {
        innerHTML += `
                        <h6 class="px-4 py-2 bg-danger text-white d-inline-block rounded-3 accuracy">${card.accuracy.score * 100}% accuracy </h6 >`;
    }else {
        innerHTML += ``;
    }
    innerHTML += `</div>
                    <img src="${card.image_link[0]}" class="card-img-top img-fluid rounded-4" alt="..." style="height: 250px;">
                    <div class="card-body text-center">
                        <h3 class="card-title p-3">${card.input_output_examples ? card.input_output_examples[0].input: 'Can you give any example?'}</h3>
                        <p class="card-text">${card.input_output_examples ? card.input_output_examples[0].output: 'No! Not Yet! Take a break!!!'}</p>
                    </div>
                </div>
            </div>
        </div>
    `
    cardModal.innerHTML = innerHTML;
}

// add spinner to see more button
document.getElementById('seeMoreBtn').addEventListener('click', function() {
    // start loading 
    toggleSpinner(true);
})

// spinner function
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadCards()

// onclick handler for show more button
function moreCards() {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayCards2(data))
}

// show rest of cards
const displayCards2 = (cards) => {
    const cardsContainer = document.getElementById('cards-container');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    // display all cards
    cards.data.tools = cards.data.tools.slice(6, 12);
    if(cards.data.tools.length === 6) {
        seeMoreBtn.classList.add('d-none')
    }

    // loop for each cards
    cards.data.tools.forEach(card => {
        console.log(card.features);
        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('col');
        let innerHTML = `<div class="card h-100 p-4 rounded-3">
                <img src="${card.image}" style="height: 250px;" class="card-img-top img-fluid rounded-3" alt="...">
                <div class="card-body mt-3">
                    <h5 class="card-title">Features</h5>
                    <ol class="px-3 text-secondary"> `;
                    for (const feature of card.features) {
                        innerHTML += `<li>${feature ? feature : 'No data found'}</li>`;
                    }
                    innerHTML += `
                    </ol>
                </div>
                <div class="pt-3 card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${card.name ? card.name : 'NO data found'}</h5>
                        <i class="fa">&#xf133;</i><p class="d-inline ps-2">${card.published_in ? card.published_in : 'NO data found'}</p>
                    </div>
                    <div>
                    <button onclick="loadCardDetails('${card.id}')" type="button" class="border-0 rounded-circle px-2" data-bs-toggle="modal" data-bs-target="#singleCards">
                        <i class="fa text-danger">&#xf061;</i>
                    </button>
                    </div>
                </div>
            </div>
        `
        cardsDiv.innerHTML = innerHTML;
        cardsContainer.appendChild(cardsDiv);
    });
    toggleSpinner(false);
}

