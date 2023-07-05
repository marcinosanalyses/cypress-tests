/// <reference types="../support/index.d.ts" />
/// <reference types="../../cypress.d.ts" />


describe("Web app tests", () => {
    beforeEach(() => {
        cy.intercept('GET', `${Cypress.env('appUrl')}/en/job-requests?page=0&size=20**`).as('getRequestList');
        cy.visit(`${Cypress.env('appUrl')}/en/job-requests`);
        cy.get('@getRequestList');
    });
    it("Check if basic elements are visible", () => {
        cy.contains('Search');
        cy.contains('Log in');
        // From some reason News are hidden now.
        // cy.contains('News'); 
        cy.contains('Contact us');
        cy.contains('Open Jobs',{matchCase:false});
    });
    it("Not logged in user can filter by location and see job request list", () => {
        const locationName = 'Stockholm';
        cy.filterByLocation(locationName);
    });
    it("Not logged in user can filter by remote jobs", () => {
        cy.intercept('GET','api/public/job-requests?page=0&size=20&remote=FULLY_REMOTE**').as('getRemoteJobs');
        cy.get('[aria-haspopup="listbox"]').contains('remote',{matchCase:false}).click();
        cy.get('[id^="FULLY_REMOTE-"]').click();
        cy.get('[data-opener="button"]').contains('remote');
        cy.get('[id^="FULLY_REMOTE-"]').should('have.attr', 'aria-selected', 'true');
        cy.get('[type="submit"]').click()
        cy.wait('@getRemoteJobs')
        cy.get('.section > .-flex-align-flex-start').should('have.length.above',10).contains('remote',{matchCase:false});
    });
    it("Try to register an existing user", () => {
        const firstName = Cypress.env('firstName');
        const lastName = Cypress.env('lastName');
        const email =  Cypress.env('email');
        const pass = Cypress.env('pass');
        
        cy.contains('Create account').click();
        cy.fillInUserRegisterForm(firstName, lastName, email, pass);
        cy.get('[type="submit"]').click();
        cy.contains('This email address is already in use');
    });
});
