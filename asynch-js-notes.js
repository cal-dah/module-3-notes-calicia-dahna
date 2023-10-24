/*Introduction to JavaScript Notes based off readings from: 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing


Asynchronous vs Synchronous JavaScript
    1.) Synchronous:
        -also referred to as a separate function, since the computer will complete running the code line by line, 
        running each line of code separately before executing the next.
    2.) Asynchronous:
        -code can be running before previous code has completed its execution

    Why use asynchronous over synchronous? 

        - "long-running functions" can result in the program becoming unresponsive, which obviously should be avoided
        since we want our programs to run smoothly!
        
        -Best to use Asynchronous to replace using "long-running synchronous functions"




Event Handlers
A type of asynchronous javascript that we've already covered!*/

//Practice Code using Eventlistener for a button
    const btn = document.getElementById("buttonFile");

    function myFunction() {
        alert ("Click once to download!");

    }

    btn.addEventListener("dblclick", myFunction);
    console.log(btn.addEventListener("dblclick", myFunction));

/*Callbacks
    - A function passed into another function, an event handler is one example of a callback
    - Can be implemented as synchronous or asynchronous
        1.) Synchronous: usually use .map() or .forEach()
        2.) Asynchronous: usually use promise() or setTimeout()
    -Be careful with nesting if using for asynchronous JavaScript*/

//Practice Code example modified from: https://www.geeksforgeeks.org/javascript-callbacks/
    
    //Array defined

    //Create first/primary function and use timeout to make it asynchronous
    function firstFunction(callback) {
        console.log("Operation is starting its run...");
            //syntax for setTimeout = setTimeout(function, milliseconds)
            setTimeout(function() {
                callback("Operation is now finished!");
            }, 5000);
    }

    //define callback/secondary function used in myFunction
    function secondaryFunction(result) {
        console.log("Result shown here: " + result);
    }

    //call the first function with the secondary function
  firstFunction(secondaryFunction);

    /*Note: avoid nesting callbacks or you can end up with many errors! 
    also commonly referred to as the "pyramid of doom"!!*/
   
    //------------------------------------------------------------------------------------------------------------

    /*How to Use Promises based on readings and code from: 
    https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

    Promises
    */

    /*Using fetch() API
        What does it mean to use fetch() API?
            To send an http request and receive a response back from the desired remote server
            Note: using fetch() API is the updated version of using XMLHttpRequest
        
        Code example:*/
        const myFetchPromise = fetch(
            //"insert API here",
        );

        console.log(myFetchPromise);

        myFetchPromise.then((response) => {
            console.log(`Response has been received: ${response.status}`);
        });

        console.log("Request has started...");
        

    /*Chaining Promises
        Best way to chain promises is using then()
            step 1.) use then() to return the promise
            step 2.) use then() once more to return the value/result
            step 3.) check the status code to see if server accepted and handled request (best done before returning value)
        
        Example code used from before with further additions using steps 1-3:*/            
            //Step 1
            myFetchPromise.then((response) => {
            //Step 3
            if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json(); /*json is an example, needs to match api type used*/
            })

            //Step 2
            .then((data) => {
                console.log(data[0].name);
            });


        //Note: still important to avoid "pyramid of doom"/"callback hell" when coding promise chains!

    /*Catching Errors
        - many reasons why an error may occur, so use method: catch()
        -catch() is used at the end of a promise chain, and will check for errors in functions throughout the chain 


        - take previous example and notice that we needed to check for an error in the middle of the code (step 3), 
        we want to avoid this as more nested code could become too complicated to use the previous method shown above

        
        
        Example code:*/

        
        //Step 1
        myFetchPromise.then((response) => {
        //Step 3
        if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json(); /*json is an example, needs to match api type used*/
        })

        //Step 2
        .then((data) => {
            console.log(data[0].name);
        })

        .catch((error) => {
            console.error(`Could not retrieve: ${error}`);
        });
        


    //Promise Terminology
        /*Three types of states of promises (occurs in the following order):
            1.) pending: promise created and function request is still being performed
                    - aka, during the "call to fetch()" process
            2.) fulfilled: async function successful/ promise accepted
                    -then() handler is called
            3.) rejected: async function not successful/ promise reject
                    -catch() handler is called
            */

    /*Combining Multiple Promises
        - Promise.any(), have a set of promises and it doesn't matter which one is fulfilled  
        - Promise.all(), have a set/array of promises and all need to be fulfilled, one promise is returned */
       
       
       //Promise.all() code example, insert different API to see result
            const fetchMyPromise1 = fetch(
                //insert API here ,
            );
            const fetchMyPromise2 = fetch(
                //insert another API here ,
            );
            const fetchMyPromise3 = fetch(
                //insert another API here,
            );

            Promise.all([fetchMyPromise1, fetchMyPromise2, fetchMyPromise3]) //insert as array format
                .then((_responses) => {
                    for (const response of response) { //to fetch
                        console.log(`${response.url}: ${response.status}`);
                    }
                }) 
                .catch((error) => {
                    console.error(`Failed to fetch: ${error}`);
                });
       
       
       
        //Promise.any() code example 
        //same type of format as previous code, but use Promise.any() instead of Promise.all()

        Promise.any([fetchMyPromise1, fetchMyPromise2, fetchMyPromise3]) //insert as array format
        .then((_responses) => {
            for (const response of response) { //to fetch
                console.log(`${response.url}: ${response.status}`);
            }
        }) 
        .catch((error) => {
            console.error(`Failed to fetch: ${error}`);
        });

    

    /*async and await 
        - use "async" in front of a function to make it asynchronous, WOW so intuitive
        - use "await" inside an async function, but before a promise function to WAIT until 
        it has been completed or rejected, at that point specifically in your code*/
            
            // Example just using "async": 
            async function thisFunction() {
                // now we have achieved making the function asynchronous
            }

            //Example above but incorporating "await"
            async function newFunction() {
                try {
                    const response = await fetch (
                        //insert API here,
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                } catch (error) {
                    console.error(`Could not fetch: ${error}`);
                }
            }
        /*
        - better to use "async" for promise chains
        - better to use "await" to have asynchronous functions be completed consecutively, 
            --> if not needed to be consecutive use Promise.all()
        */

//--------------------------------------------------------------------------------------------------