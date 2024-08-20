let executingWriteText = false; // Flag for writeText()

// Command writing by button press
function writeText(pressedBtn) {
  if (executingWriteText) return; // Ignore if already running
  executingWriteText = true;

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
        executingWriteText = false;
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

let executingToggleNav; // Flag for toggleNav()

function toggleNav(navClass) {
    if (executingToggleNav) return; // Ignore new calls if already running
    executingToggleNav = true;

    const allNavs = document.querySelectorAll('.secondnav');
    const targetNav = document.querySelector(`.${navClass}`);
    let activeNav = null;

    // Find currently active nav
    allNavs.forEach(nav => {
        if (nav.style.height === '3rem') {
            activeNav = nav;
        }
    });

    if (activeNav && activeNav !== targetNav) {
        activeNav.style.height = '0';
        activeNav.addEventListener('transitionend', function transitionListener() {
            targetNav.style.height = '3rem';
            activeNav.removeEventListener('transitionend', transitionListener);
            targetNav.addEventListener('transitionend', function finalTransitionListener() {
                executingToggleNav = false;
                targetNav.removeEventListener('transitionend', finalTransitionListener);
            });
        });
    } else {
        if (targetNav.style.height === '3rem') {
            targetNav.style.height = '0';
            targetNav.addEventListener('transitionend', function finalTransitionListener() {
                executingToggleNav = false;
                targetNav.removeEventListener('transitionend', finalTransitionListener);
            });
        } else {
            targetNav.style.height = '3rem';
            targetNav.addEventListener('transitionend', function finalTransitionListener() {
                executingToggleNav = false;
                targetNav.removeEventListener('transitionend', finalTransitionListener);
            });
        }
    }
}
