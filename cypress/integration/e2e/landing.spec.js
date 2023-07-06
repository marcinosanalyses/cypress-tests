/// <reference types="cypress" />

import { home } from '../../support/pages/home'
import { register } from '../../support/pages/register'
// const home = new home

describe("Landing page tests", () => {
    beforeEach(() => {
      cy.visit('/')

    })
    context("Basic checks", () => {

      it("Check if Cookies Policy link exists", () => {
        home.checkCookiesPolicyLink()
      });
      it("Accept Cookies Policy", () => {
        home.acceptCookiesPolicy()
      });
      it("Check if Create account button is visible in top menu and links to register form", () => {
        cy.get('#site-header').within(() => {
          cy.contains('a','Create account',{matchCase:false}).click()
      })
        register.checkRegisterForm()
      });
      it("Check if Create account button is visible in home content", () => {
        cy.get('#dnd_area-module-2').contains('Create account',{matchCase:false}).click()
        register.checkRegisterForm()
      });
      it("Update location to Global and language to English on top language menu", () => {
        const language = 'English'
        home.clickToapplySiteLanguage(language)
      });
      it("Find assignment redirects to job add list", () => {
        cy.intercept('GET','/api/public/job-requests/**').as('getRequestList');
        cy.contains('Find assignment',{matchCase:false}).click()
        cy.get('@getRequestList')
      });
    });
});
