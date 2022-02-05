let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const onDragStart = (event) => {
  return event.dataTransfer.setData('text', event.target.id);
};

const onDragEnd = (event) => {
  return event.dataTransfer.clearData();
};

const onDrop = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text');
  event.target.append(document.getElementById(id));
}

const onSave = () => {
  error.innerHTML = '';
  const input = document.querySelector('input');
  const value = input.value;
  if (value !== '') {
    const item = document.getElementById('item' + order);
    order += 1;
    item.append(value);
    adding = false;
  } else {
    error.innerHTML = message;
  }
};

const create_item = () => {
  const item = document.createElement('div');
  item.classList.add('item');
  item.id = 'item' + order;
  item.draggable = true;

  item.addEventListener('dragstart', onDragStart);
  item.addEventListener('dragend', onDragEnd);

  const input = document.createElement('input');
  item.append(input);

  const save_btn = document.createElement('button');
  save_btn.innerHTML = 'Save';

  save_btn.addEventListener('click', onSave);
  item.append(save_btn);

  return item;
};

document.querySelectorAll('.drop').forEach(element => {
  element.addEventListener('drop', onDrop);
  element.addEventListener('dragover', event => event.preventDefault());
});