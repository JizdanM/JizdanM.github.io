// Function to write the command when the button is pressed
function writeText(input) {
  const btnText = input.innerText;
  const cmd = document.getElementById('usr_src');
  cmd.value = '';
  let i = 0;

  function typeCharacter() {
    if (i < btnText.length) {
      cmd.value += btnText.charAt(i);
      i++;
      setTimeout(typeCharacter, 125);
    }else {
      // Fake the 'Enter' key press to trigger the search function
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
    if (input.value === "Text type"){
      const txtBrd = document.getElementById('infoSpan');
      copyTextToDiv();
    }
    else {
      alert('Unknown command, please input a valid command.');
    }

    input.value = '';
  }
}

function copyTextToDiv() {
  let outputDiv = document.getElementById('infoSpan');

  fetch('content.txt')
      .then(response => response.text())
      .then(text => {
        outputDiv.innerHTML = text;
      })
      .catch(error => {
        console.error('Error loading text:', error);
      });
}
