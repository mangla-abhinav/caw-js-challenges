$(document).ready(() => {
  const menuItems = [
    {
      name: 'French Fries with Ketchup',
      price: 223,
      image: 'plate__french-fries.png',
      alt: 'French Fries',
      count: 0,
    },
    {
      name: 'Salmon and Vegetables',
      price: 512,
      image: 'plate__salmon-vegetables.png',
      alt: 'Salmon and Vegetables',
      count: 0,
    },
    {
      name: 'Spaghetti Meat Sauce',
      price: 782,
      image: 'plate__spaghetti-meat-sauce.png',
      alt: 'Spaghetti with Meat Sauce',
      count: 0,
    },
    {
      name: 'Bacon, Eggs, and Toast',
      price: 599,
      image: 'plate__bacon-eggs.png',
      alt: 'Bacon, Eggs, and Toast',
      count: 0,
    },
    {
      name: 'Chicken Salad with Parmesan',
      price: 698,
      image: 'plate__chicken-salad.png',
      alt: 'Chicken Salad with Parmesan',
      count: 0,
    },
    {
      name: 'Fish Sticks and Fries',
      price: 634,
      image: 'plate__fish-sticks-fries.png',
      alt: 'Fish Sticks and Fries',
      count: 0,
    },
  ];
  const addButtons = $('.add');
  const subTotal = $('.amount.price.subtotal');
  const tax = $('.amount.price.tax');
  const total = $('.amount.price.total');
  const list = $('.cart-summary');

  let subTotalValue = 0.0;
  let taxValue = 0.0;
  let totalValue = 0.0;

  const updateSubTotal = (price) => {
    subTotalValue = Math.round((subTotalValue + price) * 100) / 100;
    subTotal.text(`$ ${subTotalValue}`);
  };
  const updateTax = () => {
    taxValue = Math.round(subTotalValue * 9.75) / 100;
    tax.text(`$ ${taxValue}`);
  };
  const updateTotal = () => {
    totalValue = Math.round((subTotalValue + taxValue) * 100) / 100;
    total.text(`$ ${totalValue}`);
  };
  const updatePrice = (price) => {
    updateSubTotal(price);
    updateTax();
    updateTotal();
  };

  const decrease = (e) => {
    if (menuItems[e.data.itemIndex].count === 0) {
      $(`#${e.data.itemIndex}`).remove();
      $(addButtons[e.data.itemIndex])
        .removeClass('in-cart')
        .addClass('add')
        .text('Add to Cart');
    } else {
      menuItems[e.data.itemIndex].count -= 1;
      $(`.${e.data.itemIndex}`).text(menuItems[e.data.itemIndex].count);
      updatePrice(-menuItems[e.data.itemIndex].price / 100);
    }
    if ($('.cart-summary li').length === 0) {
      $('.empty').show();
    }
  };
  const increase = (e) => {
    menuItems[e.data.itemIndex].count += 1;
    $(`.${e.data.itemIndex}`).text(menuItems[e.data.itemIndex].count);
    updatePrice(menuItems[e.data.itemIndex].price / 100);
  };

  const appendToCart = (itemIndex) => {
    if ($('.empty').is(':visible')) {
      $('.empty').hide();
    }

    const fragment = document.createDocumentFragment();
    const li = document.createElement('li');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');

    $(li).attr({ id: itemIndex });

    $(div).attr({ class: 'plate' });
    $(img).attr({
      class: 'plate',
      src: `./images/${menuItems[itemIndex].image}`,
      alt: menuItems[itemIndex].alt,
    });
    div.appendChild(img);
    let ref = div;
    div = document.createElement('div');
    $(div)
      .attr({ class: `quantity ${itemIndex}` })
      .text(menuItems[itemIndex].count);
    ref.appendChild(div);
    fragment.appendChild(ref);

    div = document.createElement('div');
    $(div).attr({ class: 'content' });
    $(p).attr({ class: 'menu-item' }).text(menuItems[itemIndex].name);
    div.appendChild(p);
    p = document.createElement('p');
    $(p)
      .attr({ class: 'price' })
      .text(`$ ${menuItems[itemIndex].price / 100}`);
    div.appendChild(p);
    fragment.appendChild(div);

    div = document.createElement('div');
    $(div).attr({ class: 'quantity__wrapper' });
    $(button).attr({ class: 'decrease' }).click({ itemIndex }, decrease);
    img = document.createElement('img');
    $(img).attr({
      src: './images/chevron.svg',
    });
    button.appendChild(img);
    div.appendChild(button);
    ref = div;

    div = document.createElement('div');
    $(div)
      .attr({ class: `quantity ${itemIndex}` })
      .text(menuItems[itemIndex].count);
    button = document.createElement('button');
    $(button).attr({ class: 'increase' }).click({ itemIndex }, increase);
    img = document.createElement('img');
    $(img).attr({
      src: './images/chevron.svg',
    });
    button.appendChild(img);
    ref.appendChild(div);
    ref.appendChild(button);
    fragment.appendChild(ref);

    div = document.createElement('div');
    $(div)
      .attr({ class: 'subtotal' })
      .text(menuItems[itemIndex].price / 100);
    fragment.appendChild(div);

    li.append(fragment);
    list.append(li);
  };

  const updateCart = (itemIndex) => {
    menuItems[itemIndex].count += 1;
    appendToCart(itemIndex);
    updatePrice(menuItems[itemIndex].price / 100);
  };

  const updateAddButton = (itemIndex) => {
    $(addButtons[itemIndex])
      .removeClass('add')
      .addClass('in-cart')
      .text('In Cart')
      .prepend('<img src="images/check.svg" alt="Check" />');
  };

  for (let i = 0; i < addButtons.length; i += 1) {
    $(addButtons[i]).click((e) => {
      e.preventDefault();
      if (menuItems[i].count === 0) {
        updateAddButton(i);
        updateCart(i);
      }
    });
  }
});
