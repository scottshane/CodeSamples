(function(doc, win) {
    var addItemModal  = new AddModal(doc.querySelector('.modal.add-item'));
    var viewItemModal = new ViewModal(doc.querySelector('.modal.view-item'));
    var addItemBtn    = doc.querySelector('.add-item');
    var listItems     = doc.querySelector('.list-items');
    var singleClick   = false;

    // Modal Constructor
    function Modal(elem) {
        var self = this;

        var _closeBtn = this.elem.querySelector('.close-btn');
        _closeBtn.addEventListener('click', function() {
            self.toggleModal(false);
        });

        this.toggleModal = function(show) {
            this.elem.classList[ show ? 'add' : 'remove' ]('active');
        };
    }
    // Add to List modal
    function AddModal(elem) {
        var _name        = elem.querySelector('.add-item-name');
        var _desc        = elem.querySelector('.add-item-desc');
        var _addItemForm = elem.querySelector('.add-item-form');
        var _resetForm   = function() {
            _name.value  = '';
            _desc.value  = '';
        };
        var _handleFormSubmit = function(e) {
            e.preventDefault();
            var newItem;
            var addItemFormName = _addItemForm.querySelector('.add-item-name');
            var addItemFormDesc = _addItemForm.querySelector('.add-item-desc');

            if (!addItemFormName || !addItemFormDesc) { return false; }

            newItem = {
                name: addItemFormName.value,
                desc: addItemFormDesc.value
            };

            createNewItem(newItem);
            addItemModal.toggleModal(false);
            _resetForm();
        }

        this.elem = elem;
        // get access to Modal Constructor's properties and put them in the
        // context of this modal. `apply` is used instead of `call` to
        // anticipate possibility to pass arguments through 
        Modal.apply(this);

        _addItemForm.addEventListener('submit', _handleFormSubmit);
    }
    // Display info/discription modal
    function ViewModal(elem) {
        var _name = elem.querySelector('.view-item-name');
        var _desc = elem.querySelector('.view-item-desc');
        this.elem = elem;

        Modal.apply(this);

        this.populateDetails = function(data) {
            _name.innerHTML = data.name;
            _desc.innerHTML = data.desc;
        }
    }

    // Item Constructor
    function Item(itemObj) {
        // Private methods
        var _handleClick = function(e){
            var self = this;
            if (e.target.nodeName !== 'INPUT') {
                e.preventDefault();
                // register the first click
                singleClick = true;
                // determining double click 
                window.setTimeout(function() {
                    if (singleClick) {
                        if (e.target.nodeName === 'LABEL') {
                            _toggleCheckBox.call(self);
                        }
                    }
                }, 250);
            }
        }
        var _handleDblClick = function(e){
            e.preventDefault();
            singleClick = false;
            viewItemModal.populateDetails(this);
            viewItemModal.toggleModal(true);
        }
        var _toggleCheckBox = function() {
            this.checkboxElem.checked = !this.checkboxElem.checked;
        }
        var _render = function() {
            // Deep clone our 'template' element from the DOM to make new
            // list items node.
            var elem = listItems.querySelector('.list-item').cloneNode(true);
            // set the name to the label
            elem.querySelector('label').innerHTML = this.name;
            // bind eventlisterners to new node
            elem.addEventListener('dblclick', _handleDblClick.bind(this));
            elem.addEventListener('click', _handleClick.bind(this));
            
            return elem;
        }
        
        this.name = itemObj.name;
        this.desc = itemObj.desc;
        this.checked = itemObj.checked;
        this.elem = _render.call(this);
        this.checkboxElem = this.elem.querySelector('input');
        this.checkboxElem.checked = this.checked;
    }

    // Event Handlers
    function handleAddItemClick(e) {
        addItemModal.toggleModal(true);
    }

    function createNewItem(itemObj) {
        var newItem = new Item(itemObj);
        listItems.appendChild(newItem.elem);
    }

    // Event Setup
    addItemBtn.addEventListener('click', handleAddItemClick.bind(this));

    // Init app
    (function init() {
        // initial list model
        var starterItems = [
            {name: 'Milk'  , desc: 'Organic 2%'       , checked: true},
            {name: 'Eggs'  , desc: 'Free range dozen' , checked: false},
            {name: 'Flour' , desc: 'King Arthur'      , checked: false},
            {name: 'Sugar' , desc: 'C&H Pure Cane'    , checked: false},
            {name: 'Salt'  , desc: 'Morton\'s Kosher' , checked: true}
        ];
        // loop initial model and create new Items for list
        starterItems.forEach(function(item) {
            // instantiate a new item with current model property
            var newItem = new Item(item);
            // attach it to the DOM
            listItems.appendChild(newItem.elem);
        }, this);
    }());
}(document, window));
