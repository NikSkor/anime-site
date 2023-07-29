const mainData = () => {
  fetch(
    'https://anime-site-3cdbc-default-rtdb.asia-southeast1.firebasedatabase.app/anime.json'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('data: ', data);
    });
};

mainData();