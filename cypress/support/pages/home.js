const searchButton = '.-margin > .route-button > .el-button-ng'
const topMenu ='.-flex-direction-column > .nav-item__container'

export class homePage {

    getSearchButton() {
        return cy.get(searchButton);
    }
    getTopMenu() {
        return cy.get(topMenu);
    }
    acceptCookiesPolicy() {
        cy.get('#hs-eu-cookie-confirmation-inner').should('be.visible').and('not.be.empty')
        cy.get('#hs-eu-policy-wording').should('not.be.empty')
        cy.get('#hs-eu-confirmation-button').should('be.visible').click()
        cy.get('#hs-eu-cookie-confirmation-inner').should('not.be.visible')

    }
    checkCookiesPolicyLink() {
        cy.get('#hs-eu-cookie-confirmation-inner').should('be.visible').and('not.be.empty')
        cy.get('p a').should('have.attr','href').and('not.be.empty').and("include", "/")
        cy.get('p a').invoke('attr','href').then(href => {
            cy.log(href)
        })

    }
    clickToapplySiteLanguage() {
        cy.get('#language').should('be.visible').within(() => {
        cy.get('.dropdown-toggle').should('have.length.above',1)
        cy.contains('Apply',{matchCase:false}).click()
        return this;
        })
    }
}

export const home = new homePage();