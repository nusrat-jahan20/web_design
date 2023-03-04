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
        // console.log(card.id);
        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('col');
        cardsDiv.innerHTML = `
            <div class="card h-100 p-4 rounded-3">
                <img src="${card.image}" style="height: 250px;" class="card-img-top img-fluid rounded-3" alt="...">
                <div class="card-body mt-3">
                    <h5 class="card-title">Features</h5>
                    <ol class="px-3 text-secondary">
                        <li>${card.features[0]}</li>
                        <li>${card.features[1]}</li>
                        <li>${card.features[2]}</li>
                        <li>${card.features[3]}</li>
                    </ol>
                </div>
                <div class="pt-3 card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${card.name}</h5>
                        <i class="fa">&#xf133;</i><p class="d-inline ps-2">${card.published_in}</p>
                    </div>
                    <div>
                    <button onclick="loadCardDetails('${card.id}')" type="button" class="border-0 rounded-circle px-2" data-bs-toggle="modal" data-bs-target="#singleCards">
                        <i class="fa text-danger">&#xf061;</i>
                    </button>
                    </div>
                </div>
            </div>
        `
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
    console.log(card.integrations[0])
    const cardModal = document.getElementById('card-modal');
    cardModal.innerHTML = ' ';
    cardModal.innerHTML = `
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
                                <h6><span>${card.pricing[0].price}</span> <br> <span>${card.pricing[0].plan}</span></h6>
                            </div>

                            <div class="bg-white w-25 text-center rounded-4 text py-3 text-warning">
                                <h6><span>$10/</span> <br> <span>month</span> <br> <span>Basic</span></h6>
                            </div>

                            <div class="bg-white w-25 text-center rounded-4 text py-3 text-danger">
                                <h6><span>Contact</span> <br> <span>us</span> <br> <span>Enterprise</s6an></h5>
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
                                <ul>
                                    <li>${card.integrations ? card.integrations[0] : 'No data Found'}</li>
                                    <li>${card.integrations?card.integrations[1]:'No data Found'}</li>
                                    <li>${card.integrations?card.integrations[2]:'No data Found'}</li>
                                    <li>${card.integrations ? card.integrations[3] : 'No data Found'}</li>
                                    <li>${card.integrations ? card.integrations[4] : 'No data Found'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card p-4 rounded-4" style="height: auto;">
                    <img src="${card.image_link[0]}" class="card-img-top img-fluid rounded-4" alt="..." style="height: 250px;">
                    <div class="card-body text-center">
                        <h3 class="card-title p-3">${card.input_output_examples[0].input}</h3>
                        <p class="card-text">${card.input_output_examples[0].output}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

document.getElementById('seeMoreBtn').addEventListener('click', function() {
    // start loading 
    toggleSpinner(true);
})

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
        // console.log(card.id);
        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('col');
        cardsDiv.innerHTML = `
            <div class="card h-100 p-4 rounded-3">
                <img src="${card.image}" style="height: 250px;" class="card-img-top img-fluid rounded-3" alt="...">
                <div class="card-body mt-3">
                    <h5 class="card-title">Features</h5>
                    <ol class="px-3 text-secondary">
                        <li>${card.features[0]}</li>
                        <li>${card.features[1]}</li>
                        <li>${card.features[2]}</li>
                        <li>${card.features[3]}</li>
                    </ol>
                </div>
                <div class="pt-3 card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${card.name}</h5>
                        <i class="fa">&#xf133;</i><p class="d-inline ps-2">${card.published_in}</p>
                    </div>
                    <div>
                    <button onclick="loadCardDetails('${card.id}')" type="button" class="border-0 rounded-circle px-2" data-bs-toggle="modal" data-bs-target="#singleCards">
                        <i class="fa text-danger">&#xf061;</i>
                    </button>
                    </div>
                </div>
            </div>
        `
        cardsContainer.appendChild(cardsDiv)
    });
    toggleSpinner(false);
}
