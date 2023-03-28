/// <reference types="cypress" />

describe("Web app tests", () => {
    beforeEach(() => {
        cy.intercept('GET','app.verama.com/en/job-requests?page=0&size=20**').as('getRequestList');
        cy.visit(Cypress.env('appUrl')+'/en/job-requests')
        cy.get('@getRequestList')
    })
    it("Check if basic element are visible", () => {
        cy.contains('Search')
        cy.contains('Log in')
        cy.contains('News')
        cy.contains('Contact us')
        cy.contains('Open Jobs')
    });
    it("Not logged in user can filter by location and see job request list", () => {
        const locationName = 'Stockholm'
        cy.filterByLocation(locationName)

    });
    it("Try to register an existing user", () => {
        const firstName = Cypress.env('fistName')
        const lastName = Cypress.env('lastName')
        const email = Cypress.env('email')
        const pass = Cypress.env('pass')
        cy.contains('Create account').click()
        cy.fillInUserRegisterForm(firstName,lastName,email,pass)
        cy.get('[type="submit"]').click()
        cy.contains('This email address is already in use')
    });
})