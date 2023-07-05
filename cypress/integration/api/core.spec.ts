const apiUserName = Cypress.env("apiUserName")
const apiUserPass = Cypress.env("apiUserPass")

describe('Login Test', () => {

    beforeEach(() => {
        cy.login(apiUserName, apiUserPass);
    });

    it('Log in through the API', () => {
      cy.log('basic login via api works fine')
    });

    it('Check default response data after login', () => {
        cy.login(apiUserName, apiUserPass).then((response) => {
            expect(response.body.language).to.eq("EN"); // Expect default language to be English
            expect(response.body.emails[0].email).to.eq(apiUserName); // Expect user email to be as defined in the login
        });
    });
});

