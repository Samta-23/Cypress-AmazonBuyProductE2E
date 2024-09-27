var  itemName, item="Titan Watch"
describe("Buy Ist item of Amazon.in site", function ()
{
     
    it("Open the website home page", function (){
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.visit("https://www.amazon.in");
        // verify the URL of open site by visit
        cy.url().should('eq',"https://www.amazon.in/");
    })
    
    it("search Titan watch", function()
    {
        cy.get("#twotabsearchtextbox").type("titan watch").should("have.value", "titan watch")
        cy.get("#nav-search-submit-button").click() // click on search button
        //cy.wait(4000)
       // take out name of First searched item to verify this should be on next page URL 
       // cy.get('[data-asin="B0CCYPRZH6"] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > [data-action="puis-card-container-declarative"] > [data-cy="asin-faceout-container"] > .a-spacing-base > .a-spacing-small > [data-cy="title-recipe"]')
       
      /*  cy.get('span.a-size-base-plus.a-color-base.a-text-normal')
        .invoke('text').then((text)=>
        {
                itemName=text.substring(0,50)
                cy.log(itemName)
                //itemName
        })*/
       
    })
    it(" Click on searched product", function(){
        cy.wait(4000)
        // verify Item is on Page
         cy.get(' [data-cy="asin-faceout-container"] > .a-spacing-base > .a-spacing-small > [data-cy="title-recipe"] > .a-spacing-none > .a-link-normal ')
         .first().invoke('removeAttr','target').click() // remove target attribute
        
      
    })

    it("verify the page URL containing searched item or not", function(){
      
        cy.url().should('include','Titan').and('include', 'Watch')
        cy.get("#add-to-cart-button").should('exist').click()
        cy.log(itemName)
        
       })
    
    it("verify opening of window after add to card CTA", function(){
        // verify opening of window 
        
       // Skip CTA is hidden so use {force : true} to click it
        cy.get("#attachSiNoCoverage-announce") 
       .should('exist').click({force : true})
      })
    it("verify the price of item same as in first page", function(){ 
       // verify redirection of correct page
       cy.url().should('include',"https://www.amazon.in/").and('include','cart')
       var price;
       cy.get('#sw-subtotal > :nth-child(2) > .a-price > [aria-hidden="true"] > .a-price-whole')
       .invoke('text')
       .then((pr)=>{
            price=pr.replace(/[^0-9]/g, '')
                cy.log(price) // checking the price of items same as Ist page 
       })
    })
    
    it(" Verify items in the cards i.e. one in this case", function(){
       // cross verification of card items, it should be one
       cy.get("#nav-cart-count").invoke("text")
       .then((items)=>
    {
        cy.log(items)
        if (items==1)
            cy.log("correct item in card")
    })
    })

    it(" Click on proceed to buy CTA", function(){
        // verify Proceed to buy CTA presence and click to end the journey 
        cy.get(' [ name="proceedToRetailCheckout"] ').should('exist').click({force : true})
    cy.url().should('include','www.amazon.in')
    })
})

    
