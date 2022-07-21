const searchButton = '.-margin > .route-button > .el-button-ng'
const topMenu ='.-flex-direction-column > .nav-item__container'

export class registerPage {

    checkRegisterForm() {


        cy.get('input').should('have.length.at.least',5)   
        cy.contains('privacy policy',{matchCase:false})
        cy.get('[type="submit"]').should('be.visible') 
        return this;
    }
}

export const register = new registerPage();