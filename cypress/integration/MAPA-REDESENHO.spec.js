/// <reference types="Cypress" />

describe("Cypress Exception Handling", () => {
    const baseUrl = 'http://172.18.3.250/'
    beforeEach(() => {
      
      cy.visit(baseUrl)
        
      });
    it('Verifica o titulo da página no Mapa Redesenho',function(){
        cy.title().should('be.equal','Mapas Culturais Base Project')
    })
     
    it('Verifica se s links de redirecionamento do componente Header estão funcionando estão funcionando',function(){
      //Link Home Page
      cy.get(':nth-child(1) > .mc-header-menu--item > .icon')
      .click()      
      cy.url()
      .should('be.equal',baseUrl+"#al")

      //Link Oportunidades
      cy.get(':nth-child(2) > .mc-header-menu--item')
      .click()      
      cy.url()
      .should('be.equal',baseUrl+"oportunidades/")
      

      //Link Agentes
      cy.get(':nth-child(3) > .mc-header-menu--item')
      .click()      
      cy.url()
      .should('be.equal',baseUrl+"agentes/#list")


      //Link Eventos
      cy.get(':nth-child(4) > .mc-header-menu--item')
      .click()      
      cy.url()
      .should('be.equal',baseUrl+"eventos/#list")

      //Link Espaços
      cy.get(':nth-child(5) > .mc-header-menu--item')
      .click()      
      cy.url()
      .should('be.equal',baseUrl+"espacos/#list")

      //Link Projetos
      cy.get(':nth-child(6) > .mc-header-menu--item')
      .click()      
      cy.url()
      .should('be.equal',baseUrl+"projetos/")

    })

    it.only('Validar consulta e pesquisa nas principais entidades',function(){
      cy.visit(baseUrl+"oportunidades/")
        .get('.search-filter__actions--form-input')
        .type('Fortaleza{enter}')
      cy.contains('h2','Fortaleza')

      cy.visit(baseUrl+"agentes/#list")
        .get('.search-filter__actions--form-input')
        .type('Maria{enter}')
      cy.contains('h2','Maria')

      //Necessário cadastrar eventos no banco do mapas
      // cy.visit(baseUrl+"eventos/#list")
      //   .get('.search-filter__actions--form-input')
      //   .type('Fortaleza{enter}')
      // cy.contains('h2','Fortaleza')

      cy.visit(baseUrl+"espacos/#list")
        .get('.search-filter__actions--form-input')
        .type('Iartt{enter}')
      cy.contains('h2','Iartt')

      cy.visit(baseUrl+"projetos/")
        .get('.search-filter__actions--form-input')
        .type('Capoeira{enter}')
      cy.contains('h2','Capoeira')

    })

    it('Login no mapa com credenciais erradas',function(){
      cy.get('.logIn')
        .click()
      cy.get('#email')
        .type('Admin')
      cy.get('#password')
        .type('mapas123')
      cy.get('button.col-12').click()
      cy.get('.error')
        .should('be.visible')
      })

    it('Valida a funcionalidade de criação de nova conta',function(){
      cy.get('.logIn')
        .click()
        .get('.create')
        .click()
        //Obs: Funcionalidade encontra-se sem nenhum retorno para a tela de cadastro
    })

    it('Validação de funcionalidade criação de novo agente',function(){
      cy.get('.logIn')
        .click()
      cy.get('#email')
        .type('usuario_valido')
      cy.get('#password')
        .type('senha_valida')
      cy.get('button.col-12').click()

      //Obs: Caso a aplicação esteja conectada com o banco é necessário utilizar um usuário já cadastrado no banco
      //     Caso não haja conexão com o banco, utilizar as seguintes credenciais username:Admin@local password:mapas123

      //Criando uma novo agente
      cy.get(':nth-child(1) > .panel--entities-summary__card--create > .button')
        .click()
      cy.get('option:contains(Coletivo)')
        .get('input')
        .type('Teste 02')
        .get('button:contains(Adicionar nova)')
        .click()
        .get('span:contains(Jogos Eletrônicos)')
        .click()
        .get('button:contains(Confirmar)')
        .click()
        .get('textarea').type('Teste Automatizado')
        .get('button:contains(Criar em Rascunho)')
        .click()
        .get('button:contains(Completar Depois)')
        .click()
        .get('.success')
        .should('be.visible')
    })

})
