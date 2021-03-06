import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import random
import string
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date
if os.path.exists("env.py"):
    import env

app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


# Route Error Handling:
@app.errorhandler(404)
def not_found(e):
    # error page:
    return render_template("404.html")


@app.route("/", methods=["GET", "POST"])
def home():
    home = True
    recipes = mongo.db.recipes.find()
    items = mongo.db.recipes.find().sort(
        'recipe_name').limit(4)
    if request.form.get('globalSearch') == "1":
        return redirect(url_for('store'))

    if request.method == "POST":
        # Check for valid user in database
        user = request.form.get("username").lower()
        existing_user = mongo.db.users.find_one(
            {"username": user})

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
                return redirect(url_for("home"))
        else:
            # username doesn't exist
            flash("Username and/or Password Incorrect")
            return redirect(url_for("home"))
    return render_template("home.html", home=home,
                           recipes=recipes, items=items)


@app.route("/admin", methods=["GET", "POST"])
def admin():
    """
    First check for session cookie, if true, user is logged in,
    Store session cookie to a var and search the users database.
    Match a record with the current user, and check for admin privilages.
    """
    try:
        user = mongo.db.users.find(
            {"username": session["user"]})
        Queries = mongo.db.tickets.find()

        # Count the stats
        userCount = mongo.db.users.count()
        ticketCount = mongo.db.tickets.count()
        recipeCount = mongo.db.recipes.count()
        productCount = mongo.db.products.count()
        commentCount = mongo.db.comments.count()
        messageCount = mongo.db.messages.count()

        """
        Update Ticket
        """
        if request.method == "POST":
            id = request.form.get("query_id")
            mongo.db.tickets.update_one(
                {"_id": ObjectId(id)},
                {"$push":
                    {"reply": "Admin: " + request.form.get("replyTicket")}})
            flash("Ticket Updated")
            return redirect(url_for("admin"))
    except:
        user = ""
        flash("Invalid Credentials")
        return redirect(url_for('my_profile'))
    return render_template("admin_panel.html",
                           Queries=Queries, user=user,
                           userCount=userCount,
                           ticketCount=ticketCount,
                           recipeCount=recipeCount,
                           productCount=productCount,
                           commentCount=commentCount,
                           messageCount=messageCount)


@app.route("/error/<reason>", methods=["GET", "POST"])
def error(reason):
    reason = int(reason)
    if reason == 0:
        message = ("There seems to be a problem with your credentials" + "\n"
                   + "Please contact an admin for support")
    else:
        message = "Oh Snap! Something seems to have gone wrong!"

    return render_template("error.html", message=message)


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


@app.route("/logout", methods=["GET", "POST"])
def logout():
    # remove user from session cookie
    session.pop("user")
    return redirect(url_for("home"))


@app.route('/editProfile', methods=["GET", "POST"])
def editUser():
    try:
        user = mongo.db.users.find_one(
                {"username": session["user"]})
        id = user["_id"]
    except:
        user = ""

    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
                {"username": request.form.get('username').lower()})
        # Check if username exists
        if not existing_user:
            edit = {
                "username": request.form.get("username").lower(),
                "email": request.form.get("email"),
                "fav_food": request.form.get("fav_food").lower(),
                "prof_pic": request.form.get("edit_prof_pic"),
                "bio": request.form.get("bio").lower(),
                "password": generate_password_hash(
                    request.form.get("password")),
                "fav_recipes": user["fav_recipes"],
                "cart_items": user["cart_items"],
            }
            mongo.db.users.update({"_id": ObjectId(id)}, edit)

            # Flash Message
            session.pop("user")
            flash("Profile Updated, Please Login With Your New Details")
            return redirect(url_for('login'))
        else:
            flash("Username Already Exists")
    return render_template("editUser.html", user=user)


@app.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
                {"username": request.form.get('username').lower()})
        # Check if username exists
        if not existing_user:
            register = {
                "username": request.form.get("username").lower(),
                "email": request.form.get("email"),
                "fav_food": request.form.get("fav_food").lower(),
                "prof_pic": request.form.get("prof_pic_url"),
                "bio": request.form.get("bio").lower(),
                "password": generate_password_hash(
                    request.form.get("password")),
                "fav_recipes": [],
                "cart_items": [],
            }
            mongo.db.users.insert_one(register)
            # Put the new user into "session" cookie
            flash("Congrats, You Are Now Part Of The Ripe Family!")

            return redirect(url_for("login"))
        else:
            flash("Username Already Exists")
            return redirect(url_for("signup"))

    return render_template("signup.html")


