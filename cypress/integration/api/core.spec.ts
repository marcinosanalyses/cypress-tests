/// <reference types="..//../../cypress.d.ts" />
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
    it('Should retrieve job requests successfully', () => {
        cy.api({
          method: 'GET',
          url: 'https://app.verama.com/api/public/job-requests?',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Referer': 'https://app.verama.com/en/job-requests'
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.not.be.null;
          const responseBody = response.body as { content: { systemId: string }[] };
          expect(responseBody.content).to.be.an('array').and.to.have.lengthOf.above(1);
        });
      });
});

