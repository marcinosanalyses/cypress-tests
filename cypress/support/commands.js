
Cypress.Commands.overwrite('contains', (originalFn, subject, filter, text, options = {}) => {
  // determine if a filter argument was passed
  if (typeof text === 'object') {
      options = text
      text = filter
      filter = undefined
  }

  options.matchCase = false

  return originalFn(subject, filter, text, options)
})

Cypress.Commands.add('fillInUserRegisterForm', (firstName,lastName,email,pass) => {

  cy.get('[name="firstName"]').type(firstName).should('have.value',firstName)
  cy.get('[name="lastName"]').type(lastName).should('have.value',lastName)
  cy.get('[type="email"]').type(email).should('have.value',email)
  cy.get('[type="password"]').first().type(pass)
  cy.get('[type="password"]').eq(1).type(pass)
  cy.get('[type="checkbox"]').parent().click()
})



