const itemService = require('../service/ProductExService');

class ItemController {
  getAllItems(req, res) {
    const items = itemService.getAllItems();
    res.json(items);
  }

  createItem(req, res) {
    const newItem = req.body;
    const createdItem = itemService.createItem(newItem);
    res.json({ message: 'Item added successfully', item: createdItem });
  }

  deleteItem(req, res) {
    const itemId = req.params.id;
    itemService.deleteItem(itemId);
    res.json({ message: 'Item deleted successfully' });
  }

  updateItemStatus(req, res) {
    const itemId = req.params.id;
    const { status } = req.body;
    const updatedItem = itemService.updateItemStatus(itemId, status);

    if (updatedItem) {
      res.json({ message: 'Item status updated successfully', item: updatedItem });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }

  makeExchangeOffer(req, res) {
    const itemId = req.params.id;
    const { offeredItem } = req.body;
    const itemWithOffer = itemService.makeExchangeOffer(itemId, offeredItem);

    if (itemWithOffer) {
      res.json({ message: 'Exchange offer made successfully', item: itemWithOffer });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }
}

module.exports = new ItemController();
