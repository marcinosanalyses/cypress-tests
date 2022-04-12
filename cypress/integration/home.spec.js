/// <reference types="cypress" />

import { home } from '../support/pages/home'
import { register } from '../support/pages/register'
// const home = new home

describe("Homepage tests", () => {
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
        register.getRegisterForm()
      });
      it.skip("Check if Create account button is visible in home content", () => {
        //TO DO
      });
      it("Update location to Global and languahe to English on top language menu", () => {
        const language = 'English'
        home.clickToapplySiteLanguage(language)
      });
    });
});
