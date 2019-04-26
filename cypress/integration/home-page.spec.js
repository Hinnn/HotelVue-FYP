describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // it('Shows a header', () => {
  //   cy.get('.vue-title').should('contain', 'Homer for Customers !!');
  //   cy.get('b > i').should('contain', 'Time for a reservation !!')
  //   cy.get('tr > :nth-child(1) > :nth-child(2)')
  //   cy.get('tr > :nth-child(1) > :nth-child(2) > a').should('have.attr', 'href', '#/room')
  //   cy.get('tr > :nth-child(1) > :nth-child(3)').should('contain', 'the Room page and find room')
  //   // cy.get('tr > :nth-child(1) > :nth-child(3)').should('contain', 'the Room page and find your room')
  //   cy.get('.hero > :nth-child(4)').should('contain', 'This is the homepage of hotelBooking Web app')
  // });

  describe('Navigation bar', () => {
    it('Shows the required links', () => {
      cy.get('.navbar-brand').contains('YourHotel')
      // cy.get(':nth-child(1) > :nth-child(1) > .fa > .v-btn__content').contains('Home')
      // cy.get('.navbar-nav:nth-child(1)').should('contain', 'Home')
      // cy.get(':nav-item:first').should('contain', 'Home')
      // })
      cy.get('#nav_collapse').contains('Home')
      // within(() => {
      // cy.get(':nth-child(1) > :nth-child(1) > .fa > .v-btn__content')
      // cy.get(':nth-child(1) > :nth-child(1) > .fa > .v-btn__content').should('contain', 'Home')
      // cy.get('.navbar-nav:nth-child(2)').within(() => {
      // cy.get('.ml-auto > :nth-child(1) > .fa > .v-btn__content').should('contain', 'SignUp')
      // cy.get('.nav-item:first').should('contain', 'Home')
      //   cy.get('.nav-item:nth-child(2)').should('contain', 'LOGIN')
      //   cy.get('.nav-item:nth-child(3)').should('contain', 'LOGOUT')
      // })
    })
  })
})
// })
//   it('Redirects when links are clicked', () => {
//     // cy.get('[data-test=bookbtn]').click();
//     // cy.get('.navbar').contains('Book').click();
//     // cy.url().should('include', '/book')
//     cy.get('.navbar').contains('Room').click()
//     cy.url().should('include', '/room')
//     cy.get('.navbar').contains('Manage').click()
//     cy.url().should('include', '/bookings')
//     cy.get(':nth-child(4) > .nav-link > .fa').click()
//     cy.url().should('include', '/book')
//   });
// })
//   })
// })
