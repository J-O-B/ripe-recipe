import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
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


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        # Check if username already exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get('username').lower()})

        if existing_user:
            flash("Username Already Exists")
            return redirect(url_for("signup"))

        register = {
            "username": request.form.get("username").lower(),
            "email": request.form.get("email").lower(),
            "fav_food": request.form.get("fav_food").lower(),
            "prof_pic": request.form.get("prof_pic").lower(),
            "bio": request.form.get("bio").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(register)

        # Put the new user into "session" cookie
        session['user'] = request.form.get("username").lower()
        flash("Congratulations, You Are Now Part Of The Ripe Family!")
    return render_template("signup.html")


@app.route("/recipes")
def recipes():
    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes)

# need <recipe_name> here


@app.route("/search")
def search():
    return render_template("search.html")


@app.route("/categories")
def categories():
    categories = mongo.db.categories.find()
    return render_template("categories.html", categories=categories)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
