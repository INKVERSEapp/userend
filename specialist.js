const baseHtml = document.querySelector('.fromGS-specialist');
// Container to append the data (データの表示をするテンプレートはここ)
const spreadsheets = document.querySelector('.spreadsheets-specialist');
const apiURL = 'https://script.google.com/macros/s/AKfycbxsQLxd_s78ozChdPpU9snPMG34DdzI6RVGo6sZpx8bN4-9B-5lLSGAAqsaOoiQwwQb/exec';
const choice = document.getElementById('parts');
const lscreen = document.getElementById('loading');

choice.addEventListener("change", searchData, true);
choice.addEventListener("change", load, true);


function displayData(data) {
  // Clear previous results
  spreadsheets.innerHTML = '';

  data.forEach(entry => {
    const copy = baseHtml.cloneNode(true);
    copy.style.display = 'block';

    // Fill in the template with data
    copy.querySelector('.GS-artist').textContent = entry.artist;
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

    // Append the populated template to the container
    spreadsheets.appendChild(copy);
  });
}

// Search function
async function searchData() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);

    const selectedValue = choice.value;
    const filteredData = data.filter(entry => {
      return entry.specialist.toLowerCase().includes(selectedValue);
    });
    // Display only the filtered data
    displayData(filteredData);

  } catch (error) {
    console.error("Error on searchData:", error);
  }
}

async function load(){
  const selectedValue = choice.value;
  if (selectedValue !== "NA") {
    lscreen.style.display = "block";
    //reset animation
    lscreen.classList.remove('loaded');

    setTimeout(function() {
      lscreen.classList.add('loaded');
    }, 3000); 
  } else {
    lscreen.style.display = "none";
  }

}