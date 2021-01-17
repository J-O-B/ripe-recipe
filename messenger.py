name = session["user"]
id = mongo.db.users.find({"_id": ()},
            {"username": name})
messages = mongo.db.comments.find(
            {"message_for": id})
