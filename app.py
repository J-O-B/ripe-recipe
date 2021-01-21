import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import numpy as np
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


def messenger():
    try:
        user = session["user"]
        messages = mongo.db.messages.find(
                {"message_for": user})
        if request.method == "POST":

            today = date.today()
            now = today.strftime("%b-%d-%Y")

            newMessage = {
                    "message_from": session["user"],
                    "message_for": request.form.get("sendTo").lower(),
                    "message_text": request.form.get("messageReply"),
                    "date": now,
                }

            mongo.db.messages.insert(newMessage)
        return messages

    except:
        messages = 0
        return messages


@app.route("/")
@app.route("/home", methods=["GET", "POST"])
def home():
    home = True
    msg = messenger()
    messenger()

    return render_template("home.html", home=home, msg=msg)


@app.route("/admin", methods=["GET", "POST"])
def admin():
    """
    First check for session cookie, if true, user is logged in,
    Store session cookie to a var and search the users database.
    Match a record with the current user, and check for admin privilages.
    """
    msg = messenger()
    messenger()

    count = mongo.db.tickets.count()

    Queries = mongo.db.tickets.find()

    """
    Update Ticket
    """
    if request.method == "POST":
        if request.form.get("ticket_opened") == "0":
            closedBy = "Admin"
        else:
            closedBy = ""

        updated = {
                "query_type": request.form.get("query-type"),
                "details": request.form.get("details"),
                "submit_by": request.form.get("submit_by"),
                "user_id": request.form.get("user_id"),
                "ticket_opened": request.form.get("ticket_opened"),
                "reply": request.form.get("reply"),
                "open_ticket": request.form.get("open_ticket"),
                "closed_by": closedBy
        }
        mongo.db.tickets.update_one(
            {"_id": ObjectId(request.form.get("query_id"))}, updated)
        flash("Ticket Updated")
        return redirect(url_for("admin"))

    return render_template("admin_panel.html",
                           msg=msg, Queries=Queries, count=count)


@app.route("/error/<reason>", methods=["GET", "POST"])
def error(reason):
    reason = int(reason)
    msg = messenger()
    if reason == 0:
        message = ("There seems to be a problem with your credentials" + "\n"
                   + "Please contact an admin for support")
    else:
        message = "Oh Snap! Something seems to have gone wrong!"

    return render_template("error.html", message=message, msg=msg)


@app.route("/login", methods=["GET", "POST"])
def login():
    msg = messenger()
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
                return redirect(url_for('my_profile', msg=msg))
            else:
                # If password is wrong
                flash("Username and/or Password Incorrect")
                return redirect(url_for("login", msg=msg))
        else:
            # username doesn't exist
            flash("Username and/or Password Incorrect")
            return redirect(url_for("login", msg=msg))
    return render_template("login.html", msg=msg)


@app.route("/logout", methods=["GET", "POST"])
def logout():
    msg = messenger()
    # remove user from session cookie
    flash("You have been signed out. We hope To See You Again Soon!")
    session.pop("user")
    return redirect(url_for("login", msg=msg))


@app.route("/signup", methods=["GET", "POST"])
def signup():
    msg = messenger()
    if request.method == "POST":
        # Check if username already exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get('username')})

        if existing_user:
            flash("Username Already Exists")
            return redirect(url_for("signup", msg=msg))

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
    return render_template("signup.html", msg=msg, ad=ad)


@app.route("/edit/<id>", methods=["GET", "POST"])
def editrecipe(id):
    msg = messenger()
    id = id
    recipe = mongo.db.recipes.find(
            {"_id": ObjectId(id)})

    if request.method == "POST":

        submit = {
            "category_name": request.form.get("category"),
            "recipe_name": request.form.get("recipe_name"),
            "serves": request.form.get("serves"),
            "prep_time": request.form.get("prep_time"),
            "cooking_time": request.form.get("cook_time"),
            "difficulty": request.form.get("difficulty"),
            "pic_url": request.form.get("recipe_pic"),
            "description": request.form.get("description"),
            "ingredients": request.form.get("ingredients"),
            "instructions": request.form.get("instructions"),
            "rating": request.form.get("rating"),
            "rating_count": request.form.get("rating_count"),
            "created_by": session['user'],
            "tags": request.form.get("tags"),
            "kcal": request.form.get("kcal"),
            "fat": request.form.get("fat"),
            "saturates": request.form.get("saturates"),
            "carbs": request.form.get("carbs"),
            "sugars": request.form.get("sugar"),
            "fibre": request.form.get("fibre"),
            "protein": request.form.get("protein"),
            "salt": request.form.get("salt"),
            }
        if request.form.get("submit") == "1":
            mongo.db.recipes.update({"_id": ObjectId(id)}, submit)

            flash("Your Recipe Has Been Updated!")

            return render_template("selected.html",
                                   recipe=recipe, id=id, msg=msg)

    return render_template(
            "edit_recipe.html", recipe=recipe, msg=msg)


