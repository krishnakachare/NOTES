/// <reference types="cypress" />
// import Papa from "papaparse"; // Import PapaParse for CSV parsing

function generateRandomTestData() {
    const faker = require("faker"); // Ensure faker is installed (npm install faker)
    const moment = require('moment-timezone'); // Install it using: npm install moment-timezone
    // Define USA time zones
    const usaTimeZones = [
        'America/New_York',  // Eastern Time (ET)
        'America/Chicago',   // Central Time (CT)
        'America/Denver',    // Mountain Time (MT)
        'America/Los_Angeles' // Pacific Time (PT)
    ];
    // Pick a random USA time zone
    const randomTimeZone = faker.helpers.randomize(usaTimeZones);
    // Generate current time in the selected USA time zone
    const currentTimeUSA = moment().tz(randomTimeZone).format('hh:mm A z'); // e.g., 02:45 PM EST
    const dob = faker.date.past(30, new Date());
    const formattedDOB = `${String(dob.getMonth() + 1).padStart(2, '0')}/${String(dob.getDate()).padStart(2, '0')}/${dob.getFullYear()}`;
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: formattedDOB,
        sex: faker.helpers.randomize(["Male", "Female"]),
        mobileNumber: faker.phone.phoneNumber("+91##########"), // Indian number format
        email: `Yogi${faker.datatype.number(10000)}@${faker.internet.domainWord()}.com`,
        company: faker.helpers.randomize(["TCS", "Infosys"]),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        timeZone: currentTimeUSA,
    };
};
const patientInfo = generateRandomTestData();

function populatePatientForm(patient) {
    // patient New chart
    // cy.get('').eq(1).click({force:true});
    // cy.contains(patient.Prefix).click({ force: true });

    // Fill out first name and last name
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(1)
        .type(["First Name"]);
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(3)
        .type(patient["Last Name"]);

    // Fill out date of birth
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(6)
        .type(patient["Date of Birth"]);

    // Select sex
    cy.get('[data-testid="demographics-dialog-sex-select"]').realClick({
        force: true,
    });
    cy.get('[class="MenuItem2__base"]').contains(patient.Sex).click({ force: true });

    // Mobile number
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(7)
        .type(patient["Mobile Number"]);

    //Email
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(8)
        .type(patient["Email"]);

    //Address
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(9)
        .type(patient["Address"]);

    //City
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(11)
        .type(patient["City"]);

    //State
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(12)
        .type(patient["State"]);

    //Zip
    cy.get('[class="TextInput2Base__inputContainer"]')
        .eq(13)
        .type(patient["Zip"]);

    //Time Zone
    cy.get('[class="Select2__value Select2__compact"]')
        .eq(5)
        .click()
        .type(patient["TimeZone"] + "{enter}");
}

describe("Elation Patient Management", () => {
    before(() => {
        // Log in to the application before tests
        cy.visit("https://sandbox.elationemr.com/patients/");
        // cy.get('#idp-discovery-username').type("HealthCompiler+partner@elationhealth.com");
        // cy.get('#idp-discovery-submit').click()
        // cy.get('#okta-signin-password').type("bdu_vme2bmg0TZP!jxb");
        // cy.get('#okta-signin-submit').click()
    });

    context("Add Patients Using CSV Data", () => {
        it("Parses CSV data and adds patients to the system", () => {
            cy.get('[data-testid="practice-home-toolbar-new-chart-button"]').click({ force: true });
            // cy.get('button[aria-label="Add Patient"]').click({force:true});
            // Fill out the Add Patient form
            populatePatientForm(patientInfo);
            cy.window().then((win) => {
                cy.stub(win, "open").as("windowOpenStub");
            });
            // Submit the form and validate success
            cy.get('[class="Button2__base Button2__primary Button2__md"]').click({ force: true });
            cy.get("@windowOpenStub").should("have.been.called").then((stub) => {
                const calledWith = stub.getCall(0).args[0]; // First argument of first call
                cy.visit("https://sandbox.elationemr.com" + calledWith); // Use it for navigation
            });
            //Add Tag
            cy.get("[data-testid='patient-tags-plus-button']").click({ force: true });
            cy.get('[data-testid="patient-tags-mindreader"]').type(patientInfo["Company"]);
            cy.contains("li", patientInfo["Company"]).click({ force: true });
            cy.get('[data-testid="tags-update-button"]').click({ force: true });
            //Add Note
            cy.get('[id="choose_visit_note_trigger"]').click({ force: true });
            cy.get('[class="visit_note_trigger"]').eq(0).click({ force: true });
            cy.get('[class="visit-note-section fieldNoteSection"]').eq(0).type("Yogi Test");
            cy.get('[class="el8TextareaWrap el8FieldShortLabelPadding"]').type("Yogi Test");
            cy.get('[class="el8button el8PrimaryButton ebs-btn ebs-btn-primary"]').click({ force: true });
            cy.wait(8000);
            //for RX
            cy.get('[id="choose_meds_orders_trigger"]').click({ force: true })
            cy.get('[class="meds_order_trigger"]').click({ force: true })
            cy.get('[data-testid="prescription-form-medication-input"]').type('mg')
            //cy.get('[class="TextInput2Base__label"]').eq(0).type('mg')
            cy.contains("li").click({ force: true });
        });
    });
});