import { MapServiceService } from './../../services/map-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private mapService: MapServiceService) { }

  locationForm: FormGroup = new FormGroup({});
  formControls: LocationFormControl[] = [
    { control: 'name', validators: [Validators.required] },
    { control: 'description', validators: [Validators.required] },
    { control: 'latitude', validators: [Validators.required, Validators.min(-90), Validators.max(90), this.validateNumber.bind(this)] },
    { control: 'longitude', validators: [Validators.required, Validators.min(-180), Validators.max(180), this.validateNumber.bind(this)] }]

  ngOnInit() {
    this.formControls.forEach((formControl: LocationFormControl) => {
      this.locationForm.addControl(formControl.control, new FormControl("", formControl.validators))
    })
    console.log(this.locationForm)

  }

  public onClickSubmit() {
    if (this.locationForm.valid) {
      console.log(this.locationForm)
      this.mapService.setMapData(this.locationForm.value);
    }
  }

  onClickReset() {
    this.locationForm.clearValidators();
    this.locationForm.reset();
    console.log(this.locationForm)
  }

  validateNumber(control: AbstractControl): { [key: string]: any } | null {
    const controlValue: string = control.value;
    if (controlValue && (controlValue.match("^-{0,1}[0-9]+\.{0,1}[0-9]{0,2}$"))) {
      return null;
    }
    return { 'coordinatesInvalid': true };
  }
}

interface LocationFormControl {
  control: string;
  validators: ((control: AbstractControl) => ValidationErrors | null)[]
}
