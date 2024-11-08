const baseHtml = document.querySelector('.fromGS-artist'); 
// Container to append the data (データの表示をするテンプレートはここ)
const spreadsheets = document.querySelector('.spreadsheets-artist'); 
const apiURL = 'https://script.google.com/macros/s/AKfycbxsQLxd_s78ozChdPpU9snPMG34DdzI6RVGo6sZpx8bN4-9B-5lLSGAAqsaOoiQwwQb/exec';

async function loadData() {
  
  // JSONファイルの展開
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    // データの取得
    data.forEach(entry => {
      const copy = baseHtml.cloneNode(true); // Clone the base template
      copy.classList.remove('js-base'); // Make the copy visible
      copy.style.display = 'block';

      // 振り分ける
      copy.querySelector('.GS-artist').textContent = entry.artist;
      copy.querySelector('.GS-profile').src = entry.profile;
      copy.querySelector('.GS-description').textContent = entry.description;
      copy.querySelector('.GS-description').style.display = 'inline';
      copy.querySelector('.GS-contact').textContent = entry.contact;
      copy.querySelector('.specialist').textContent = entry.specialist || '';
      copy.querySelector('.specialist').style.display = 'inline';
      copy.querySelector('.GS-review').textContent = entry.review || 'No reviews available';

      // workの時は
      if (entry.work1) {
        copy.querySelector('.GS-ex1').src = entry.work1;
        copy.querySelector('.GS-ex1').style.display = 'inline-block';
      } else {
        copy.querySelector('.GS-ex1').style.display = 'none';
      }
      if (entry.work2) {
        copy.querySelector('.GS-ex2').src = entry.work2;
        copy.querySelector('.GS-ex2').style.display = 'inline-block';
      } else {
        copy.querySelector('.GS-ex2').style.display = 'none';
      }
      if (entry.work3) {
        copy.querySelector('.GS-ex3').src = entry.work3;
        copy.querySelector('.GS-ex3').style.display = 'inline-block';
      } else {
        copy.querySelector('.GS-ex3').style.display = 'none';
      }

      // Append the populated copy to the container
      spreadsheets.appendChild(copy);
    });

  } catch (error) {
    console.error("Error loading data:", error);
    
    // Optional: Display an error message in the DOM
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Failed to load data. Please try again later.';
    spreadsheets.appendChild(errorMessage);
  }
}

// Run the loadData function on page load
loadData();