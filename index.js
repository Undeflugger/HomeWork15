// В інформації товару - кнопка "купити".
// При натисканні на "купити" нижче з'являється форма оформлення замовлення з наступними полями:
// ПІБ покупця
// Місто (вибір зі списку)
// Кількість продукції, що купується
// Коментар до замовлення
// 2. Реалізувати перевірку всіх даних користувача під час підтвердження замовлення - обов'язкові поля заповнені. Інакше - виводити помилку на сторінку

// 3. Виводити інформацію про замовлення на сторінку (інформація про товар та про доставку)

// 4 Створені замовлення повинні зберігатися у sessionStorage.

// 5 Додати кнопку мої замовлення, по кліку повинна зявитися таблиця з моїми замовленнями, в таблиці два поля: назва товару та ПІБ покупця

const category = document.getElementsByClassName('category')[0];
category.addEventListener('click', addDivInfo);
const catalog = document.getElementsByClassName('catalog')[0];
catalog.addEventListener('click', addDivCatalog);
const button = document.getElementById('button');
button.addEventListener('click', buyItem);
const confirm = document.getElementById('form');
confirm.addEventListener('submit', createOrder);
const mainBlock = document.getElementsByClassName('main-block')[0];
mainBlock.addEventListener('click', clear);
const myOrders = document.getElementById('my-orders');
myOrders.addEventListener('click', pushOrder);

const laptops = document.getElementsByClassName('laptops')[0];
const mobile = document.getElementsByClassName('mobile')[0];
const household = document.getElementsByClassName('household')[0];
const tools = document.getElementsByClassName('tools')[0];
const items = document.getElementsByClassName('items')[0];
const clientInfo = document.getElementById('clientInfo');
const country = document.getElementById('country');
const count = document.getElementById('count');
const order = document.getElementById('order');
const form = document.forms[0];

const h1 = document.getElementById('h3');
const p = document.getElementById('p');
const span = document.getElementById('span');

const categoryAll = [laptops, mobile, household, tools];

let product = '';
const KEY ='info';
let info = JSON.parse(sessionStorage.getItem(KEY)) || [];




const arr = [{'name': 'Acer Aspire', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Asus S500MC-5114000370', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': '28" Samsung Odyssey G7', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Apple iPhone 13', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Samsung S22 ULTRA', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'LG 45" Ultra', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Refridgerator', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Wosher', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Mixer', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Drill', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Grinder tool', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'},
    {'name': 'Saw', 'description': 'Screen 15.6" IPS (1920x1080) Full HD', 'price': '1000$'}]

function addDivInfo(event){
    event.stopPropagation();
    displayNone([clientInfo, order, items]);
    const nameLink = event.target.innerText;
    switch(nameLink){
        case 'Laptops & Computers':
            showAll(laptops);
            break;
        case 'Mobile & TV':
            showAll(mobile);
            break;
        case  'Household appliances':
            showAll(household);
            break;
        case 'Tools':
            showAll(tools);
            break;
    }
}



function showAll(el){
    el.style.display = "block";
    categoryAll.filter((items) => items !== el).forEach((items) =>{
        items.style.display = "none";
    })


}

function addDivCatalog(event){
    event.stopPropagation();
    const nameLink = event.target.innerText;
    product = nameLink;
    const index = arr.findIndex(el => el.name === nameLink);
    pushText(index);
    items.style.display = "block";
}

function pushText(el){
    h1.innerText = arr[el].name;
    p.innerText = arr[el].description;
    span.innerText = arr[el].price;
}


function displayNone(el){
    if(Array.isArray(el)){
        el.forEach(el => {
            el.style.display = "none";
        })
    }else{
        el.style.display = 'none';
    }

}

function buyItem(event){
    event.stopPropagation();
    event.preventDefault();
    displayNone(items);
    displayNone(categoryAll);
    clientInfo.style.display = 'block';

}

function clear(event){
    displayNone(items);
    displayNone(categoryAll);
}

function createOrder(event){
    event.preventDefault();
    event.stopPropagation();
    info.push({'product' : product, 'name': form.name.value, 'surname': form.surname.value, 'father': form.father.value, 'country': country.value, 'count': count.value, 'message': form.message.value});
    sessionStorage.setItem(KEY, JSON.stringify(info));
    displayNone(clientInfo);
    order.innerHTML = `<h1>${product}</h1>
    <p>Delivery to ${country.value}</p>
    <p>Customer: ${form.surname.value} ${form.name.value} ${form.father.value}</p>`;
    form.reset();
    order.style.display = 'block';

}

function pushOrder(event){
    event.stopPropagation();
    event.preventDefault();
    const listHistory = JSON.parse(sessionStorage.getItem(KEY)) || [];
    order.innerHTML = '<table class = "table table-hover my-5"><thead class="thead-dark"><tr><th scope="col">Product</th><th scope="col">Name</th></tr></thead><tbody></tbody></table>';
    let list = '';
    let listColumn = '';
    for(let i = 0; i < listHistory.length; i++){
        for(let j = 0; j < 1; j++){
            listColumn = '';
            listColumn += `<td>${listHistory[i].product}</td><td>${listHistory[i].surname} ${listHistory[i].name} ${listHistory[i].father}</td>`;
        }
        list += `<tr>${listColumn}</tr>`;
    }
    const newTable = document.getElementsByTagName('tbody')[0];
    newTable.innerHTML = list;
    displayNone([items, clientInfo]);
    displayNone(categoryAll);
    order.style.display = 'block';
}