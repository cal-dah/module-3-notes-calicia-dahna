/* How to implement a promise-based API based on readings and code examples from: 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Implementing_a_promise-based_API 

Implementing an alarm() API
    Goal: to create an alarm() API that will:
    1.) give a message to the person to go to a specified activity and 
    2.) include the name of the activity in the message

    --Wrapping setTimeout()--
*/

        //Example Code

            /*
            const output = document.querySelector("#output");
            const button = document.querySelector("#click-to-set-alarm");
            

            function clickAlarm() {
                setTimeout(() => { //note: setTimeout() takes a callback function and adds a delay time, when the time has ended the function is completed
                    output.textContent = "Time to go to school!"; //note: the message that is to be displayed
                }, 300); note: //note: 300 is the milliseconds to the delay in when the alarm occurs, this can be changed to any amount of time desired

            }

            button.addEventListener("dblclick", clickAlarm)


    /*
    --The Promise Constructor--
            What is a promise constructor?
                -Key component is the executor, which is one function taken as an argument
                -The executor takes two functions, 1.) resolve: function is successful and 2.) reject: function contains an error and fails
                -Resolve and Reject take ONE parameter (can be any type of parameter though!)

    
        
        
        Example Code

            function myAlarm(person, delay) {
                return new Promise((resolve, reject) => {
                    if (delay < 0) {
                        throw new Error("Alarm delay time CAN NOT be negative value, re-check value!");
                    }
                    setTimeout(() => {
                        resolve('Time to go to school, ${person}!');
                        }, delay);
            });
        }
    
        --Using the alarm() API--
        --> AKA combining the previous steps into one!
    */

        //time to incorporate some const to make the alarm make sense
        const activity = document.querySelector("#activity-name");
        const delay = document.querySelector("#delay");
        const button = document.querySelector("#click-to-set-alarm");
        const output = document.querySelector("#output");

        function myAlarm(activity, delay) {
            return new Promise((resolve, reject) => {
                if (delay < 0) {
                    reject("Delay time CAN NOT be negative value, check input!");
                }
                setTimeout(() => {
                    resolve(`Time to go to, ${activity}!`);
                }, delay);
            })
        }

      /*  
        button.addEventListener("dblclick", () => {
            myAlarm(activity.value, delay.value)
                .then((message) => (output.textContent = message))
                .catch((error) => (output.textContent = `Alarm could not be set: ${error}`));
        })
    
      */


        //try implementing async and await for event listener instead

        button.addEventListener("dblclick", async () => {
            try {
                const message = await myAlarm(activity.value, delay.value);
                output.textContent = message;
            } catch (error) {
                output.textContent = `Alarm could NOT be set: ${error}`;
            }
        });

        //we have now completed the two goals of implementing our alarm() API
        
