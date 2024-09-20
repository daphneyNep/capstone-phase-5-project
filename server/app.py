from email import parser
from flask import Flask, request, jsonify
from config import app, db
from models import Author, Book, Comment, User, db, UserList
from flask_cors import CORS
import logging

from sqlalchemy.exc import SQLAlchemyError

# Allow CORS for all routes
CORS(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/author', methods=['GET', 'POST'])


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
                return jsonify({'error': 'Bad request, name, genre are required'}), 400

            new_author = Author(
                name=data.get('name'),
                genre=data.get('genre'),
                bio=data.get('bio'),
                image_url=data.get('image_url'),
            )
            db.session.add(new_author)
            db.session.commit()
            return jsonify(new_author.to_dict()), 201
        except ValueError as ve:
            return jsonify({'error': f"Invalid date format: {ve}"}), 400
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error occurred during POST: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        try:
            users = User.query.all()
            output = [user.to_dict() for user in users]
            return jsonify(output)
        except Exception as e:
            print(f"Error occurred during GET: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500
    elif request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if data is None:
                return jsonify({'error': 'Bad request, no JSON data provided'}), 400
            required_fields = ['username', 'password']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, username and password are required'}), 400
            new_user = User(
                username=data['username'],
                password=data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.to_dict()), 201
        except Exception as e:
            print(f"Error occurred during POST: {e}")
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
            data = request.get_json()
            print(f"Received data: {data}")  # Debug statement

            # Required fields
            required_fields = ['title', 'id']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Bad request, title and id are required'}), 400

            # Handle optional fields with default values
            summary = data.get('summary', '')  # Provide a default value if summary is missing
            image_url = data.get('image_url')
            author_id = data.get('author_id')

            new_book = Book(
                title=data['title'],
                summary=summary,
                image_url=image_url,
                author_id=author_id
            )
            db.session.add(new_book)
            db.session.commit()
            return jsonify(new_book.to_dict()), 201
        except Exception as e:
            print(f"Error occurred during POST: {e}")
            db.session.rollback()  # Rollback the session in case of an error
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
    
@app.route('/comments/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment not found'}, 404
    return jsonify(comment.to_dict()), 200

@app.route('/test', methods=['GET'])
def test():
    return 'Test route is working!'

@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()  # Parse JSON data
    if data is None:
        return {'message': 'Invalid JSON data'}, 400

    content = data.get('content')
    book_id = data.get('book_id')
    user_id = data.get('user_id')

    if not content or not book_id or not user_id:
        return {'message': 'Missing required fields'}, 400
    try:
        comment = Comment(content=content, book_id=book_id, user_id=user_id)
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return {'message': str(e)}, 400

@app.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment not found'}, 404
    data = request.get_json()
    content = data.get('content')

    if content:
        comment.content = content

    try:
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return {'message': str(e)}, 400

@app.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment not found'}, 404
    try:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted'}, 200  # Return 200 for successful deletion with a message
    except Exception as e:
        db.session.rollback()
        return {'message': str(e)}, 400

if __name__ == '__main__':
    app.run(port=5555, debug=True)

