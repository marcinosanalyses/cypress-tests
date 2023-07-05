declare namespace Cypress {
    interface Chainable {
      fillInUserRegisterForm(firstName: string, lastName: string, email: string, pass: string): Chainable<Element>;
      filterByLocation(locationName: string): Chainable<Element>;
    }
  }
  