// JavaScript for functionality 

$(document).ready(()=>{
        // Get DOM elements
        const questionInput = $('#questionInput');
        const submitBtn = $('#submitBtn');
        const responseArea = $('#responseArea');
        const responseContent = $('#responseContent');
        const copyBtn = $('#copyBtn');
        const thinkLonger = $('#thinkLonger');
        const goOnline = $('#goOnline');
        const includeSources = $('#includeSources');
        
        // Get all option cards
        const optionCards = $('.option-card');
        // Add click event to option cards
            optionCards.on('click', function() {
                // Get the action type from the card's heading
                const action = this.querySelector('h3').textContent.toLowerCase();
                // Update the placeholder based on the action
                if (action === 'search') {
                    // console.log(questionInput[0].placeholder)
                    questionInput[0].placeholder = 'What would you like to search for?';
                } else if (action === 'generate image') {
                    questionInput[0].placeholder = 'Describe the image you want to generate';
                } else if (action === 'summarize') {
                    questionInput[0].placeholder = 'Paste the text you want to summarize';
                } else if (action === 'translate') {
                    questionInput[0].placeholder = 'Enter text to translate and specify language';
                }
                
                // Focus on the input field
                questionInput.focus();
            });
        
        // Submit button click handler
        submitBtn.on('click', async function() {
            const questions = questionInput[0].value.trim();
            if (questions) {
              // Show loading state
              submitBtn[0].innerHTML =
                '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
              submitBtn[0].disabled = true;

              // Simulate API call with timeout

              fetch("/ask", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: questions }),
              })
                .then((response) => response.json())
                .then((data) => {
                  // Typing effect for displaying the response
                  const htmlText = data;
                  const temp = document.createElement("div");
                  temp.innerHTML = htmlText;
                  console.log(htmlText)
                  const plainText = temp.textContent; 

                  responseContent[0].innerHTML = ""; // Clear previous content

                  let index = 0;
                  const typingInterval = setInterval(() => {
                    if (index < plainText.length) {
                      responseContent[0].textContent += plainText.charAt(index); // Add one character at a time
                      index++;
                    } else {
                      clearInterval(typingInterval); // Stop the interval when typing is complete
                    }
                  }, 1);
                  // Reset button state
                  submitBtn[0].innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>Ask';
                  submitBtn[0].disabled = false;
                  responseArea[0].classList.remove("hidden");
                })
                .catch((err) => {
                  console.error("Error sending data to server:", err);
                });

              // Add Stop Button functionality
              const stopBtn = document.getElementById("stopBtn"); 
              stopBtn.addEventListener("click", () => {
                clearInterval(typingInterval); // Stop the typing effect
                submitBtn[0].innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>Ask';
                submitBtn[0].disabled = false; // Reset the submit button state
              });
            } else {
                // Show error if input is empty
                questionInput[0].placeholder = 'Please enter a question first!';
                questionInput[0].classList.add('animate-pulse');
                setTimeout(() => {
                    questionInput[0].classList.remove('animate-pulse');
                    questionInput[0].placeholder = 'What would you like to know?';
                }, 2000);
            }
        });
        
        // Copy button click handler
        copyBtn.on('click', function() {
            // Get the text to copy
            const textToCopy = responseContent[0].innerText;
            
            // Use the Clipboard API to copy text
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Change icon temporarily to indicate success
                const originalHTML = copyBtn[0].innerHTML;
                copyBtn[0].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
                
                // Revert after 2 seconds
                setTimeout(() => {
                    copyBtn[0].innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
        
        // Allow submission by pressing Enter key
        questionInput.on('keypress', function(e) {
            if (e.key === 'Enter') {
                submitBtn[0].click();
            }
        });
    });

    