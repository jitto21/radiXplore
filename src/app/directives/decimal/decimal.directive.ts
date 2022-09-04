import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective {

  specialChars = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', ':', ';', "'", '"', '<', '>', ',', '?', '/']

  constructor() { }

  @HostListener('keydown', ['$event', '$event.target'])
  onInput(event: KeyboardEvent, input: HTMLInputElement) {
    console.log(event);
    console.log(this.specialChars.includes(event.key) && event.shiftKey);
    if (event.code.startsWith('Numpad') || event.code.startsWith('Digit')) {
      let inputValue = input.value.substring(0,1) === '-' ? input.value.substring(1) : input.value;
      let [num, dec] = inputValue.split(".");
      console.log("num: ", num, ", dec: ", dec)
      if (num && num.length > 3) {
        console.log("num 3 places only !!!")
        event.stopPropagation();
        event.preventDefault();
      }
      if (dec && dec.length > 1 && inputValue.length >= 5) {
        console.log("dec 2 places only !!!")
        event.stopPropagation();
        event.preventDefault();
      }
    } else if (event.code.startsWith('Key') || this.specialChars.includes(event.key) || (this.specialChars.includes(event.key) && event.shiftKey)) {
      console.log("special chars not allowed !!!")
      event.stopPropagation();
      event.preventDefault();
    } else {
      return;
    }

  }

}
