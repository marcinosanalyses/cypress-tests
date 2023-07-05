declare namespace Cypress {
    interface Chainable {
      fillInUserRegisterForm(firstName: string, lastName: string, email: string, pass: string): Chainable<Element>;
      filterByLocation(locationName: string): Chainable<Element>;
      login(username: string, password: string): Chainable<any>;
      api(options?: Partial<Cypress.RequestOptions>): Chainable<Response<any>>;
    }
  }
  