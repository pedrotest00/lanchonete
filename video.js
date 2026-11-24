const video = document.querySelector('#featuredVideo');
const help = document.querySelector('#videoHelp');

if (video && help) {
  video.addEventListener('error', () => {
    help.hidden = false;
  });
  video.addEventListener('loadedmetadata', () => {
    help.hidden = true;
  });
}
