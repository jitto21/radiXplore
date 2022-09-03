import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective {

  constructor() { }

  @HostListener('keydown', ['$event', '$event.target'])
  onInput(event: KeyboardEvent, input: HTMLInputElement) {
    console.log(event)
    if (event.key === 'Backspace') {
      return;
    }
    console.log(event)
    const [num, dec] = input.value.split(".");
    console.log("num: ", num, ", dec: ", dec)
    if (dec && dec.length > 1) {
      console.log("STOPPP !!!")
      event.stopPropagation();
      event.preventDefault();
    }
  }

}
