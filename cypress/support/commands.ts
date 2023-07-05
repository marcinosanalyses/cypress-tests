import '@bahmutov/cy-api'


Cypress.Commands.add('fillInUserRegisterForm', (firstName, lastName, email, pass) => {
    cy.get('[name="firstName"]').type(firstName).should('have.value',firstName)
    cy.get('[name="lastName"]').type(lastName).should('have.value',lastName)
    cy.get('[type="email"]').type(email).should('have.value',email)
    cy.get('[type="password"]').first().type(pass)
    cy.get('[type="password"]').eq(1).type(pass)
    cy.get('[type="checkbox"]').parent().click()
  })
  
  Cypress.Commands.add('filterByLocation', (locationName) => {
    cy.intercept('GET', `api/public/locations/autocomplete?query=${locationName}*`).as('getLocationResults');
    cy.contains('Location',{matchCase:false}).type(locationName, { delay: 100 })
    cy.wait('@getLocationResults')
    cy.get('#react-select-3-option-0').contains(locationName).should('be.visible').first().click().wait(1000)
    cy.contains(locationName)
    cy.contains('Search').click()
    cy.contains('Clear')
  })


  Cypress.Commands.add('login', (username, password) => {
    cy.log(username)
    cy.log(password)
    cy.api({
        method: 'POST',
        url: 'https://app.verama.com/api/auth/login',
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Session': 'c93ca76d-3bbf-4995-9fa3-325186de8dfb',
            'X-Frontend-Version': 'd569843e',
        },
        body: {
            username: username,
            password: password
        },
        form: true // this indicates the request body should be form data
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
    
});




  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  