/// <reference types="cypress" />

describe("Web app tests", () => {
    beforeEach(() => {
        cy.intercept('GET','/api/public/job-requests/**').as('getRequestList');
        cy.visit(Cypress.env('appUrl')+'/en/job-requests')
        cy.get('@getRequestList')
    })
    it("Check if basic element are visible", () => {
        cy.contains('Search',{matchCase:false})
        cy.contains('Log in',{matchCase:false})
        cy.contains('News',{matchCase:false})
        cy.contains('Contact us',{matchCase:false})
        cy.get('a.route-section').should('have.length.above',1)

    });
})