const searchButton = '.-margin > .route-button > .el-button-ng'
const topMenu ='.-flex-direction-column > .nav-item__container'

export class registerPage {

    getRegisterForm() {
        cy.get('#site-header').within(() => {
            cy.contains('a','Create account',{matchCase:false}).click()
        })
        cy.wait(2000)
        cy.get('[role="dialog"]')
   
        cy.contains('privacy policy',{matchCase:false})
        cy.get('[type="submit"]').should('be.visible')  
        return this;
    }
}

export const register = new registerPage();