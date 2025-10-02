// Q. Write cypress code for by assuming ur heating the one request and validating its response.
// My Code:
describe("Api test",()=>{
    it("api", ()=>{
        cy.request("GET","URL").then(({request, response})=>{
            expect(response.body.statusCode).to.equal(200);           
        })
    })
})

// Q. How many types assertions have in cypress, Explain it by examples

// Q. Cypress disadvantages