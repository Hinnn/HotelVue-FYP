describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get(':nth-child(2) > .fa > .v-btn__content').click()
  })
  after(() => {
    cy.wait(6000)
  })

  describe('error messages', () => {
    it('Please input all fields', () => {
      cy.get('form > .v-btn').click()
      cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .clear().type('1095933649@qq.com')
      cy.get('.typo__p').contains('Please input email and password correctly.')
    })
    it('Email and password are required', () => {
      cy.get('form > .v-btn').click()
      cy.get(':nth-child(1) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Email is required')
      // cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
      //   .type('111@.com')
      // cy.get(':nth-child(1) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
      //   .contains('Please input valid email')
      cy.get(':nth-child(2) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Password is required.')
    })
    it('Email format constraint', () => {
      cy.get('form > .v-btn').click()
      cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('111@.com')
      cy.get(':nth-child(1) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Please input valid email')
    })
    it('Minimum password length constraints', () => {
      // cy.get('form > .v-btn').click()
      cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('1095933649@qq.com')
      cy.get(':nth-child(2) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('1')
      // cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('1')
      cy.get(':nth-child(2) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Password must be at least 8 characters')
    })
    it('Maximum password length constraints', () => {
      // cy.get('form > .v-btn').click()
      cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('1095933649@qq.com')
      cy.get(':nth-child(2) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('111111111111111aa')
      // cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('1')
      cy.get(':nth-child(2) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Password must be less than 15 characters')
    })
  })
  describe('Login successfully', () => {
    afterEach(() => {
      cy.get(':nth-child(3) > .fa > .v-btn__content').click()
      // cy.get('.v-toolbar__content > :nth-child(6) > .v-btn__content').click()
      // cy.get(':nth-child(3) > .fa > .v-btn__content')
      cy.get(':nth-child(3) > .v-btn__content').click()
      cy.get('.swal2-confirm').click()
      // cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > :nth-child(3) > .v-btn__content')
      //   .click()
      cy.wait(2000)
    })
    it('Login as Customer', () => {
      cy.get('#loginCard > .v-card__title').contains('LOGIN')
      cy.get('#loginCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('1095933649@qq.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('Wang123...')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(1)').click()
        })
        cy.get('form > .v-btn').click()
      })
      cy.url().should('include', '/AccountInfo')
      cy.wait(2000)
    })
    it('Login as Administrator', () => {
      cy.get('#loginCard > .v-card__title').contains('LOGIN')
      cy.get('#loginCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('111@qq.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('Wang123...')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(2)').click()
        })
        cy.get('form > .v-btn').click()
        cy.wait(2000)
      })
      // cy.get('.v-menu > .v-btn > .v-btn__content > .v-icon').click()
      // cy.get('.menuable__content__active > .v-list > [role="listitem"] > .v-list__tile').click()
      cy.url().should('include', '/AdminInfo')
      cy.wait(2000)
    })
  })
  describe('Fail to Login', () => {
    it('Wrong Email Address', () => {
      cy.get('#loginCard > .v-card__title').contains('LOGIN')
      cy.get('#loginCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('1099@qq.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('Wang123...')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(1)').click()
        })
        cy.get('form > .v-btn').click()
        cy.get('.typo__p').contains('Please sign up first!')
      })
    })
    it('Wrong Password', () => {
      cy.get('#loginCard > .v-card__title').contains('LOGIN')
      cy.get('#loginCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('1095933649@qq.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('Yue123...')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(1)').click()
        })
        cy.get('form > .v-btn').click()
        cy.get('.typo__p').contains('Wrong password!')
      })
    })
  })
})
