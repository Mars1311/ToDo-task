let year = new Date().getFullYear()-2000;
let month = new Date().getMonth()+1;
let day = new Date().getDate();
let hour = new Date().getHours();
let minute = new Date().getMinutes();
let current_date = document.getElementById('current-date');

let date = hour +':' + minute+' '+ day +'.'+ month + '.'+year;

current_date.append(date);

let task_list=[];

let edit_popUp = document.getElementById('edit');
edit_popUp.style.display=' none ';

let edit_button = document.getElementById('edit-button');
edit_button.addEventListener('click', openEditPopUp);

let remove_button = document.getElementById('remove-button');

let tasks_container = document.getElementById('tasks-container');
	window.onload = function(){
		if ( localStorage.getItem('Tasks list')!= null){
			task_list = JSON.parse(localStorage.getItem('Tasks list'));
		for ( key in task_list){
			tasks_container.insertAdjacentHTML('afterbegin', createHTML(task_list[key].title, task_list[key].name, task_list[key].description, task_list[key].priority, task_list[key].deadline, task_list[key].state, task_list[key].id))
			}
		}
	}
// POP UP WINDOWS 	
function openEditPopUp(){
	edit_popUp.style.display=' block ';
	
	editTask();

}
function createHTML(title, name, description, priority, deadline, status, id){
	if (status){
		return(`<div class="task-element">
		<div class="title">
			<p>${title}</p>
		</div>
		<div class="name">
			<p>${name}</p>
		</div>
		<div class="description">
			<p>${description}</p>
		</div>
		<div class="priority">
			<p>${priority}</p></div>
		<div class="deadline">
			<p>${deadline}</p>
		</div>
		<div class="option" id="${id}">
			<div class="state" id="state-button" onclick = "changeState()" >${status}</div>
			<div class="edit" id="open-edit" onclick="openEditPopUp >Edit</div>
			<div class="remove" id="remove-button" onclick = "removeTask()" >Remove</div>
		</div>
</div>`)
		}
	else {
		return(`<div class="task-element">
		<div class="title">
			<p>${title}</p>
		</div>
		<div class="name">
			<p>${name}</p>
		</div>
		<div class="description">
			<p>${description}</p>
		</div>
		<div class="priority">
			<p>${priority}</p></div>
		<div class="deadline">
			<p>${deadline}</p>
		</div>
		<div class="option"  id="${id}">
			<div class="state" id="state-button" onclick="changeState()">${status}</div>
			<div class="edit"  id="open-edit" onclick="openEditPopUp()">Edit</div>
			<div class="remove" id="remove-button" onclick = "removeTask()">Remove</div>
		</div>
</div>`);
	}
}
function createTask(){
	let title = document.getElementById('title-form').value;
	let name = document.getElementById('name-form').value;
	let description = document.getElementById('description-form').value;
	let priority = document.getElementById('priority-form').value;
	let deadline = document.getElementById('deadline-form').value;
	
	let i = task_list.length;
	let task = new Task(title, name, description, priority, deadline, 'undone', i);
	task_list[i]=task;
	localStorage.setItem('Tasks list', JSON.stringify(task_list));
	location.reload(true)

}

function editTask(){
	let target = event.target;
	let taskId=target.parentNode.getAttribute('id')

	let edit_button = document.getElementById('edit-button');
	edit_button.addEventListener('click', ()=>{

	let newtitle = document.getElementById('title-edit').value;
	let newname = document.getElementById('name-edit').value;
	let newdescription = document.getElementById('description-edit').value;
	let newdeadline = document.getElementById('deadline-edit').value;
	
	task_list[+taskId].title = newtitle;
	task_list[+taskId].name = newname;
	task_list[+taskId].description = newdescription;
	task_list[+taskId].deadline = newdeadline;

	localStorage.setItem('Tasks list', JSON.stringify(task_list));
	task_list = JSON.parse(localStorage.getItem('Tasks list'));
	location.reload(true)
} )
	
}

function removeTask(){
	let target = event.target;
	let taskId=target.parentNode.getAttribute('id');
	
	task_list.splice(+taskId, 1);
	localStorage.setItem('Tasks list', 	JSON.stringify(task_list));
	location.reload(true)

}
function changeState(){
	let target = event.target;
	let taskId=target.parentNode.getAttribute('id');
	let task_list= JSON.parse(localStorage.getItem('Tasks list'));
	if(task_list[+taskId].state == 'done'){
		task_list[+taskId].state = 'undone';
		localStorage.setItem('Tasks list', 	JSON.stringify(task_list));
		location.reload(true)

	}
	else{
		console.log('false')
		task_list[+taskId].state = 'done' ;
		localStorage.setItem('Tasks list', 	JSON.stringify(task_list));
		location.reload(true)

	}

}

let confirm_button = document.getElementById('confirm-button');
confirm_button.addEventListener('click', createTask);
class Task {
	constructor(title, name, description, priority, date, state, id){
		this.title = title,
		this.name = name,
		this.description = description, 
		this.priority = priority,
		this.date = date, 
		this.state = state,
		this.id = id
	}

}
