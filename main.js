document.getElementById("generateButton").addEventListener("click", async () => {
    const ingredients = document.getElementById("ingredients").value;
    const outputElement = document.getElementById("output");
  
    if (!ingredients) {
      outputElement.textContent = "Please enter some ingredients.";
      return;
    }
  
    outputElement.textContent = "Generating recipe...";
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer [your_api_key_here]"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Give a recipe with ingredients: ${ingredients}. and also make sure that all of the ingredients are inside the recipe.`
            }
          ]
        })
      });
  
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        const recipeText = data.choices[0].message.content.trim();
  
        // Split the recipe text into lines and display each line
        const lines = recipeText.split("\n").filter(line => line.trim() !== "");
        outputElement.innerHTML = lines.map(line => `<p class="recipe-line">${line}</p>`).join("");
      } else {
        outputElement.textContent = "Sorry, I couldn't generate a recipe.";
      }
    } catch (error) {
      console.error(error);
      outputElement.textContent = "An error occurred while generating the recipe.";
    }
  });
  
