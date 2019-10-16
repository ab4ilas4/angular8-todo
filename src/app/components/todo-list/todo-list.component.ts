import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[] = [];
  displayedColumns: string[] = ['Sr no.', 'title','completed', 'Action'];
  dataSource: MatTableDataSource<Todo>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private todoService: TodoService) { }

  ngOnInit() {
    this.todos=this.todoService.getTodoarray();
    if(this.todos){
      this.todoService.setTodoarray(this.todos);
      this.dataSource = new MatTableDataSource(this.todos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else{
      this.todoService.getAllTodos().subscribe(
        (resp: Todo[]) => {
          this.todos = resp;
          this.todoService.setTodoarray(this.todos);
          this.dataSource = new MatTableDataSource(this.todos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
        }
      );
    }
   
  }


  onClickEditTodoDetail(todo) {
    console.log(todo.id);
    this.router.navigate(['/todo-detail'], { queryParams: { id: todo.id } });
  }

  onClickAddTodo() {
    this.router.navigate(['/todo-detail']);
  }

  onClickTodoDelete(todo) {
    this.todoService.deleteTodoDetail(todo).subscribe(response => { 
      let todoarray=this.todoService.getTodoarray() 
      let index = todoarray.indexOf(todo);  
      todoarray.splice(index, 1);  
      this.dataSource =  new MatTableDataSource<Todo>(todoarray);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
   
    });
   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



