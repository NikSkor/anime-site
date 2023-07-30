const modal = () => {
  const modal = document.querySelector('.search-model');
  const modalBtn = document.querySelector('.icon_search');
  const modalClose = modal.querySelector('.search-close-switch');
  const modalInput = modal.querySelector('#search-input');
  const wrapper = document.querySelector('.search-model-result');

  wrapper.style.width = '100%';
  wrapper.style.maxWidth = '500px';

  const debounce = (func, ms = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(()=> {func.apply(this, args)}, ms)
    }
  };

  const searchDebounce = debounce((searchStr)=> {
    searchFunc(searchStr);
  }, 700)


  const renderFunc = (items) => {
    wrapper.innerHTML = '';

    items.forEach(item => {
      wrapper.insertAdjacentHTML(
        'afterbegin',
        `
          <a class="p-2" href="/anime-details.html?itemId=${item.id}" target="_blank">${item.title}</a>
        `
      );
    });

  };

  const searchFunc = (searchStr) => {
      fetch(
        'https://anime-site-3cdbc-default-rtdb.asia-southeast1.firebasedatabase.app/anime.json'
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const filteredData = data.filter(dataItem => {
            return (
              dataItem.title.toLowerCase().includes(searchStr.toLowerCase()) ||
              dataItem.description
                .toLowerCase()
                .includes(searchStr.toLowerCase())
            );
          });
          const result = filteredData.slice(0, 5);
          renderFunc(result);
        });
  };

  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modalInput.addEventListener('input', (e) => {
    e.preventDefault();
    // searchFunc(e.target.value);
    searchDebounce(e.target.value);
  });
}

modal();

