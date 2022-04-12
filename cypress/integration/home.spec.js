/// <reference types="cypress" />

import { home } from '../support/pages/home'
// const home = new home

describe("Homepage tests", () => {
    beforeEach(() => {
      cy.visit('/')

    })
    context("Basic checks", () => {

      it("Check if Cookies Policy link exists", function () { 
        home.checkCookiesPolicyLink()
      });
      it("Accept Cookies Policy", function () { 
        home.acceptCookiesPolicy()
      });
      it("Check if Create account button is visible in top menu and links to register form", function () { 
        cy.get('#site-header').within(() => {
          cy.contains('a','Create account',{matchCase:false}).click()
        })
     
      });
      it.skip("Check if Create account button is visible in home content", function () { 
        //TO DO
      });
    });
});