@app.route("/edit/<id>", methods=["GET", "POST"])
def editrecipe(id):
    id = id
    if (len(id) == 12 or len(id) == 24):
        recipe = mongo.db.recipes.find(
            {"_id": ObjectId(id)})
        User = id
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
                "created_by": User,
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
                                       recipe=recipe, id=id)

        return render_template(
                "edit_recipe.html", recipe=recipe)
    else:
        flash(
            "It seems like something went wrong. Please return and try again.")
        return redirect(url_for("home"))


@app.route("/newrecipe", methods=["GET", "POST"])
def newrecipe():
    try:
        user = mongo.db.users.find_one(
                {"username": session["user"]})
    except:
        user = ""

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
            "created_by": user["_id"],
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

    return render_template("add_recipe.html", user=user)


@app.route("/recipes", methods=["GET", "POST"])
def recipes():

    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes)


@app.route("/search", methods=["GET", "POST"])
def search():
    try:
        search = request.form.get("search")

        return redirect(url_for('results', search=search))

    except:
        return render_template("search.html")


@app.route("/results/<search>", methods=["GET", "POST"])
def results(search):
    try:
        search = search
        find = mongo.db.recipes.find({"$text": {"$search": search}})

        return render_template("search.html", find=find, search=search)

    except:
        return redirect(url_for('search'))


@app.route("/starter", methods=["GET", "POST"])
def starter():
    howMany = mongo.db.recipes.find({
        "category_name": "starter"
    }).count()
    starter = mongo.db.recipes.find({"category_name": "starter"})

    if request.form.get('submit') == "1":
        id = request.form.get("id")
        return redirect(url_for("selected", id=id))

    return render_template("starter.html",
                           starter=starter, howMany=howMany)


@app.route("/recipe/<id>", methods=["GET", "POST"])
def selected(id):
    """
    The selected page is a general page which can run all recipe types,
    on page logic will change
    """
    try:
        user = mongo.db.users.find_one(
                {"username": session["user"]})
    except:
        user = ""

    recipe = mongo.db.recipes.find(
            {"_id": ObjectId(id)})

    comment = mongo.db.comments.find(
            {"message_for": id})

    if (request.method == "POST"):
        if request.form.get("shoppingList") == "Add Items To Shopping List.":
            if session["user"]:
                data = zip(request.POST.keys(), request.POST.values())
                print(data)

        if request.form.get("leaveComment") == "1":
            today = date.today()
            now = today.strftime("%b-%d-%Y")

            newComment = {
                    "message_from": session["user"],
                    "message_for": id,
                    "message_text": request.form.get("recipe-comment"),
                    "rating": request.form.get("rating-comment"),
                    "date": now,
                }

            mongo.db.comments.insert(newComment)

        if request.form.get("saveRecipe") == "1":
            user = session["user"]
            update = [
                request.form.get("recipeName"),
                request.form.get("recipeID")
            ]
            mongo.db.users.find_one_and_update(
                {'username': user},
                {"$push":
                    {'fav_recipes': update}})
            flash("You have saved this recipe")
            return redirect(url_for('my_profile'))
        else:
            return render_template("selected.html",
                                   id=id, recipe=recipe, comment=comment,
                                   user=user)

    return render_template("selected.html",
                           id=id, recipe=recipe, comment=comment,
                           user=user)


@app.route("/user/<id>", methods=["GET", "POST"])
def user(id):
    id = id
    userDB = mongo.db.users.find(
            {"_id": ObjectId(id)})

    messages = mongo.db.messages.find(
            {"message_for": id})

    recipes = mongo.db.recipes.find(
        {"created_by": ObjectId(id)})
    if request.method == "POST":
        today = date.today()
        d1 = today.strftime("%d/%m/%Y")

        newMessage = {
            "message_from": request.form.get("from"),
            "message_for": id,
            "message_text": request.form.get("message"),
            "date": d1
        }
        mongo.db.messages.insert(newMessage)
        return render_template("user.html",
                               userDB=userDB, messages=messages)

    return render_template("user.html",
                           userDB=userDB, messages=messages, recipes=recipes)


@app.route("/main", methods=["GET", "POST"])
def main():

    main = mongo.db.recipes.find({"category_name": "main"})

    return render_template("main.html", main=main)


@app.route("/dessert", methods=["GET", "POST"])
def dessert():

    dessert = mongo.db.recipes.find({"category_name": "dessert"})

    return render_template("dessert.html", dessert=dessert)


@app.route("/drink", methods=["GET", "POST"])
def drink():
    drink = mongo.db.recipes.find({"category_name": "drink"})

    return render_template("drink.html", drink=drink)


