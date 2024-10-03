from flask import Flask, jsonify, request, make_response
from config import app, db
from models import Author, Book, Comment, User, UserList
from flask_cors import CORS
import logging
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


from sqlalchemy.exc import SQLAlchemyError

# @app.after_request
# def add_cors_headers(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
#     return response



logging.basicConfig(level=logging.INFO)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


def handle_error(message, status_code=500):
    logging.error(message)
    return jsonify({'error': message}), status_code

@app.route('/author', methods=['GET', 'POST'])
def handle_authors():
    if request.method == 'GET':
        try:
            authors = Author.query.all()
            output = [author.to_dict(only=('id', 'name', 'genre', 'bio', 'image_url')) for author in authors]
            return jsonify(output)
        except SQLAlchemyError as e:
            logging.error(f"Error occurred during GET: {e}")
            return handle_error('Internal Server Error')

    elif request.method == 'POST':
        try:
            data = request.get_json()
            required_fields = ['name', 'genre']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, name and genre are required'}), 400

            new_author = Author(
                name=data.get('name'),
                genre=data.get('genre'),
                bio=data.get('bio'),
                image_url=data.get('image_url'),
            )
            db.session.add(new_author)
            db.session.commit()
            return jsonify(new_author.to_dict()), 201
        
        except SQLAlchemyError as e:
            db.session.rollback()
            logging.error(f"Error occurred during POST: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500
        
@app.route('/api/authors/<int:id>', methods=['DELETE'])
def delete_author(id):
    author = Author.query.get(id)
    if author:
        db.session.delete(author)
        db.session.commit()
        return jsonify({'message': 'Author deleted successfully.'}), 200
    return jsonify({'message': 'Author not found.'}), 404

@app.route('/users', methods=['GET'])
def get_users():
    users = [
        {"id": 1, "username": "Nicole"},
        {"id": 2, "username": "James"},
        {"id": 3, "username": "Tammy"},
        {"id": 4, "username": "Nayla"},
        {"id": 5, "username": "Jones"},
        {"id": 6, "username": "Funnyface"},
        {"id": 7, "username": "Luvreading04"},
        {"id": 8, "username": "benji"},
        {"id": 9, "username": "Grace"},
        {"id": 10, "username": "Dora"},  # Added an ID for "Dora"
    ]
    return jsonify(users), 200

@app.route('/user', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        try:
            users = User.query.all()
            logging.info(f"users fetched: {users}")  # Debugging line
            output = [user.to_dict() for user in users]
            return jsonify(output)
        except Exception as e:
            logging.error(f"Error occurred during GET: {e}", exc_info=True)
            return jsonify({'error': 'Internal Server Error'}), 500

    elif request.method == 'POST':
        try:
            data = request.get_json()
            if data is None:
                logging.error("No JSON data provided")
                return jsonify({'error': 'Bad request, no JSON data provided'}), 400
            required_fields = ['username', 'password']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, username and password are required'}), 400

            new_user = User(username=data['username'], password=data['password'])
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error occurred during POST: {e}", exc_info=True)
            return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/author/<int:id>', methods=['GET', 'DELETE'])
def author_by_id(id):
    author = db.session.get(Author, id)
    print(f"Requested ID: {id}, Author Found: {author}")
    
    if request.method == 'GET':
        if author is None:
            return jsonify({'error': 'Author not found'}), 404
        return jsonify(author.to_dict())

    elif request.method == 'DELETE':
        if author is None:
            return jsonify({'error': 'Author not found'}), 404

        # Handle related books
        Book.query.filter_by(author_id=id).delete(synchronize_session=False)
        db.session.commit()
        # Delete the author
        db.session.delete(author)
        db.session.commit()

        return jsonify({'message': 'Author deleted successfully'}), 200


@app.route('/books', methods=['GET'])
def get_books():
    # Fetch books from your database and return them as JSON
    books = [
        {
            "id": 1,
            "title": "A Prince's Endless Indulgence",
            "author": "Nalan Lingling",
            "image_url": "https://th.bing.com/th/id/OIP.5QFMUWxvMdJFjr85wIw4egAAAA?rs=1&pid=ImgDetMain"  # Add the image URL
        },
        {
            "id": 2,
            "title": "The Tycoon's Fierce Pampering of His Wife",
            "author": "Love at the Reunion",
            "image_url": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568095430l/53030953.jpg"  # Add the image URL
        },
        {
            "id": 3,
            "title": "Back to the Past: The Rise of the False Heiress...",
            "author": "JQK",
            "image_url": "https://th.bing.com/th/id/OIP.IhL3tZhzCwy7lpoiX6fTcAHaJ4?rs=1&pid=ImgDetMain"  # Add the image URL
        },
        {
            "id": 4,
            "title": "The Humble Family's Daughter Has A Spatial Pocket!",
            "author": "Knocking Brush",
            "image_url": "https://oregairu.b-cdn.net/wp-content/uploads/2024/09/the-humble-familys-daughter-has-a-spatial-pocket-193x278.jpg"  # Add the image URL
        },
        {
            "id": 5,
            "title": "Pampered Poisonous Royal Wife",
            "author": "Master An",
            "image_url": "https://img.wtr-lab.com/cdn/series/LNlzcLIp_GSAFMbWzT_XTg.jpg"  # Add the image URL
        },
        {
            "id": 6,
            "title": "She Became The Boss's Lady After Divorce",
            "author": "NovelCamon",
            "image_url": "https://th.bing.com/th/id/OIP.PJ0PyRXOXD-2gqlfs4RG-wHaHa?rs=1&pid=ImgDetMain" # Add the image URL
        },
        {
            "id": 7,
            "title": "Reborn in the Seventies: Pampered Wife...",
            "author": "Purple Fantasy Enchantment",
            "image_url": "https://th.bing.com/th/id/OIP.GUXcERCo2_MQ_SnLrkvz7AAAAA?rs=1&pid=ImgDetMain"  # Add the image URL
        },
        {
            "id": 8,
            "title": "The wealthy stepmom became wildly popular...",
            "author": "Little Lucky Fire",
            "image_url": "https://ik.imagekit.io/storybird/images/e2307839-0815-49f5-b883-10b480005981/0_985319130.png"  # Add the image URL
        },
    ]
    return jsonify(books), 200

# Route to handle GET and POST for a single book
@app.route('/book/<int:book_id>/comments', methods=['POST'])
def add_comment(book_id):
    data = request.get_json()
    
    # Validate incoming data
    if not data or 'content' not in data:
        return jsonify({"error": "Invalid input, content is required"}), 400

    try:
        # Create a new comment
        new_comment = Comment(
            content=data['content'],
            book_id=book_id  # Link the comment to the book
        )
        
        db.session.add(new_comment)
        db.session.commit()
        
        return jsonify({"message": "Comment added", "data": {"id": new_comment.id, "content": new_comment.content}}), 201
    except Exception as e:
        print(f"Error adding comment: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
@app.route('/book', methods=['POST', 'OPTIONS'])
def create_book():
    if request.method == 'OPTIONS':
        # Respond to preflight request
        return _build_cors_preflight_response()
    # Handle the actual POST request here
    data = request.json
    # Process book creation logic here
    return jsonify({'message': 'Book created successfully', 'id': 1})

@app.route('/book/<int:id>', methods=['PATCH', 'OPTIONS'])
def update_book(id):
    if request.method == 'OPTIONS':
        # Respond to preflight request
        return _build_cors_preflight_response()
    # Handle the actual PATCH request here
    data = request.json
    # Process book update logic here
    return jsonify({'message': 'Book updated successfully'})

def _build_cors_preflight_response():
    response = jsonify()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
    return response
    
    
@app.route('/book/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get(id)
    if book is None:
        return jsonify({"error": "Book not found"}), 404
    
    return jsonify(book.to_dict()) 
    
@app.route('/book/<int:id>', methods=['DELETE'])
def delete_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book deleted successfully"}), 200

@app.route('/user_list/<int:user_list_id>/add_book', methods=['POST'])
def add_book_to_user_list(user_list_id):
    user_list = UserList.query.get(user_list_id)
    if user_list is None:
        return jsonify({'error': 'UserList not found'}), 404

    data = request.get_json()
    if not data or 'book_id' not in data:
        return jsonify({'error': 'Bad request, book_id is required'}), 400

    book_id = data['book_id']
    book = Book.query.get(book_id)
    if book is None:
        return jsonify({'error': 'Book not found'}), 404

    # Here you can manage the logic of adding the book to the user list
    user_list.books.append(book)  # Assuming you have a relationship set up
    db.session.commit()
    return jsonify({'message': 'Book added to user list'}), 200




@app.route('/user/<int:id>', methods=['GET', 'DELETE'])
def user_by_id(id):
    user = User.query.get(id)
    if request.method == 'GET':
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user.to_dict())
    elif request.method == 'DELETE':
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200

    
@app.route('/userlist', methods=['GET', 'POST'])
def get_user_lists():
    if request.method == 'GET':
        try:
            userlists = UserList.query.all()
            output = [userlist.to_dict() for userlist in userlists]
            return jsonify(output)
        except Exception as e:
            print(f"Error occurred during GET: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500

    elif request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data:
                return jsonify({'error': 'Bad request, no JSON data provided'}), 400
            
            required_fields = ['user_id', 'book_id']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, user_id, and book_id are required'}), 400
            
            # Create a new UserList entry
            new_userlist = UserList(
                user_id=data['user_id'],
                book_id=data['book_id'],
                
            )
            db.session.add(new_userlist)
            db.session.commit()
            return jsonify(new_userlist.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error occurred during POST: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/userlist/<int:id>', methods=['GET', 'DELETE'])
def userlist_by_id(id):
    userlist = UserList.query.get(id)
    if request.method == 'GET':
        if userlist is None:
            return jsonify({'error': 'UserList not found'}), 404
        return jsonify(userlist.to_dict())

    elif request.method == 'DELETE':
        if userlist is None:
            return jsonify({'error': 'UserList not found'}), 404
        db.session.delete(userlist)
        db.session.commit()
        return jsonify({'message': 'UserList deleted successfully'}), 200

@app.route('/userLists/<int:user_list_id>/comments', methods=['GET'])
def get_comments_for_user_list(user_list_id):
    user_list = UserList.query.get(user_list_id)
    if not user_list:
        return jsonify({'error': 'UserList not found'}), 404  # Ensure this returns JSON

    comments = [comment.to_dict() for comment in user_list.comments]  # Assuming comments is a relationship
    return jsonify(comments), 200 

@app.route('/routes', methods=['GET'])
def show_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append(f"{rule.endpoint}: {rule.methods} -> {rule.rule}")
    return jsonify(routes)
    
@app.route('/comments', methods=['GET', 'POST'])
def handle_comments():
    if request.method == 'GET':
        # Fetch comments from the database (Example logic)
        comments = [
            {"id": 1, "content": "This book had me hooked for a long time!", "image_url": "https://th.bing.com/th/id/OIP.5QFMUWxvMdJFjr85wIw4egAAAA?rs=1&pid=ImgDetMain"},
            {"id": 2, "content": "I need the RAW title to this book. I can't put it down", "image_url": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568095430l/53030953.jpg"},
            {"id": 3, "content": "The FL is my cup of tea. Although the FL is smart, I still like how the ML is strong as well.", "image_url":"https://oregairu.b-cdn.net/wp-content/uploads/2024/09/the-humble-familys-daughter-has-a-spatial-pocket-193x278.jpg"},
            {"id": 4, "content": "I need more coins for this book :(", "image_url":"https://oregairu.b-cdn.net/wp-content/uploads/2024/09/the-humble-familys-daughter-has-a-spatial-pocket-193x278.jpg"},
            {"id": 5, "content": "This book is on FIIIRRRE!", "image_url":"https://th.bing.com/th/id/OIP.PJ0PyRXOXD-2gqlfs4RG-wHaHa?rs=1&pid=ImgDetMain"},
            {"id": 6, "content": "Please share the RAW title", "image_url":"https://th.bing.com/th/id/OIP.GUXcERCo2_MQ_SnLrkvz7AAAAA?rs=1&pid=ImgDetMain"},
        ]

        return jsonify(comments), 200  # Return the list of comments

    elif request.method == 'POST':
        data = request.get_json()  # Get JSON data from the request
        try:
            # Create a new Comment instance using the provided data
            new_comment = Comment(
                content=data['content'],
                user_id=data['user_id'],
                userlist_id=data['userlist_id'],
                book_id=data['book_id']
            )

            # Add the new comment to the session and commit the changes
            db.session.add(new_comment)
            db.session.commit()

            # Return the created comment with a 201 Created response
            return jsonify(new_comment.to_dict()), 201

        except SQLAlchemyError as e:
            # Rollback the session in case of a database error
            db.session.rollback()
            logging.error(f"Error occurred during POST /comments: {e}", exc_info=True)
            return jsonify({'error': 'Internal Server Error'}), 500

        except Exception as e:
            logging.error(f"Unexpected error: {e}", exc_info=True)
            return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/test', methods=['GET'])
def test():
    return 'Test route is working!'



@app.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment not found'}, 404
    
    data = request.get_json()
    if not data:
        return {'message': 'Invalid JSON data, ensure Content-Type is application/json'}, 400
    
    content = data.get('content')

    if content:
        comment.content = content

    try:
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return {'message': 'Failed to update comment: ' + str(e)}, 400

@app.route('/comment/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted successfully'}), 200

@app.route('/set-cookie')
def set_cookie():
    response = make_response("Cookie is set")
    response.set_cookie(
        'your_cookie', 
        'value', 
        secure=True,         # Ensures the cookie is sent only over HTTPS
        samesite='None'     # Allows cross-site usage
    )
    return response

@app.route('/about_image', methods=['GET'])
def get_about_image():
    image_url = "https://www.pixelstalk.net/wp-content/uploads/images1/Free-book-hd-wallpapers.jpg"
    return jsonify({"image_url": image_url})



if __name__ == '__main__':
    app.run(port=5555, debug=True)



