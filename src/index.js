import './style.css';
import { showsContainer, searchForm, searchFormInput } from './dynamic.js';
import likes from './images/Empty_Like.svg';
import popUp from './popUp.js';
import getTVShows from './getTvShow.js';
import { getMovieData } from './comments.js';

const displayShows = async (search) => {
  showsContainer.innerHTML = '';
  searchFormInput.placeholder = 'Search for your favorite TV show or Genre';
  searchFormInput.classList.remove('error_input_show');
  const tvShows = await getTVShows(search);
  tvShows.forEach(async (show) => {
    const showCard = document.createElement('div');
    showCard.classList.add('show_container');

    const showImage = document.createElement('img');
    showImage.classList.add('show_image');
    if (show.image) {
      showImage.src = show.image.original;
    } else {
      showImage.src = '#';
    }
    showCard.appendChild(showImage);

    const titleLikeContainer = document.createElement('div');
    titleLikeContainer.classList.add('title_like_container');

    const showTitle = document.createElement('h2');
    showTitle.classList.add('card_title');
    showTitle.innerText = show.title;
    titleLikeContainer.appendChild(showTitle);

    const likesIcon = document.createElement('img');
    likesIcon.src = likes;
    likesIcon.alt = 'like_icon';
    likesIcon.classList.add('like_icon');
    titleLikeContainer.appendChild(likesIcon);
    showCard.appendChild(titleLikeContainer);

    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.innerText = 'Comments';
    commentButton.id = show.id;
    commentButton.classList.add('comment_button');
    commentButton.addEventListener('click', async () => {
      // Fetch the comments for the specific show
      show.comments = await getMovieData(show.id);

      // Call popUp function after setting the comments
      await popUp(show);

      const updatedShow = await getMovieData(show.id);
      show.comments = updatedShow;

      const commentList = document.getElementById('comments-list');
      commentList.innerHTML = '';

      if (show.comments.length > 0) {
        show.comments.forEach((comment) => {
          const itemList = document.createElement('li');
          itemList.innerHTML = `
        <div>
          <span>${comment.creation_date} </span>
          <span class="user-name">${comment.username}: </span>
          <span>${comment.comment}</span>
        </div>
      `;
          commentList.append(itemList);
        });
      }
    });
    showCard.appendChild(commentButton);
    showsContainer.appendChild(showCard);
  });
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const search = searchFormInput.value;
  searchForm.reset();
  displayShows(search);
});