@app.route("/myprofile", methods=["GET", "POST"])
def my_profile():
    """
    Load In Collections
    """
    try:
        user = mongo.db.users.find_one(
                {"username": session["user"]})
        myId = user["_id"]
    except:
        user = ""
        myId = ""

    messages = mongo.db.messages.find()

    myrecipes = mongo.db.recipes.find(
            {"created_by": myId})

    numOfRecipes = mongo.db.recipes.count_documents(
            {"created_by": myId})

    myTickets = mongo.db.tickets.find(
            {"user_id": myId})

    if request.method == "POST":
        if request.form.get("deleteProf") == "1":
            mongo.db.users.delete_one(
                {"_id": ObjectId(request.form.get('profId'))})
            session.pop("user")
            return redirect(url_for('home'))
        # If a user is creating a new ticket
        if request.form.get("newTicket") == "1":
            today = date.today()
            now = today.strftime("%b-%d-%Y")
            ticket = {
                    "query_type": request.form.get("query-type"),
                    "details": request.form.get("detailsEnter"),
                    "submit_by": session["user"],
                    "user_id": myId,
                    "ticket_opened": now,
                    "reply": [],
                    "open_ticket": "1",
                    "closed_by": ""
                }
            mongo.db.tickets.insert(ticket)
            flash("Ticket Open: Monitor The Ticketing Section For Response")

        # If the user is editing a ticket
        if request.form.get("submitEdit") == "1":
            # Open Ticket Based On Form Input, 0 = close, 1 = open
            openTicket = request.form.get("open_ticket")
            if openTicket == "0":
                mongo.db.tickets.remove(
                    {"_id": ObjectId(request.form.get("query_id"))})
                flash("Ticket Deleted")
                return redirect(url_for('my_profile'))

            elif openTicket == "1":
                reply = request.form.get("replyTicket")
                update = session["user"] + " : " + reply
                id = request.form.get("query_id")
                mongo.db.tickets.update_one(
                    {"_id": ObjectId(id)},
                    {"$push":
                        {"reply": update}})
                flash("Ticket Edited")
                return redirect(url_for('my_profile'))
        if request.form.get("removeRecipe") == "1":
            user = session["user"]
            update = [
                request.form.get("recipeName"),
                request.form.get("recipeID")
            ]
            mongo.db.users.find_one_and_update(
                {'username': user},
                {"$pull":
                    {'fav_recipes': update}})
            flash("You have saved this recipe")
            return redirect(url_for('my_profile'))

    return render_template(
        "profile.html",
        messages=messages, user=user,
        myrecipes=myrecipes, numOfRecipes=numOfRecipes,
        myTickets=myTickets, myId=myId)


@app.route("/store", methods=["GET", "POST"])
def store():
    products = mongo.db.products.find()

    letters = string.ascii_lowercase
    randomString = ''.join(random.choice(letters) for x in range(10))

    try:
        name = session["user"]
    except:
        name = ""

    if request.method == "POST":
        if name:
            update = [
                request.form.get("id"),
                request.form.get("name"),
                request.form.get("price"),
                randomString
            ]
            mongo.db.users.find_one_and_update(
                {'username': name},
                {"$push":
                    {'cart_items': update}})
            flash("You have saved this item to your cart")

        else:
            flash("Ripe Shopping Is Currently Available To Ripe Members")

    return render_template("store.html", products=products)


@app.route("/about", methods=["GET", "POST"])
def about():
    return render_template("about.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    return render_template("contact.html")


@app.route("/product/<id>", methods=["GET", "POST"])
def product(id):
    id = id
    product = mongo.db.products.find(
            {"_id": ObjectId(id)})
    letters = string.ascii_lowercase
    randomString = ''.join(random.choice(letters) for x in range(10))
    try:
        if request.method == "POST":
            if request.form.get("addToCart") == "1":
                user = session["user"]
                update = [
                    request.form.get("id"),
                    request.form.get("name"),
                    request.form.get("price"),
                    randomString
                ]
                mongo.db.users.find_one_and_update(
                    {'username': user},
                    {"$push":
                        {'cart_items': update}})
                flash("You have saved this item to your cart")

        return render_template("product.html", id=id, product=product)
    except:
        flash("Please sign up to Ripe To Checkout.")
        return render_template("product.html", id=id, product=product)


@app.route("/cart", methods=["GET", "POST"])
def cart():
    try:
        user = mongo.db.users.find(
            {"username": session["user"]})

        if request.method == "POST":
            id = session["user"]
            remove = [
                    request.form.get("id"),
                    request.form.get("name"),
                    request.form.get("price"),
                    request.form.get("rand"),

                ]
            mongo.db.users.update_one(
                {'username': id},
                {"$pull":
                    {'cart_items': remove}})

        return render_template("cart.html", user=user)
    except:
        user = ""
        flash("Please Login To Ripe To Order From The Ripe Store")
        return render_template("cart.html", user=user)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=False)
