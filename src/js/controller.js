import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime/runtime'; // polyfilling async/await

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clauses
    recipeView.renderSpinner();
    // 1) Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering Recipe
    recipeView.render(recipe);
  } catch (err) {
    alert(err);
  }
};
controlRecipes();
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
