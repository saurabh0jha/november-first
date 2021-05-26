# NovemberFirstOtp

OTP based User friendly login page. Features:

- Uses angular reactive forms.
- User is not be able to paste a copied OTP into the form.
- Typing in any box takes the focus automatically to the next box and so on.
- Pressing delete or backspace deletes current value and go to previous box Re-typing through boxes changes the previous values.
- Clicking arrow buttonsin the boxes takes user in the direction of arrow.
- After all the inputs are filled continue button is clicked automatically.
- A dummy API is called on submit button. i.e. - www.google.com
- Includes unit tests

## Installation and Setup
- install node and node virtual environment if needed
- cd to project directory
- npm install
- npm install -g @angular/cli

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
