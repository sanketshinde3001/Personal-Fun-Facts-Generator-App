let facts = [
    "I love hiking and have visited over 10 national parks so far.",
    "I enjoy reading and aim to finish at least 30 books every year.",
    "Baking is one of my favorite hobbies – I recently made a 3-tiered cake for a friend's birthday.",
    "I speak three languages fluently and I'm learning a fourth.",
    "I’m teaching myself how to play the guitar and can play a few songs now.",
    "I started a travel blog to document my hiking adventures and share tips with others.",
    "I’m working on writing a short story based on one of my travel experiences.",
    "I try to dedicate time each weekend to experimenting with new recipes in the kitchen.",
    "I'm part of a local book club where we read and discuss new genres every month.",
    "I love nature photography and my goal is to photograph the sunrise in every national park I visit.",
  ];
  
function generateFact() {
  const factDisplay = document.getElementById("factDisplay");
  const randomIndex = Math.floor(Math.random() * facts.length);
  factDisplay.innerHTML = `
          <div class="fact-card">
              <p>${facts[randomIndex]}</p>
          </div>
      `;
}

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  // Ensure popup is hidden initially
  popup.style.display = "none";
  overlay.style.display = "none";

  // Smooth slide-in popup
  function showPopup() {
    popup.style.display = "block";
    overlay.style.display = "block";
    popup.classList.add("slide-in");
    setTimeout(() => {
      closePopup();
    }, 2500); // 2.5 seconds
  }

  function closePopup() {
    popup.classList.remove("slide-in");
    popup.style.display = "none";
    overlay.style.display = "none";
  }

  function addFact() {
    const newFactInput = document.getElementById("newFact");
    const newFact = newFactInput.value.trim();

    if (newFact) {
      facts.push(newFact);
      newFactInput.value = "";
      showPopup();
    } else {
      alert("Please enter a fact!");
    }
  }

  function shareOnTwitter() {
    const factText = document
      .getElementById("factDisplay")
      .textContent.trim(); // Trim spaces
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      factText
    )}`;
    window.open(twitterUrl, "_blank");
  }

  // Attach to global scope if needed
  window.addFact = addFact;
  window.shareOnTwitter = shareOnTwitter;
});

function downloadScreenshot() {
  // Configure html2canvas with proper settings
  html2canvas(document.querySelector(".fact-display"), {
    backgroundColor: "#1A1A1A", // matches --card-dark
    scale: 2, // Higher resolution
    logging: false,
    useCORS: true,
    allowTaint: true,
    windowWidth: document.querySelector(".fact-display").scrollWidth,
    windowHeight: document.querySelector(".fact-display").scrollHeight,
    onclone: function (clonedDoc) {
      // Ensure styles are properly applied to the cloned element
      const clonedElement = clonedDoc.querySelector(".fact-display");
      clonedElement.style.transform = "none"; // Remove rotation for screenshot
      clonedElement.style.margin = "0";
      clonedElement.style.borderColor = "#4ECDC4"; // matches --secondary-color
      clonedElement.style.backgroundColor = "#1A1A1A"; // matches --card-dark
      clonedElement.style.color = "#FFFFFF"; // matches --text-light

      // If there's a fact-card inside
      const factCard = clonedElement.querySelector(".fact-card");
      if (factCard) {
        factCard.style.transform = "none";
        factCard.style.border = "4px solid #FFFFFF";
        factCard.style.backgroundColor = "#1A1A1A";
      }
    },
  }).then((canvas) => {
    // Create a white background canvas
    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");

    // Set dimensions
    finalCanvas.width = canvas.width + 40; // Add padding
    finalCanvas.height = canvas.height + 40;

    // Fill background
    ctx.fillStyle = "#0A0A0A"; // matches --bg-dark
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw the original canvas in the center
    ctx.drawImage(canvas, 20, 20);

    // Convert to image and download
    const link = document.createElement("a");
    link.download = "fun-fact.png";
    link.href = finalCanvas.toDataURL("image/png");
    link.click();
  });
}