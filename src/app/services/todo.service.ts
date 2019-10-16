import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Observable';
import { Todo } from '../model/todo';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

@Injectable()
export class TodoService {

    public todoarray: Todo[];
    url: string = 'https://jsonplaceholder.typicode.com/todos'
    constructor(private http: HttpClient) { }



    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url)
    }

    setTodoarray(todos) {
        this.todoarray = todos;
    }
   
    getTodoarray() {
        return this.todoarray;
    }

    getTodoById(id: number): Todo {
        return this.todoarray.find(i => i.id == id);
    }

    createTodo(todo): Observable<Todo> {
        return this.http.post<Todo>(this.url, JSON.stringify(todo));
    }

    UpdateTodo(todo){
        return this.http.patch(this.url + '/' + todo.id, JSON.stringify({ title: 'bvdv' })); 
    }


    deleteTodoDetail(todo) {
      return   this.http.delete(this.url + '/' + todo.id)  
    }
}
