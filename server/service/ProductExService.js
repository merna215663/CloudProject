const Item = require('../models/ProductEx');

class ItemService {
  constructor() {
    this.items = [];
  }

  getAllItems() {
    return this.items;
  }

  createItem(item) {
    this.items.push(item);
    return item;
  }

  deleteItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  updateItemStatus(itemId, status) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.status = status;
      return item;
    } else {
      return null;
    }
  }

  makeExchangeOffer(itemId, offeredItem) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.exchangeOffer = offeredItem;
      return item;
    } else {
      return null;
    }
  }
}

module.exports = new ItemService();
