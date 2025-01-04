from openai import OpenAI

client = OpenAI(
  api_key="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"
)

ingredients = input("Ingredients: ")

user_message = "Give a short simple recipe with ingredients: " + ingredients + ". and also make sure that all of the ingridients are inside the recipe."

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  store=True,
  messages=[
    {"role": "user", "content": user_message}
  ]
)

print(completion.choices[0].message.content);
