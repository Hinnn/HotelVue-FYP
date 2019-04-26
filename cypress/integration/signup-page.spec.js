// let db = mongoose.connection;
describe('Book page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click Book navbar link
    cy.get('.navbar-nav:nth-child(2)')
      .find('.nav-item:nth-child(1)').click()
  })

  it('allows a customer to sign up', () => {
    // Fill out web form cy.get(':nth-child(1) > .form__input')
    cy.get('.col-md-6').find(':nth-child(1) > .form__input').type(2100999)
    cy.get('[data-test=name]').type('angle')
    cy.get('[data-test=email]').type('772012459@qq.com')
    cy.get('div[data-test="password"] > [data-test=password]').type(123456)
    cy.get('.error').should('not.exist')
    cy.get('.btn').click()
    // cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('SignUp Successfully!').should('exist')
    cy.url().should('include', '/room')
  })

  it('shows error messages for incomplete form fields', () => {
    cy.get('.btn').click()
    cy.contains('Something wrong.').should('exist')
  })
})