@app.route("/newrecipe", methods=["GET", "POST"])
def newrecipe():
    msg = messenger()
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
        return redirect(url_for('recipes', msg=msg))
    return render_template("add_recipe.html", msg=msg)


@app.route("/recipes", methods=["GET", "POST"])
def recipes():
    msg = messenger()
    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes, msg=msg)


@app.route("/search", methods=["GET", "POST"])
def search():
    msg = messenger()
    return render_template("search.html", msg=msg)


@app.route("/starter", methods=["GET", "POST"])
def starter():
    msg = messenger()
    howMany = mongo.db.recipes.find({
        "category_name": "starter"
    }).count()
    starter = mongo.db.recipes.find({"category_name": "starter"})

    if request.form.get('submit') == "1":
        id = request.form.get("id")
        return redirect(url_for("selected", id=id))

    return render_template("starter.html",
                           starter=starter, howMany=howMany, msg=msg)


@app.route("/recipe/<id>", methods=["GET", "POST"])
def selected(id):
    """
    The selected page is a general page which can run all recipe types,
    on page logic will change
    """
    recipe = mongo.db.recipes.find(
            {"_id": ObjectId(id)})

    messages = mongo.db.comments.find(
            {"message_for": id})
    if (request.method == "POST"):

        if request.form.get("leaveComment") == "1":
            today = date.today()
            now = today.strftime("%b-%d-%Y")

            newMessage = {
                    "message_from": session["user"],
                    "message_for": id,
                    "message_text": request.form.get("recipe-comment"),
                    "rating": request.form.get("rating-comment"),
                    "date": now,
                }

            mongo.db.comments.insert(newMessage)

    return render_template("selected.html",
                           id=id, recipe=recipe, messages=messages)


@app.route("/user/<user>", methods=["GET", "POST"])
def user(user):
    msg = messenger()
    user = user
    userDB = mongo.db.users.find(
        {"username": user})

    recipes = mongo.db.recipes.find(
            {"created_by": user})

    messages = mongo.db.messages.find(
            {"message_for": user})

    if request.method == "POST":

        today = date.today()
        now = today.strftime("%b-%d-%Y")

        newMessage = {
                "message_from": session["user"],
                "message_for": request.form.get("from"),
                "message_text": request.form.get("message"),
                "date": now,
            }

        if request.form.get("submit") == 1:
            mongo.db.messages.insert(newMessage)

        if request.form.get("seeRecipe") == 15:
            return "hello"

    return render_template(
     "user.html",
     recipes=recipes, user=user, userDB=userDB, messages=messages, msg=msg)


@app.route("/main", methods=["GET", "POST"])
def main():
    msg = messenger()
    main = mongo.db.recipes.find({"category_name": "main"})

    return render_template("main.html", main=main, msg=msg)


@app.route("/dessert", methods=["GET", "POST"])
def dessert():
    msg = messenger()
    dessert = mongo.db.recipes.find({"category_name": "dessert"})

    return render_template("dessert.html", dessert=dessert, msg=msg)


@app.route("/drink", methods=["GET", "POST"])
def drink():
    msg = messenger()
    drink = mongo.db.recipes.find({"category_name": "drink"})

    return render_template("drink.html", drink=drink, msg=msg)


@app.route("/myprofile", methods=["GET", "POST"])
def my_profile():
    msg = messenger()
    user = mongo.db.users.find_one(
            {"username": session["user"]})

    messages = mongo.db.messages.find(
            {"message_for": session["user"]})

    myrecipes = mongo.db.recipes.find(
            {"created_by": session["user"]})

    numOfRecipes = mongo.db.recipes.find(
            {"created_by": session["user"]}).count()

    if request.method == "POST":
        today = date.today()
        now = today.strftime("%b-%d-%Y")
        ticket = {
                "query_type": request.form.get("query-type"),
                "details": request.form.get("textbox"),
                "submit_by": request.form.get("userName"),
                "user_id": request.form.get("userID"),
                "ticket_opened": now,
                "reply": "",
                "open_ticket": "1",
                "closed_by": ""
            }
        mongo.db.tickets.insert(ticket)
        flash("Ticket Open: Monitor The Ticketing Section For Response")

        return redirect(url_for('my_profile'))

    return render_template(
        "profile.html",
        messages=messages, user=user,
        myrecipes=myrecipes, numOfRecipes=numOfRecipes, msg=msg)


@app.route("/store", methods=["GET", "POST"])
def store():
    msg = messenger()
    return render_template("store.html", msg=msg)


@app.route("/about", methods=["GET", "POST"])
def about():
    msg = messenger()
    return render_template("about.html", msg=msg)


@app.route("/contact", methods=["GET", "POST"])
def contact():
    msg = messenger()
    return render_template("contact.html", msg=msg)


@app.route("/cart", methods=["GET", "POST"])
def cart():
    msg = messenger()
    return render_template("cart.html", msg=msg)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
