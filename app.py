import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
@app.route("/home")
def home():
    home = True
    return render_template("home.html", home=home)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Check for valid user in database
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # Check for valid password for that user
            if check_password_hash(
              existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))
                return redirect(url_for('my_profile'))
            else:
                # If password is wrong
                flash("Username and/or Password Incorrect")
                return redirect(url_for("login"))
        else:
            # username doesn't exist
            flash("Username and/or Password Incorrect")
            return redirect(url_for("login"))
    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        # Check if username already exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get('username')})

        if existing_user:
            flash("Username Already Exists")
            return redirect(url_for("signup"))

        register = {
            "username": request.form.get("username").lower(),
            "email": request.form.get("email"),
            "fav_food": request.form.get("fav_food").lower(),
            "prof_pic": request.form.get("prof_pic"),
            "bio": request.form.get("bio").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "fav_recipes": "",
            "chef_rating": "3",
            "num_of_ratings": "1",
            "purchased_items": "",
        }
        mongo.db.users.insert_one(register)

        # Put the new user into "session" cookie
        session['user'] = request.form.get("username")
        flash("Congratulations, You Are Now Part Of The Ripe Family!")
    return render_template("signup.html")


@app.route("/newrecipe", methods=["GET", "POST"])
def newrecipe():
    if request.method == "POST":

        newrecipe = {
            "category_name": request.form.get("category"),
            "recipe_name": request.form.get("recipe_name").lower(),
            "serves": request.form.get("serves"),
            "prep_time": request.form.get("prep_time"),
            "cooking_time": request.form.get("cook_time"),
            "difficulty": request.form.get("difficulty"),
            "pic_url": request.form.get("recipe_pic"),
            "description": request.form.get("description").lower(),
            "ingredients": request.form.get("ingredients").lower(),
            "instructions": request.form.get("instructions").lower(),
            "rating": "3",
            "rating_count": "1",
            "created_by": session['user'].lower(),
            "tags": request.form.get("tags").lower(),
            "kcal": request.form.get("kcal"),
            "fat": request.form.get("fat"),
            "saturates": request.form.get("saturates"),
            "carbs": request.form.get("carbs"),
            "sugars": request.form.get("sugar"),
            "fibre": request.form.get("fibre"),
            "protein": request.form.get("protein"),
            "salt": request.form.get("salt"),
        }

        mongo.db.recipes.insert_one(newrecipe)

        # Need to update users my_recipes here

        flash("Thanks For Your Recipe, It's Been Added To The Database")
        return redirect(url_for('recipes'))
    return render_template("add_recipe.html")


@app.route("/recipes")
def recipes():
    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes)

# need <recipe_name> here


@app.route("/search")
def search():
    return render_template("search.html")


@app.route("/main", methods=["GET", "POST"])
def main():
    main = mongo.db.recipes.find({"category_name": "main"})
    name = ""
    if request.method == "POST":
        name = request.form.get("name")
        recipe = mongo.db.recipes.find(
            {"recipe_name": request.form.get("name")})

        return render_template("selected.html", recipe=recipe, name=name)

    return render_template("main.html", main=main)


@app.route("/main/<name>")
def mains(name):
    return render_template("selected.html")


@app.route("/myprofile")
def my_profile():

    user = mongo.db.users.find_one(
            {"username": session["user"]})

    myrecipes = mongo.db.recipes.find(
            {"created_by": session["user"]})

    return render_template("profile.html", user=user, myrecipes=myrecipes)


@app.route("/store")
def store():
    return render_template("store.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/cart")
def cart():
    return render_template("cart.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
