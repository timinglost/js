'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});

// dz
let basketAll = document.querySelector('.basket');
let basketLogo = document.querySelector('.cartIconWrap');
basketLogo.addEventListener('click', function () {
    if (basketAll.style.display == 'none') {
        basketAll.style.display = 'block';
    } else {
        basketAll.style.display = 'none';
    }
})

class ProductMeta {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

let products = [
    new ProductMeta("ELLERY X M'O CAPSULE 0", 52),
    new ProductMeta("ELLERY X M'O CAPSULE 1", 52),
    new ProductMeta("ELLERY X M'O CAPSULE 2", 52),
    new ProductMeta("ELLERY X M'O CAPSULE 3", 52),
    new ProductMeta("ELLERY X M'O CAPSULE 4", 52),
    new ProductMeta("ELLERY X M'O CAPSULE 5", 52),
];

let basket_in = {};

function addNewItem(id) {
    return `
    <div class="new_item">
        <div>${products[id].name}</div>
        <div><span id="v_${id}">${basket_in[id]}</span> шт.</div>
        <div>$${products[id].price}</div>
        <div>$<span id="p_${id}">${products[id].price}</span></div>
    </div>
    <hr>`
}

let addItem = document.querySelector('.basket_lower');


function clickPluse(event) {
    let target_id = Number(event.target.getAttribute('id'));
    if (target_id in basket_in) {
        basket_in[target_id] += 1;
        document.getElementById(`v_${target_id}`).innerHTML = basket_in[target_id];
        let priceAll = Number(document.getElementById(`p_${target_id}`).innerText);
        document.getElementById(`p_${target_id}`).innerText = priceAll + products[target_id].price;
        let priceAllMain = Number(document.getElementById(`main_pay`).innerText);
        document.getElementById('main_pay').innerText = priceAllMain + products[target_id].price;
    } else {
        basket_in[target_id] = 1;
        addItem.insertAdjacentHTML('beforebegin', addNewItem(target_id));
        let priceAllMain = Number(document.getElementById(`main_pay`).innerText);
        document.getElementById('main_pay').innerText = priceAllMain + products[target_id].price;
    }
    let basketValues = Number(document.getElementById(`values_pay`).innerText);
    document.getElementById('values_pay').innerText = basketValues + 1;
}

let buttonPlus = document.querySelectorAll('.btn');
for (let i = 0; i < buttonPlus.length; i++) {
    buttonPlus[i].setAttribute('id', `${i}`);
}
buttonPlus.forEach(function (event) {
    event.addEventListener('click', clickPluse)
})