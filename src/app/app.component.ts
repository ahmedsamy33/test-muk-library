import { Component } from '@angular/core';
import { ButtonType, IButton, MukButtonTypes, MukThemePalette, TooltipPositions } from 'ngx-mui-kit/components/muk-button';
import { ActionsStyle, Column,ITableConfig } from 'ngx-mui-kit/components/muk-table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IAction, IButtonEvent } from 'ngx-mui-kit/common/interfaces';
import { Sort } from '@angular/material/sort';
import { MukModalComponent } from "ngx-mui-kit/components/muk-modal";
import { MukDynamicFormComponent } from "ngx-mui-kit/components/muk-form/muk-dynamic-form";
import { FormFieldInput } from "ngx-mui-kit/components/muk-form/classes";
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tableConfig: ITableConfig<any> = {
    dataSource: new MatTableDataSource([
      {
        name: 'Ahmed Hussein',
        status: true,
        salary: 2000,
        createdAt: '10-08-2023',
        image: 'https://fakeimg.pl/300',
        visits: 200,
        role: 'Team Lead',
      },
      {
        name: 'Ahmed Samy',
        status: true,
        salary: 2000,
        createdAt: '10-08-2023',
        image: 'https://fakeimg.pl/300',
        visits: 20,
        role: 'Admin',
      },
      {
        name: 'Doaa Mahmoud',
        status: true,
        salary: 2000,
        createdAt: '10-08-2023',
        image: 'https://fakeimg.pl/300',
        visits: 15,
        role: 'Admin',
      },
      {
        name: 'Mahmoud Samir',
        status: true,
        salary: 2000,
        createdAt: '10-08-2023',
        image: 'https://fakeimg.pl/300',
        visits: 8,
        role: 'Admin',
      },
      {
        name: 'Ibrahim Rashwan',
        status: true,
        salary: 2000,
        createdAt: '10-08-2023',
        image: 'https://fakeimg.pl/300',
        visits: 50,
        role: 'Admin',
      },
    ]),
    totalElements: 5,
    pageSize: 10,
    displayedColumns: [
      {
        label: 'Image',
        path: 'image',
        type: Column.Image
      },
      {
        label: 'User Name',
        path: 'userNameContent',
        type: Column.Content,
        contentIndex: 0,
      },
      {
        label: 'Status',
        path: 'status',
        type: Column.Boolean,
        mapValues: { true: 'Active', false: 'InActive' },
        isTruncated: true,
      },
      {
        label: 'Salary',
        path: 'salary',
        type: Column.Currency,
        currency: "$"
      },
      {
        label: 'Created At',
        path: 'createdAt',
        type: Column.Date,
      },
      {
        label: 'Visit count',
        path: 'visits',
        type: Column.Number,
      },
      {
        label: 'Role',
        path: 'role',
        type: Column.Text,
        isSortable: true,
      },
      {
        label: 'Actions',
        path: 'actions',
        type: Column.Actions,
        actionsStyle: ActionsStyle.Flat,
        actions: [
          {
            id: 'edit',
            text: 'Edit',
            isMukButton: false,
            isLoading: false,
            color: MukThemePalette.Light,
            matType: MukButtonTypes.Flat,
            type: ButtonType.Button,
            toolTip: {
              position: TooltipPositions.Below,
              toolTip: 'Click to edit item',
            },
          },
        ],
      }
    ],
    isLoading: false,
    loadMoreButtonConfig: {
      text: 'Load More',
      color: MukThemePalette.Primary,
      isMukButton: true,
    },
  }

  formFields = [
    new FormFieldInput({
      label: 'Email Address',
      placeholder: 'Please Enter Your Email Address Here.',
      key: 'email',
      value: '',
      validators: [Validators.required, Validators.email],
      parent: 'one',
      parentClass: 'test',
      class: 'col-md-12',
      fieldConfig: {
        type: 'email'
      }
    }),
    new FormFieldInput({
      label: 'Search',
      placeholder: 'Search here ...',
      key: 'search',
      icon: 'search',
      value: '',
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ],
      parent: 'one',
      parentClass: 'test',
      class: 'col-md-12',
      fieldConfig: {
        type: 'text',
        isWhiteMode: true,
        controlCustomErrors: [
          { errorName: 'notStartsWithA', errorMessage: 'Should start with a' },
        ],
      },
    }),
    new FormFieldInput({
      label: 'Password',
      placeholder: 'Please Enter Your Password Here.',
      key: 'password',
      value: '',
      class: 'col-md-12',
      parent: 'one',
      validators: [Validators.required],
      fieldConfig: {
        type: 'password',
      }
    }),
  ];

  buttons: IButton[] = [
    {
      text: 'Save',
      isMukButton: false,
      isLoading: false,
      color: MukThemePalette.Primary,
      matType: MukButtonTypes.Raised,
      type: ButtonType.Submit,
      toolTip: {
        position: TooltipPositions.Below,
        toolTip: 'Test',
      },
    },
    {
      text: 'Cancel',
      isMukButton: false,
      isLoading: false,
      color: MukThemePalette.Warn,
      matType: MukButtonTypes.Flat,
      type: ButtonType.Button,
      toolTip: {
        position: TooltipPositions.Below,
        toolTip: 'Test',
      },
      className:"mx-2"
    },
  ];

  buttonClass:string ='justify-content-start';

  onDialogTakeAction(params:any){
    this._dialog.closeAll();
  }

  constructor(private _dialog: MatDialog){}

  onPaginatorChange(pageIndex:number){
    console.log("pageIndex",pageIndex);
  }

  openFormDialog(e:any):void {
    const DIALOG = this._dialog.open(MukModalComponent,{
      data:{
        title: "Edit Form Dialog",
        component: MukDynamicFormComponent,
        inputs:{
          formFields: this.formFields,
          buttons: this.buttons,
          buttonClass: this.buttonClass,
          isFormDialog:true
        },
        onTakeAction:(res:IButtonEvent)=>{ 
          res.buttonConfig.isLoading=false;         
          res.buttonConfig.isDisabled=false;         
          DIALOG.close()
        }
      }
    })
  }

  onTakeAction(e:IAction<any>){
    if(e.buttonConfig.id == 'edit'){
      this.openFormDialog(e.element);
    } else {
      console.log("takeAction",e)
    }
  }

  onSortChange(e:Sort){
    console.log("takeAction",e)
  }
}
