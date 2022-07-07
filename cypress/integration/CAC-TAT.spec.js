/// <reference types="Cypress" />

var faker = require('faker-br');


describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.visit('../../src/index.html')
    })

    let name = faker.name.firstName()
    let lastname = faker.name.lastName()
    let email = faker.internet.email()
    let phonenumber = faker.phone.phoneNumber().replace('-','').replace('(','').replace(')','').replace('+','').replace('55','').replace(' ','4')

    it('verifica o título da aplicação', function() {
     
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
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
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { 
      cy.get('#email')
        .clear() 
        // Clear text input
        .should('be.visible')
        .type('name.teste.com')
        .should('not.have','name.teste.com')  
     
      cy.get('.error')  
        .should('contain','Valide os campos obrigatórios!')
      
    })  
    it('número de telefone digitado com valor não-numérico', function() { 
      // make an assertion on the value
      cy.get('#phone')
        .should('be.visible')
        .type('abc')
        .should('have.value', '') 
        
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {     
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

      cy.get('#phone-checkbox')
        .check()
      //cy.get('.button')
      //  .click()
      cy.contains('Enviar')
        .click()
      cy.get('.error')
        .should('be.visible')
        .should('contain', 'Valide os campos obrigatórios!')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {     
      cy.get('#firstName')
        .should('be.visible')
        .type(name)
        .should('have.value',name)
        .clear()
        .should('have.value',"")

      cy.get('#lastName')
        .should('be.visible')
        .type(lastname)
        .should('have.value',lastname)
        .clear()
        .should('have.value',"")

      cy.get('#email')
        .should('be.visible')
        .type(email)
        .should('have.value',email)
        .clear()
        .should('have.value',"")
     
      
      cy.get('#phone')
        .should('be.visible')
        .type(phonenumber)
        .should('have.value',phonenumber)
        .clear()
        .should('have.value',"")
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      // cy.get('.button')
      //   .contains('Enviar')
      //   .click()
      cy.contains('Enviar').click()
      cy.get('.error') 
        .should('be.visible') 
        .should('contain','Valide os campos obrigatórios!')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
    })
    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .should('be.visible')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function (){
      cy.get('#product')
        .should('be.visible')
        .select('Mentoria')
        .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function (){
      cy.get('#product')
        .should('be.visible')
        .select('Blog')
        .should('have.value', 'blog')
    }) 
    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('#support-type')
        .should('be.visible')
      cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)
          .each(function($radio) {
            cy.log($radio)
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
      })    
    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })    
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
    })
  })
