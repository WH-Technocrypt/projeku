const foodMenu = {
  "Splitza Signature": 90000,
  "Splitza Classic": 80000,
  "Veggie Garden": 76000,
  "Meat Lovers": 86000,
  "Super Supreme": 86000,
  "Tuna Melt": 76000,
  "Cheesy Galore": 76000,
  "My Box": 46000,
  "My Box Plus": 60000,
  "My Box XL": 80000,
  "Maksi Ber-2": 120000,
  "My Box Hitss": 135000,
  "Triple My Box Plus": 165000,
  "Duo Pizza": 156000,
  "DELUXE Pizza Original Reguler": 78000,
  "Double Nikmat": 198000,
  "Big Box Classic": 160000,
  "Big Box Signature": 165000,
  "Big Box Signature Splitza": 165000,
  "Double Box Signature Regular": 165000,
  "Double Heart Box": 203000,
  "Double Box Heart": 179000,
  "Double Box Regular Splitza": 165000,
  "L1MO PIZZA": 274000,
  "Double Box Signature Jumbo": 283000,
  "Double Box Jumbo Splitza": 283000,
  "Regular Signature Pizza": 109000,
  "Regular Classic Pizza": 99000,
  "Regular Heart Pizza": 133000,
  "Jumbo Signature Pizza": 158000,
  "Splitza Regular": 114000,
  "Splitza Jumbo": 168000,
  "Wingstreet": 56000,
  "Boneless": 45000,
  "Cumi Cabe Ijo": 73000,
  "Oriental Chicken Spaghetti": 66000,
  "Beef Lasagna": 65000,
  "Chicken Fettuccine alla Italia": 65000,
  "Pepperoni Cheese Fusilli": 62000,
  "Beef Fettuccine": 62000,
  "Beef Spaghetti": 62000,
  "Choco Puff": 34000,
  "Chicken Sticks": 35000,
  "Cheesy Dough Ball": 33000,
  "Beef Sausage Bites": 35000,
  "Mac ‘n Cheese": 35000,
  "Cheese Rolls": 33000,
  "Potato Wedges": 31000,
  "Sausage Popstick": 31000,
  "Fresh Salad": 42000
};

const drinkMenu = {
  "Melon Lemonade": 19000,
  "Orange Delight": 19000,
  "Lemon Tea": 19000,
  "Cappuccino Jelly": 25000,
  "Coca Cola 1 Liter": 28000,
  "Aqua": 12000
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
    receiptHTML += `<div class="item-line"><span>${item}</span><span>Rp${price.toLocaleString()}</span></div>`;
  });

  selectedDrinks.forEach(item => {
    const price = drinkMenu[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>Rp${price.toLocaleString()}</span></div>`;
  });

  receiptHTML += `<div class="total-line"><span>Total</span><span>Rp${total.toLocaleString()}</span></div>`;

  document.getElementById("receiptBody").innerHTML = receiptHTML;
  document.getElementById("receipt").style.display = "block";
}
