const searchon = document.querySelector('#opensearch');
const searchoff = document.querySelector('#closesearch');
const searchinput = document.querySelector('.search_input');
const searchInputField = document.getElementById('searchInput');

if (searchinput) searchinput.style.display = "none";

if (searchon && searchinput) {
  searchon.addEventListener('click', () => {
    searchinput.style.display = 'flex';
    if (searchInputField) searchInputField.focus();
  });
}

if (searchoff && searchinput) {
  searchoff.addEventListener('click', () => {
    searchinput.style.display = 'none';
    if (searchInputField) searchInputField.value = '';
    filterRecipeCards("");
  });
}

if (searchInputField) {
  searchInputField.addEventListener("input", () => {
    const searchTerm = searchInputField.value.toLowerCase();
    filterRecipeCards(searchTerm);
  });

  searchInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const query = searchInputField.value.trim().toLowerCase();
      searchTermRedirect(query);
    }
  });
}

function filterRecipeCards(searchTerm) {
  const recipeSections = document.querySelectorAll(".category");

  recipeSections.forEach(section => {
    const title = section.querySelector("h2")?.textContent.toLowerCase() || "";
    const btnText = section.querySelector("a.btn")?.textContent.toLowerCase() || "";

    if (title.includes(searchTerm) || btnText.includes(searchTerm)) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

function searchTermRedirect(query) {
  const recipeLinks = {
    adobo: "adobo.html",
    sinigang: "sinigang.html",
    afritada: "afritada.html",
    tinola: "tinola.html",
    menudo: "menudo.html",
    tapsilog: "tapsilog.html",
    longsilog: "longsilog.html",
    champorado: "champorado.html",
    lugaw: "lugaw.html",
    palabok: "palabok.html",
    relleno: "rellenongbangus.html",
    lechon: "lechonpaksiw.html",
    pakbet: "pakbet.html",
    laing: "laing.html",
    torta: "tortangtalong.html",
    halohalo: "halohalo.html",
    leche: "lecheflan.html",
    ube: "ubehalaya.html",
    macapuno: "macapuno.html",
    eggpie: "eggpie.html",
    // add more mappings here as needed
  };

  if (recipeLinks[query]) {
    window.location.href = recipeLinks[query];
    return;
  }

  for (const key in recipeLinks) {
    if (key.includes(query)) {
      window.location.href = recipeLinks[key];
      return;
    }
  }

  alert("Recipe not found.");
}

const body = document.getElementById('body');
const checkbox = document.getElementById('checkbox');

if (checkbox && body) {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    checkbox.checked = true;
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
}

const modal = document.getElementById("addRecipeModal");
const openModalBtn = document.querySelector(".btn[href='/']");
const closeModalBtn = document.getElementById("closeAddRecipeBtn");
const recipeForm = document.getElementById("recipeForm");
const categoriesContainer = document.querySelector(".categories");

if (openModalBtn && modal) {
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });
}

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

if (modal) {
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  savedRecipes.forEach(recipe => {
    addRecipeToDOM(recipe.title, recipe.category, recipe.image, recipe.link);
  });
});

if (recipeForm) {
  recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("recipeTitle").value.trim();
    const category = document.getElementById("recipeCategory").value.trim();
    const image = document.getElementById("recipeImage").value.trim();
    const link = document.getElementById("recipeLink").value.trim();

    if (title && category && image && link) {
      const recipe = { title, category, image, link };
      addRecipeToDOM(title, category, image, link);
      saveRecipeToLocal(recipe);
      modal.style.display = "none";
      recipeForm.reset();
    } else {
      alert("Please fill out all fields.");
    }
  });
}

function saveRecipeToLocal(recipe) {
  const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  savedRecipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(savedRecipes));
}

function addRecipeToDOM(title, category, image, link) {
  if (!categoriesContainer) return;

  const section = document.createElement("section");
  section.classList.add("category");

  section.innerHTML = `
    <h2>${category}</h2>
    <img src="${image}" alt="${title}">
    <a href="${link}" class="btn">Click here</a>
    <button class="delete-btn" title="Delete this recipe">Delete</button>
  `;

  const deleteBtn = section.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    section.remove();
    removeRecipeFromLocal(title);
  });

  categoriesContainer.appendChild(section);
}

function removeRecipeFromLocal(titleToRemove) {
  let savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  savedRecipes = savedRecipes.filter(recipe => recipe.title !== titleToRemove);
  localStorage.setItem('recipes', JSON.stringify(savedRecipes));
}

const navtoggle = document.querySelector('#checkbox_2');
const navlist = document.querySelector('.nav_list');

if (navtoggle && navlist) {
  navtoggle.addEventListener('change', () => {
    navlist.style.right = navtoggle.checked ? '15px' : '-400px';
  });
}

function filterRecipes(region) {
  const allCards = document.querySelectorAll('.recipe-card');
  allCards.forEach(card => {
    if (card.classList.contains(region)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_xbxo1sg", "template_aeaj8zh", this).then(
      function () {
        formMessage.textContent = "Your message has been sent successfully!";
        formMessage.style.color = "green";
        contactForm.reset();
      },
      function (error) {
        formMessage.textContent = "Oops! Something went wrong. Please try again.";
        formMessage.style.color = "red";
        console.error("EmailJS Error:", error);
      }
    );
  });
}
