describe("test suite name", () => {

    it("verify 'Marketing Team" tab visible under the solution", ()=>{
    
    cy.visit(url);
    cy.get(solution selector).trigger('mouseover');
    cy.get().each((tab) => {
        cy.wrap(tab).find(heading text).then((text) => {

            if (text == "Marketing Team") {
                expect(text).to.equals("Marketing Team");
            }

        })
    })

});
    
});


let arr = [ 
    {
    "email" : "anil.b@.yahoo.com",
    "role" : "admin"
    },
    {
    "email" : "sanjay.k@yahoo.com",
    "role" : "member"
    },
    {
    "email":"sachin.t@yahoo.com",
    "role" : "guest"
    }
    ,
    {
    "email":"shubham.s@yahoo.com",
    "role" : "guest"
    }
    ]
    
    let fArr = arr.filter((obj)=>{
        return obj.email !== "sachin.t@yahoo.com"
    });
    
    console.log(fArr);

    // Tell me Other what other methods can use here --> Map(), find()
    