const selectBreed = document.querySelector("#selectBreed");
const selectColor = document.querySelector("#selectColor");
const selectFontFamily = document.querySelector("#selectFontFamily");
const card = document.querySelector(".card");
const dogImage = document.querySelector(".dogImage");
const dogTxt = document.querySelector("#dogTxt");
const dogName = document.querySelector(".dogName");
const dogCardSaved = document.querySelector(".dogCardSaved");
const saveBtn = document.getElementById("btn");

const app = {
  getBreeds: () => {
    axios.get("https://dog.ceo/api/breeds/list/all").then(function(response) {
      const allBreeds = response.data.message;

      for (var singleBreed in allBreeds) {
        let option = document.createElement("option");
        option.text = singleBreed;
        option.value = singleBreed;
        selectBreed.appendChild(option);
      }
    });
  },

  getDogImage: (breedImage, dogNameSaved) => {
    if (breedImage) {
      dogImage.src = breedImage;
      dogName.innerText = dogNameSaved;
      return;
    }

    let breedSelected = selectBreed.value;

    app.getDogName();

    axios
      .get(`https://dog.ceo/api/breed/${breedSelected}/images/random`)
      .then(function(response) {
        card.classList.add("selected");
        dogImage.src = response.data.message;
      });
  },

  getFontColor: textColor => {
    if (textColor) {
      dogName.style.color = textColor;
    }

    let fontColor = selectColor.value;
    dogName.style.color = fontColor;
  },

  getFontFamily: fontType => {
    if (fontType) {
      dogName.style.fontFamily = fontType;
      return;
    }
    let fontSelected = selectFontFamily.value;
    dogName.style.fontFamily = fontSelected;
  },

  getDogName: () => {
    if (dogTxt.value) {
      dogName.innerText = dogTxt.value;
    } else {
      dogName.innerText = localStorage.getItem("dogNameSaved");
    }
  },

  saveCard: () => {
    localStorage.setItem("dogNameSaved", dogTxt.value);
    localStorage.setItem("dogImgSaved", dogImage.src);
    localStorage.setItem("breedSaved", selectBreed.value);
    localStorage.setItem("colorSaved", selectColor.value);
    localStorage.setItem("fontSaved", selectFontFamily.value);
    app.getDogName();

    dogCardSaved.style.opacity = 1;
  }
};

app.getBreeds();

saveBtn.addEventListener("click", app.saveCard);

window.addEventListener("load", function() {
  const dogNameSaved = localStorage.getItem("dogNameSaved");
  const dogImgSaved = localStorage.getItem("dogImgSaved");
  const breedSaved = localStorage.getItem("breedSaved");
  const colorSaved = localStorage.getItem("colorSaved");
  const fontSaved = localStorage.getItem("fontSaved");

  app.getDogImage(dogImgSaved, dogNameSaved);
  app.getBreeds(breedSaved);
  app.getFontColor(colorSaved);
  app.getFontFamily(fontSaved);
  if (dogImgSaved) {
    card.classList.add("selected");
  }
});
