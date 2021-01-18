window.addEventListener('load', start);

var names = ['Alice', 'Emanuel', 'Aurora', 'Eduardo'];
var inputName;
var isEditing = false;
var currentIndex;

function start() {
    inputName = document.getElementById('inputName');
    preventFormSubmit();
    activateInput();
    render();
    console.log(inputName);
}

function preventFormSubmit() {
    function handleFormSubmit(event){
        event.preventDefault();
    }    
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertName(newName){
        names.push(newName);
    }
    function updateName(newName) {
        names[currentIndex] = newName;
    }
    function handleTyping(event) {
        if(event.key === 'Enter'){
            if(isEditing){ 
                var typedName = event.target.value;
                updateName(typedName);
                render();
                clearInput();
            }
            else {
                var typedName = event.target.value;
                insertName(typedName);
                render();
                clearInput();
            }
            isEditing = false;
            
        }
    }
    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

function render(){
    function createDeleteButton(index){
        function deleteName(){
            var li = document.querySelectorAll(li);
            names.splice(index, 1);
            render();
        } 
        var button = document.createElement('button'); 
        button.textContent = 'x';
        button.classList.add('deleteButton');
    
        button.addEventListener('click', deleteName);
        
        return button;
    }

    function createSpan(name, index) {
        function editItem() {
            inputName.value = name;
            inputName.focus(); 
            isEditing = true; 
            currentIndex = index;
        }

        var span = document.createElement('span');
        span.classList.add('clickable')
        span.textContent = currentName;
        span.addEventListener('click', editItem);
        
        return span;
    }

    var divNames = document.querySelector('.names');
    divNames.innerHTML = '';
    var ul = document.createElement('ul');
    
    for(var i = 0; i < names.length; i++){
        var currentName = names[i];
        var li = document.createElement('li');
        
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i)
        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
        divNames.appendChild(ul);
        console.log('oi')
    }
}

function clearInput() {
    inputName.value = '';
}