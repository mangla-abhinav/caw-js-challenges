$(document).ready(() => {
  const listItems = $('li');

  // Adding Event Listener to each List Item
  for (let i = 0; i < listItems.length; i += 1) {
    $(listItems[i]).click((e) => {
      if (e.shiftKey) {
        e.preventDefault();
        // Iterating to select checkboxes till another checkbox is found
        for (let j = i + 1; j > 0; j -= 1) {
          if (!$(`#episode-${j}`).is(':checked')) {
            $(`#episode-${j}`).prop('checked', true);
          } else {
            break;
          }
        }
      }
    });
  }
});
