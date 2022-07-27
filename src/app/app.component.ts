import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import { NodeService } from './nodeservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'primeng';

  nodes: any[];
  selectedNodes: any[] = [];
  selectedNode: any;

  date: Date;

  form: FormGroup = this.fb.group(
    {
      text: [null, []],
      textarea: [null, []],
      integer: [null, []],
      decimal: [null, []],
      date: [null, []],
      dateTime: [null, []],
      dropdown: [null, []],
      multiselect: [null, []],
      switch: [null, []]
    },
    { updateOn: 'blur' }
  );

  listOptions: SelectItem[] = [
    {
      value: 'Angular',
      label: 'Angular',
    },
    {
      value: 'React',
      label: 'React',
    },
  ];
  

  defaultLog: any = {
    message: 'Fill the form fields...',
  };

  log: any = this.defaultLog;

  constructor(private fb: FormBuilder, public nodeService: NodeService) {}

  ngOnInit(): void {
    this.handleValuesChangeEvent();
    this.nodeService.getFiles().then(files => this.nodes = files);
  }

  onSubmit(): void {
    const values = this.getFieldValues();
    this.log = values;
  }

  clearForm(): void {
    this.form.reset();
    this.log = this.defaultLog;
  }

  private handleValuesChangeEvent(): void {
    Object.keys(this.form.controls).forEach((fieldName) => {
      const control = this.form.get(fieldName);
      if (control instanceof FormControl) {
        control.valueChanges.subscribe({
          next: (newValue) => {
            this.log = {};
            this.log[fieldName] = newValue;
          },
        });
      }
    });
  }

  private getFieldValues(values: object = {}): object {
    Object.keys(this.form.controls).forEach((fieldName) => {
      const control = this.form.get(fieldName);
      if (control instanceof FormControl) {
        values[fieldName] = control.value;
      }
    });
    return values;
  }
}
