const detailsData = () => {
  const preloader = document.querySelector('.preloder');

  const renderGanreList = (ganres) => {
    const dropdownBlock = document.querySelector('.header__menu .dropdown');
    dropdownBlock.innerHTML = '';

    ganres.forEach((ganre) => {
      dropdownBlock.insertAdjacentHTML(
        'beforeend',
        `
          <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
        `
      );
    });
  };

  const renderAnimeDetails = (array, itemId) => {
    const animeObj = array.find(item => item.id == itemId);
    const imageBlock = document.querySelector('.anime__details__pic');
    const viewsBlock = imageBlock.querySelector('.view');
    const titleBlock = document.querySelector('.anime__details__title h3');
    const subTitleBlock = document.querySelector('.anime__details__title span');
    const descriptionBlock = document.querySelector('.anime__details__text p');
    const widgetList = document.querySelectorAll('.anime__details__widget ul li');
    const breadcrumbsLinks = document.querySelector('.breadcrumb__links span');


    widgetList.forEach(item => {
      item.innerHTML = '';
    });

    breadcrumbsLinks.textContent = animeObj.ganre;


    if (animeObj) {
      imageBlock.dataset.setbg = animeObj.image;
      viewsBlock.innerHTML = '';
      viewsBlock.insertAdjacentHTML(
        'beforeend',
        `
          <i class="fa fa-eye"></i> ${animeObj.views}
        `
      );

      titleBlock.textContent = animeObj.title;
      subTitleBlock.textContent = animeObj['original-title'];
      descriptionBlock.textContent = animeObj.description;

      widgetList[0].insertAdjacentHTML(
        'beforeend',
        `
          <span>Date aired:</span> ${animeObj.date}
        `
      );
      widgetList[1].insertAdjacentHTML(
        'beforeend',
        `
          <span>Rating:</span> ${animeObj.rating}
        `
      );
      widgetList[2].insertAdjacentHTML(
        'beforeend',
        `
          <span>Genre:</span> ${animeObj.tags.join(', ')}
        `
      );

      document.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
      });
    } else {
      console.log('Аниме отсутствует.');
    }
  };

  fetch(
    'https://anime-site-3cdbc-default-rtdb.asia-southeast1.firebasedatabase.app/anime.json'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const ganres = new Set();
      const idParams = new URLSearchParams(window.location.search).get(
        'itemId'
      );

      data.forEach((item) => {
        ganres.add(item.ganre);
      });

      if (idParams) {
        renderAnimeDetails(data, idParams);
        setTimeout(() => {
          preloader.classList.remove('active');
        }, 500);
      } else {
        console.log('Аниме отсутствует');
      }
      renderGanreList(ganres);
    });
};

detailsData();