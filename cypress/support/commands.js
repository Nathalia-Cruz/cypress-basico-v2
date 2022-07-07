// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

var faker = require('faker-br');

let name = faker.name.firstName()
let lastname = faker.name.lastName()
let email = faker.internet.email()
let phonenumber = faker.phone.phoneNumber().replace('-','').replace('(','').replace(')','').replace('+','').replace('55','').replace(' ','4')

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName')
      .should('be.visible')
      .type(name)
      .should('have.value',name)

    cy.get('#lastName')
      .should('be.visible')
      .type(lastname)
      .should('have.value',lastname)

    cy.get('#email')
      .should('be.visible')
      .type(email)
      .should('have.value',email)

    const longText = 'Olá meu nome é Nathália, tenho 25 anos e estou aprendendo cypress para automatizar testes.' 
    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText,{delay:0})
      .should('have.value',longText)

    //cy.get('.button')
    //  .contains('Enviar')
    //  .click()
    cy.contains('Enviar')
      .click()

    cy.get('.success')  
      .should('contain','Mensagem enviada com sucesso.')
})