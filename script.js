// Function to write the command when the button is pressed
function writeText(pressedBtn) {
  const srcText = pressedBtn.innerText;
  const cmd = document.getElementById('usr_src');
  cmd.value = '';
  let i = 0;

  console.log(srcText);

  function typeCharacter() {
    if (i < srcText.length) {
      cmd.value += srcText.charAt(i);
      i++;
      setTimeout(typeCharacter, 125);
    }
    else {
      // Emulate the 'Enter' key press to trigger the search function
      const enterClick = new KeyboardEvent('keydown', {
        key: 'Enter'
      })

      cmdSearch(enterClick, cmd);
    }
  }

  typeCharacter();
}

// Function for searching the page to display
function cmdSearch(event, input) {
  if (event.key === 'Enter'){
    if (input.value === "About me"){
      const txtBrd = document.getElementById('divOut');
      copyTextToDiv("about.html");
    }
    else if (input.value === "Experience"){
      const txtBrd = document.getElementById('divOut');
      copyTextToDiv("experience.html");
    }
    else if (input.value === "Education"){
      const txtBrd = document.getElementById('divOut');
      copyTextToDiv("education.html");
    }
    else if (input.value === "Skills"){
      const txtBrd = document.getElementById('divOut');
      copyTextToDiv("skills.html");
    }
    else if (input.value === "Interests"){
      const txtBrd = document.getElementById('divOut');
      copyTextToDiv("interests.html");
    }
    else {
      alert('Unknown command, please input a valid command.');
    }

    input.value = '';
  }
}

// Function to load the page coresponding to the command inserted
function copyTextToDiv(pageName) {
  let outputDiv = document.getElementById('output_div');

  // Add the CSS class to apply the animation
  outputDiv.classList.add('anim-lineUp');

  fetch(pageName)
      .then(response => response.text())
      .then(text => {
        outputDiv.innerHTML = text;

        // Remove the CSS class after a delay
        setTimeout(() => {
          outputDiv.classList.remove('anim-lineUp');
        }, 2000);
      })
      .catch(error => {
        console.error('Error loading text:', error);
      });
}
