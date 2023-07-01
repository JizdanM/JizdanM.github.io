function inputFocus(input) {
    if (input.placeholder === 'Search') {
      input.placeholder = '';
    }
  }
  
  function inputBlur(input) {
    if (input.placeholder === '') {
      input.placeholder = 'Search';
    }
  }
