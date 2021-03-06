/**
* Dados que serão usados pelo app
*/
var data = { 
	title: 'Minha lista de tarefas',
	tasks: [
	{
	title: 'Estudar Vue.js',
		finished: true
	}, 
	{
	title: 'Criar uma aplicação em Vue.js',
		finished: true
	}, 
	{
	title: 'Implementar Vue.js com Laravel',
		finished: false
	}
	],
	hideFinished: false,
	newTaskTitle: ''
};

/**
* Declarando os componentes
*/
var HeaderComponent = Vue.extend({
	data: () => data,
	template: `
		<div class="jumbotron text-center">
			<h2>{{title}}</h2>
		</div>
	`
});
var FooterComponent = Vue.extend({
	data: () => data,
	template: `
		<footer class="footer text-center">
			<p>Copyright 2018 - <a href="https://rafaellaurindo.com.br" target="_blank ">Rafael Laurindo</a>.</p>
		</footer>
	`
});
var AddTasksComponent = Vue.extend({
	data: () => data,
	methods: {
		addTask: () => {
			let taskTitle = this.data.newTaskTitle.trim();

			if(!taskTitle || taskTitle == ''){
				return ;
			}

			this.data.tasks.push({
				title: taskTitle,
				finished: false
			});

			this.data.newTaskTitle = 	'';
		}
	},
	template: `
		<div class="input-group">
			<input placeholder="Adicione uma tarefa" type="text" class="js-novo-livro form-control" v-model="newTaskTitle" @keyup.enter="addTask">
			<span class="input-group-btn">
				<button  @click="addTask" class="js-add btn btn-success" type="button">Adicionar</button>
			</span>
		</div>
	`
});

var TasksListComponent = Vue.extend({
	data: () => data,
	template: `
		<table class="table table-striped table-hover" v-if="tasks.length > 0">
			<thead>
				<tr>
					<th>Título</th>
					<th>Concluída</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="task in tasks" v-bind:class="{ 'finished': task.finished }" v-if="(!hideFinished && task.finished) || !task.finished">
					<td>{{task.title}}</td>
					<td>
					<label class="switch">
							<input type="checkbox" v-model="task.finished">
							<span class="slider round"></span>
					</label> 
					</td>
				</tr>
			</tbody>
		</table>
	`
});

var HideTasksFinishedComponent = Vue.extend({
	data: () => data,
	template: `
		<div class="form-group">
			<p class="text-muted">
				Ocultar tarefas finalizadas: 
			</p>	
			<label class="switch">
				<input type="checkbox" v-model="hideFinished">
				<span class="slider round"></span>
			</label> 
		</div>
	`
})
/**
* Registrando os componentes
*/
Vue.component('app-header', HeaderComponent);
Vue.component('app-footer', FooterComponent);
Vue.component('task-add', AddTasksComponent);
Vue.component('tasks-list', TasksListComponent);
Vue.component('hide-tasks-finished', HideTasksFinishedComponent);

/**
* Instanciando o Vue
*/
new Vue({ 
	el: '#app', 
	data: data
});