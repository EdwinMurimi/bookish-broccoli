const addNewShoppingItemButton = document.getElementById("add-new-shopping-item");
const createShoppingItemButton = document.getElementById("create-shopping-item");
const updateShoppingItemButton = document.getElementById("update-shopping-item");
const idField = document.getElementById("id-field");
const bodyField = document.getElementById("body-field");
const todoList = document.querySelector(".todo-content");
const div = document.createElement("div");

updateShoppingItemButton.style.display = "none"

let Todos = [];

const displayAllTodos = () => {
	todoList.innerHTML = ""

	if (Todos.length == 0) {

		todoList.innerHTML += `
		<div class = "empty-todo">
		<img src="undraw_empty_xct9.png" alt="empty image" style="width: 50%;">
		<br>
		<span style="font-family: 'Fira Sans', sans-serif; font-size: 20px; font-weight: bold;">There are no shopping items yet...</span>
		<br>
		</div>
		`;
	} else {		
		for(let key in Todos){
			let todo = Todos[key];
			todoList.innerHTML += `
			<div data-id="${todo.id}" class="todo-content-item">
				<span class="todo-id">▪️ ${todo.id} ▪️</span>
				${todo.status === "Complete" ? `<span style="text-decoration: line-through;" class="todo-text">${todo.body}</span>` : `<span class="todo-text">${todo.body}</span>`}
				${todo.status === "Complete" ? `<span class="todo-status complete">▪️ ${todo.status} ▪️</span>` : `<span class="todo-status incomplete">▪️ ${todo.status} ▪️</span>`}
				<div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center;" class="actions-window">
					<i class="far fa-edit"></i>
					<i class="far fa-trash-alt"></i>
					${todo.status === "Complete" ? "" : '<i class="fas fa-check"></i>'}
				</div>
			</div>
			`;
		};
	}
}

displayAllTodos();

const addShoppingItem = () => {
	const id = generateID();
	const body = bodyField.value;
	const status = "Not complete";
	Todos.push({ id, body, status })
	bodyField.value = "";
	displayAllTodos();
}

const editTodo = (itemId) => {
	createShoppingItemButton.style.display = "none"
	updateShoppingItemButton.style.display = "block"
	const {id, status, body} = Todos.filter(todo => todo.id == itemId)[0];

	idField.value = id;
	bodyField.value = body;
}

const generateID = () => {
	let id = `${Math.random().toString(36).substr(2, 6)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 6)}`;
	return id;
}

const getTimeStamp = () => {
	let date = new Date();
	let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	return time;
}

const addNewTodo = () => {
	idField.value = generateID();
}

const deleteTodo = (itemId) => {
	Todos = Todos.filter(todo => todo.id != itemId);
	displayAllTodos();
}

const updateShoppingItem = () => {
	const todos = Todos.map(todo=>{
		if(todo.id === idField.value){
			todo.status = "Not complete";
			todo.body = bodyField.value;
			return todo;
		}else{
			return todo;
		}
	})
	Todos = todos;
	idField.value = "";
	bodyField.value = "";
	displayAllTodos();
	updateShoppingItemButton.style.display = "none"
	createShoppingItemButton.style.display = "block"
}

const markTodoAsComplete = (itemId) => {
	const todos = Todos.map(todo=>{
		if(todo.id === itemId){
			todo.status = "Complete";
			return todo;
		}else{
			return todo;
		}
	})
	Todos = todos;
	displayAllTodos();
}

todoList.addEventListener('click', (e)=>{

	const id = e.target.parentElement.parentElement.dataset.id;

	if(e.target.classList.contains('fa-edit')){
	  editTodo(id);
	}
	
	if(e.target.classList.contains('fa-trash-alt')) {
	  deleteTodo(id);
 	}

	if(e.target.classList.contains('fa-check')){
	  markTodoAsComplete(id);
	}
})

addNewShoppingItemButton.addEventListener('click', addNewTodo);
createShoppingItemButton.addEventListener('click', addShoppingItem);
updateShoppingItemButton.addEventListener('click', updateShoppingItem);