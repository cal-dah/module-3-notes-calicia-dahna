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