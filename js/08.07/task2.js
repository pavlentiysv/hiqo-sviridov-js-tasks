function Collection(constructor) {
  this.collectionContainer = [];
  this.constructor = constructor;
}

Collection.prototype.readAll = function() {
  return this.collectionContainer;
};

Collection.prototype.add = function(...args) {
  this.collectionContainer.push(Object.seal(new this.constructor(...args)));
  return this.collectionContainer;
};

Collection.prototype.get = function(itemToFind) {
  const chosenItem = this.collectionContainer.find(itemToFind);
  const that = this;

  return {
    update(modify) {
      modify(chosenItem);
      return this;
    },

    read() {
      return chosenItem;
    },

    remove() {
      that.collectionContainer.splice(
        that.collectionContainer.indexOf(that.chosenItem),
        1
      );
    }
  };
};

Collection.prototype.getBy = function(itemsToFind) {
  const chosenItems = this.collectionContainer.filter(itemsToFind);
  const that = this;

  return {
    update(modify) {
      let i = 0;
      chosenItems.forEach(element => {
        modify(element, i);
        i++;
      });
      return this;
    },

    read() {
      return chosenItems;
    },

    remove() {
      that.chosenItems.forEach(element => {
        collectionContainer.splice(
          collectionContainer.indexOf(element),
          1
        );
      });
    }
  };
};

/*
	Collection methods:
	
	1) readAll - returns array of all collection items
	2) add - creates new collection item using passed to Collection constructor, dogsCollection.add(1, 'Test name1') === new Dog(1, 'Test name1') (see example below)
	3) get - gets first matched collection item and allows to operate on it using update, remove, read methods (see example below)
	4) update - allows to update directly collection item, doesn't support initial model's extension (see example below)
	5) remove - removes item from collection
	6) read - returns collection item
*/

// Expected result

function Dog(id, name) {
  this.id = id;
  this.name = name;
}

const dogsCollection = new Collection(Dog);

dogsCollection.readAll(); // => []

dogsCollection.add(1, 'Test name1'); // Creates instance of Dog
dogsCollection.add(2, 'Test name2'); // Creates instance of Dog
dogsCollection.add(3, 'Test name3'); // Creates instance of Dog

dogsCollection.readAll(); // => array [Dog instance(id = 1, name = 'Test name1'), Dog instance(id = 2, name = 'Test name2'), Dog instance(id = 3, name = 'Test name3')]

const dogsCollectionItem = dogsCollection.get(dog => dog.id === 1);

dogsCollectionItem
  .update(dog => {
    dog.name = 'Updated test name 1'; // => Dog instance(id = 1, name = 'Updated test name 1')
  })
  .update(dog => {
    dog.someNewField = 'Some new field'; // => nothing changed, collection items don't support initial model's extension (HINT: Object.seal should be used)
  });

const dog1 = dogsCollectionItem.read(); // => returns Dog instance object(id = 1, name = 'Test name1')

const dogsCollectionItems = dogsCollection.getBy(dog => dog.id < 3);

dogsCollectionItems.update((dog, index) => {
  // => callback iterates through all matches collection's items ([Dog instance(id = 1, name = 'Test name1'), Dog instance(id = 2, name = 'Test name2')])
  dog.name = `Updated test name ${index}`;
});

const dogs = dogsCollectionItems.read(); // => array [Dog instance(id = 1, name = 'Test name1'), Dog instance(id = 2, name = 'Test name2')]

dogsCollectionItem.remove(); // => removes Dog instance object(id = 1, name = 'Test name1') from collection
