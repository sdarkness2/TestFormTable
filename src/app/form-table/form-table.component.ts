import { DataSource } from '@angular/cdk/collections';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';

export interface formulario {
  nome: any;
  idade: any;
  teste1: any;
  teste2: any;
  teste3: any;
}

const elementdata: formulario[] = [];

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements OnInit {
  displayedColumns: string[] = ['Nome', 'Idade', 'Teste1','Teste2', 'Teste3']
  public nome = new FormControl('', [Validators.required, Validators.minLength(4)]);
  public idade = new FormControl('', [Validators.required, Validators.min(100), this.validarQtd]);
  public teste1 = new FormControl('', [Validators.required, Validators.minLength(4)]);
  public teste2 = new FormControl('', [Validators.required, Validators.minLength(4)]);
  public teste3 = new FormControl('', [Validators.required, Validators.minLength(4)]);
  dataToDisplay = [...elementdata];
  dataSource = new ExampleDataSource(this.dataToDisplay);
  newAsset: boolean = false

  constructor() { }

  ngOnInit(): void {
  }


  validarQtd(input: FormControl)
  {
    return ((input.value%100==0) ? null : {validar: true})
  }

  mudarOperacao() {
    if(this.newAsset == true)
    {this.newAsset = false}
    else {this.newAsset=true}
  }

  addData() {
    if (!this.nome.invalid && !this.idade.invalid && this.idade.value%100 == 0)
    {
      if (this.newAsset == false)
      {
        const newValue = {nome: this.nome.value, idade: this.idade.value, teste1: null, teste2: null, teste3: null};
        this.dataToDisplay.push(newValue);
        this.dataSource.setData(this.dataToDisplay);
        this.nome.reset();
        this.idade.reset();
        this.teste1.reset();
        this.teste2.reset();
        this.teste3.reset();
      }
      else if (this.newAsset == true)
      {
        const newValue = {nome: this.nome.value, idade: this.idade.value, teste1: this.teste1.value, teste2: this.teste2.value, teste3: this.teste3.value};
        this.dataToDisplay.push(newValue);
        this.dataSource.setData(this.dataToDisplay);
        this.nome.reset();
        this.idade.reset();
        this.teste1.reset();
        this.teste2.reset();
        this.teste3.reset();
      }
    }
    else
    {
      this.validarCampos()
    }
  }

  validarCampos()
  {
    if(this.nome.invalid)
    {this.nome.markAllAsTouched();}
    if(this.idade.invalid)
    {this.idade.markAllAsTouched();}
    if(this.teste1.invalid)
    {this.teste1.markAsTouched()};
    if(this.teste2.invalid)
    {this.teste2.markAsTouched()};
    if(this.teste3.invalid)
    {this.teste3.markAsTouched()};
  }

}

/* OUTRA CLASSE */

class ExampleDataSource extends DataSource<formulario> {
  private _dataStream = new ReplaySubject<formulario[]>();

  constructor(initialData: formulario[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<formulario[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: formulario[]) {
    this._dataStream.next(data);
  }
}

