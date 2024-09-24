from flask import Flask, jsonify, request, make_response
from config import app, db
from models import Author, Book, Comment, User, UserList
from flask_cors import CORS
import logging
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.exc import SQLAlchemyError



logging.basicConfig(level=logging.INFO)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return '<h1>Project Server</h1>'




@app.route('/author', methods=['GET', 'POST'])
def handle_authors():
    if request.method == 'GET':
        try:
            authors = Author.query.all()
            output = [author.to_dict(only=('id', 'name', 'genre', 'bio', 'image_url')) for author in authors]
            return jsonify(output)
        except Exception as e:
            print(f"Error occurred during GET: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500

    elif request.method == 'POST':
        try:
            data = request.get_json(force=True)
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
        
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error occurred during POST: {e}")
            return jsonify({'error': str(e)}), 500

@app.route('/user', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        try:
            users = User.query.all()
            output = [user.to_dict() for user in users]
            return jsonify(output)
        except Exception as e:
            logging.error(f"Error occurred during GET: {e}")
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
            logging.error(f"Error occurred during POST: {e}")
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

@app.route('/book', methods=['GET', 'POST'])
def handle_books():
    if request.method == 'GET':
        try:
            books = Book.query.all()
            output = [book.to_dict(only=('id', 'title', 'author_id', 'summary', 'image_url')) for book in books]
            return jsonify(output)
        except Exception as e:
            print(f"Error occurred during GET: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500

    elif request.method == 'POST':
        try:
            data = request.get_json(force=True)
            required_fields = ['title']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, title is required'}), 400

            new_book = Book(
                title=data['title'],
                summary=data.get('summary', ''),
                image_url=data.get('image_url'),
                author_id=data.get('author_id'),
            )
            db.session.add(new_book)
            db.session.commit()
            return jsonify(new_book.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error occurred during POST: {e}")

            return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/book/<int:id>', methods=['GET', 'DELETE'])
def book_by_id(id):
    book = Book.query.get(id)
    if request.method == 'GET':
        if book is None:
            return jsonify({'error': 'Book not found'}), 404
        return jsonify(book.to_dict())
    elif request.method == 'DELETE':
        if book is None:
            return jsonify({'error': 'Book not found'}), 404
        db.session.delete(book)
        db.session.commit()
        return jsonify({'message': 'Book deleted successfully'}), 200

@app.route('/userlist', methods=['GET', 'POST'])
def handle_userlist():
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
            if data is None:
                return jsonify({'error': 'Bad request, no JSON data provided'}), 400
            required_fields = ['user_id', 'book_id', 'rating']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, user_id, book_id and rating are required'}), 400
            
            new_userlist = UserList(
                user_id=data['user_id'],
                book_id=data['book_id'],
                rating=data['rating']
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
    
@app.route('/comment', methods=['GET'])
def get_comments():
    comments = Comment.query.all()  # Replace with your logic to fetch comments
    return jsonify([comment.to_dict() for comment in comments])

@app.route('/test', methods=['GET'])
def test():
    return 'Test route is working!'

@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    if not data:
        return {'message': 'Invalid JSON data, ensure Content-Type is application/json'}, 400

    content = data.get('content')
    book_id = data.get('book_id')
    user_id = data.get('user_id')

    if not content or not book_id or not user_id:
        return {'message': 'Missing required fields: content, book_id, user_id'}, 400

    try:
        comment = Comment(content=content, book_id=book_id, user_id=user_id)
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return {'message': 'Failed to create comment: ' + str(e)}, 400

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)

