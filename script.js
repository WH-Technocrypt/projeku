const foodMenu = {
  "Splitza Signature": 9,
  "Veggie Garden": 7,
  "Meat Lovers": 8.5,
  "Super Supreme": 8.5,
  "Tuna Melt": 7,
  "My Box": 4.6,
  "My Box Plus": 6,
  "Duo Pizza": 15,
  "Beef Lasagna": 6.5,
  "Chicken Sticks": 3.5,
  "Mac ‘n Cheese": 3.5
};

const drinkMenu = {
  "Melon Lemonade": 1.9,
  "Orange Delight": 1.9,
  "Lemon Tea": 1.9,
  "Cappuccino Jelly": 2.5,
  "Coca Cola 1 Liter": 2.8,
  "Aqua": 1.2
};

function getRandomItems(menu, count) {
  const keys = Object.keys(menu);
  const selected = [];
  while (selected.length < count && keys.length > 0) {
    const index = Math.floor(Math.random() * keys.length);
    selected.push(keys[index]);
    keys.splice(index, 1);
  }
  return selected;
}

function generateReceipt() {
  const foodCount = parseInt(document.getElementById("foodCount").value);
  const drinkCount = parseInt(document.getElementById("drinkCount").value);

  const selectedFoods = getRandomItems(foodMenu, foodCount);
  const selectedDrinks = getRandomItems(drinkMenu, drinkCount);

  let receiptHTML = "";
  let total = 0;

  selectedFoods.forEach(item => {
    const price = foodMenu[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>$${price.toFixed(2)}</span></div>`;
  });

  selectedDrinks.forEach(item => {
    const price = drinkMenu[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>$${price.toFixed(2)}</span></div>`;
  });

  receiptHTML += `<div class="total-line"><span>Total</span><span>$${total.toFixed(2)}</span></div>`;

  document.getElementById("receiptBody").innerHTML = receiptHTML;
  document.getElementById("receipt").style.display = "block";
}
