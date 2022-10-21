describe('Employee manager', () => {
  it('should allow a visitor to employee list, add employee, edit employee', () => {
    cy.visit('/employee/list');
    cy.getBySel('employee-list-page').should('be.visible');
    cy.getBySel('employee-edit-btn').click();
    cy.getBySel('employee-edit-page').should('be.visible');

    cy.getBySel('employee-list-btn').click();
    cy.getBySel('employee-list-page').should('be.visible');

    cy.getBySel('employee-add-btn').click();
    cy.getBySel('employee-add-page').should('be.visible');

    cy.getBySel('employee-list-btn').click();
    cy.getBySel('employee-list-page').should('be.visible');
  });

  it('should display firm delete employee modal', function () {
    cy.visit('/employee/list');

    cy.getBySel('employee-delete-btn').click();
    cy.getBySel('employee-confirm-delete-modal').should('be.visible');
  });

  it('should display employee table', function () {
    cy.visit('/employee/list');

    cy.getBySel('employee-toggle-data-ui').click();
    cy.getBySel('employee-data-list').should('be.visible');
    cy.getBySel('employee-toggle-data-ui').click();
    cy.getBySel('employee-data-grid').should('be.visible');
  });

  it('should display employee table', function () {
    cy.visit('/employee/list');

    cy.getBySel('employee-toggle-data-ui').click();
    cy.getBySel('employee-data-list').should('be.visible');
    cy.getBySel('employee-toggle-data-ui').click();
    cy.getBySel('employee-data-grid').should('be.visible');
  });

  it('should display add employee errors', function () {
    cy.visit('/employee/add');
    cy.getBySel('employee-add-page').should('be.visible');

    cy.getBySel('employee-form-first-name').focus().blur();
    cy.getBySel('employee-form-first-name-error')
      .should('be.visible')
      .and('contain', 'First name is a required field');
    cy.getBySel('employee-form-last-name').focus().blur();
    cy.getBySel('employee-form-last-name-error')
      .should('be.visible')
      .and('contain', 'Last name is a required field');
    cy.getBySel('employee-form-email').focus().blur();
    cy.getBySel('employee-form-email-error')
      .should('be.visible')
      .and('contain', 'Email is a required field');
    cy.getBySel('employee-form-number').focus().blur();
    cy.getBySel('employee-form-number-error')
      .should('be.visible')
      .and('contain', 'Phone must be a valid phone number for region LK');

    cy.getBySel('employee-form-first-name').type('tamda').blur();
    cy.getBySel('employee-form-first-name-error')
      .should('be.visible')
      .and('contain', 'First name must be at least 6 characters');
    cy.getBySel('employee-form-last-name').type('tamda').blur();
    cy.getBySel('employee-form-last-name-error')
      .should('be.visible')
      .and('contain', 'Last name must be at least 6 characters');
    cy.getBySel('employee-form-email').type('tamdao').blur();
    cy.getBySel('employee-form-email-error')
      .should('be.visible')
      .and('contain', 'Email must be a valid email');
    cy.getBySel('employee-form-number').type('tamdao').blur();
    cy.getBySel('employee-form-number-error')
      .should('be.visible')
      .and('contain', 'Phone must be a valid phone number for region LK');

    cy.getBySel('employee-form-first-name').type('tamdaotamdaotamdao').blur();
    cy.getBySel('employee-form-first-name-error')
      .should('be.visible')
      .and('contain', 'First name must be at most 10 characters');
    cy.getBySel('employee-form-last-name').type('tamdaotamdaotamdao').blur();
    cy.getBySel('employee-form-last-name-error')
      .should('be.visible')
      .and('contain', 'Last name must be at most 10 characters');

    cy.getBySel('employee-submit-btn').should('be.disabled');
  });

  it('should allow add employee', function () {
    cy.visit('/employee/add');

    cy.getBySel('employee-form-first-name').type('Patricia').blur();
    cy.getBySel('employee-form-last-name').type('Bethany').blur();
    cy.getBySel('employee-form-email').type('daotam4536@gmail.com').blur();
    cy.getBySel('employee-form-number').type('+94771277698').blur();

    cy.getBySel('employee-submit-btn').should('be.enabled');
  });
});
