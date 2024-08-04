class LStorage {
  #key ='data';
  #currentId = 1;

  constructor() {
    const savedData = this.getItems();
    if(!savedData.length) return;
    this.#currentId = ++savedData.at(-1).id
  }

  getItems() {
    const data = JSON.parse(localStorage.getItem(this.#key));
    return data ? data : [];
  }

  savedItem(todoItem) {
    const data = this.getItems();

    data.push({
      ...todoItem,
      id:this.#currentId
    })
    this.#currentId += 1;
    localStorage.setItem(this.#key, JSON.stringify(data));

    return this.getItems().at(-1)
  };

  removeItem(id) {
    const data = this.getItems();
    const todoItemIndex = data.findIndex(({id: todoItemId}) => {
      return id === todoItemId
    })

    const removedItem = data.splice(todoItemIndex, 1)[0];


    localStorage.setItem(this.#key, JSON.stringify(data))
    return removedItem;
  };

  doneTask(id) {
    const data = this.getItems();
    const todoItemIndex = data.findIndex(({id: todoItemId}) => {
      return id === todoItemId
    })

    data[todoItemIndex].isDone = !data[todoItemIndex].isDone
    localStorage.setItem(this.#key, JSON.stringify(data))
  }
}

const storage = new LStorage();

export default storage;
