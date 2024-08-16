let isExecuting = false; // Flag for writeText()

// Command writing by button press
function writeText(pressedBtn) {
  if (isExecuting) return; // If already executing, ignore other calls
  isExecuting = true;

  const srcText = pressedBtn.innerText;
  const cmd = document.getElementById('usr_src');
  cmd.value = '';
  let i = 0;

  console.log(srcText);

  function typeCharacter() {
    if (i < srcText.length) {
      cmd.value += srcText.charAt(i);
      i++;
      setTimeout(typeCharacter, 85);
    }
    else {
      setTimeout(() => {
        // Emulate the 'Enter' key press
        const enterClick = new KeyboardEvent('keydown', {
          key: 'Enter'
        })

        cmdSearch(enterClick, cmd);
        isExecuting = false;
      }, 125);
    }
  }

  typeCharacter();
}

// Search page by command
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

// Load page by command
function copyTextToDiv(pageName) {
  let outputDiv = document.getElementById('output_div');

  // Apply css animation
  outputDiv.classList.add('anim-lineUp');

  fetch(pageName)
      .then(response => response.text())
      .then(text => {
        outputDiv.innerHTML = text;

        setTimeout(() => {
          outputDiv.classList.remove('anim-lineUp');
        }, 2000);
      })
      .catch(error => {
        console.error('Error loading text:', error);
      });
}
