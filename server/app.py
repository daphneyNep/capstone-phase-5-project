# local import
from flask import request, jsonify
from flask_restful import Resource
# imports
from config import app, db, api
from models import Member, BookMember, Book

from sqlalchemy.exc import SQLAlchemyError

class BookListResource(Resource):
    def get(self):
        try:
            books = Book.query.all()
            books_data = [{
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'content': book.content
            } for book in books]
            return books_data, 200
        except SQLAlchemyError as e:
            app.logger.error(f"SQLAlchemy error fetching books: {e}")
            return {"errors": ["An error occurred while fetching books"]}, 500
        except Exception as e:
            app.logger.error(f"Unexpected error fetching books: {e}")
            return {"error": str(e)}, 500

    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {'message': 'No input data provided'}, 400
            
            # Validate required fields
            required_fields = ['title', 'author']
            for field in required_fields:
                if field not in data:
                    return {'message': f'Missing field: {field}'}, 400

            title = data.get('title')
            author = data.get('author')

            # Create the book
            new_book = Book(title=title, author=author)
            db.session.add(new_book)
            db.session.commit()
            return new_book.to_dict(), 201
        except SQLAlchemyError as e:
            app.logger.error(f"Error adding book: {e}")
            db.session.rollback()
            return {"errors": ["An error occurred while adding the book"]}, 500
        except Exception as e:
            app.logger.error(f"Error adding book: {e}")
            return {"error": str(e)}, 500

class BookResource(Resource):
    def get(self, id):
        book = Book.query.get(id)
        if book is None:
            return {"error": "Book not found"}, 404

        book_data = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'content': book.content
        }
        return book_data, 200

    def delete(self, id):
        book = Book.query.get(id)
        if book is None:
            return {"error": "Book not found"}, 404

        db.session.delete(book)
        db.session.commit()
        return {"message": "Book deleted"}, 200

    def post(self):
        data = request.get_json()  # Get JSON data from request
        if not data:
            return {'message': 'No input data provided'}, 400
        
        # Validate required fields
        required_fields = ['id', 'title', 'author', 'content']
        for field in required_fields:
            if field not in data:
                return {'message': f'Missing field: {field}'}, 400

        # Create the book
        book_data = {
            'id': data.get('id'),
            'title': data.get('title'),
            'author': data.get('author'),
            'content': data.get('content')
        }
        
        # Return the created book
        return book_data, 201

class MemberResource(Resource):
    def get(self, id=None):
        if id is None:
            members = Member.query.all()
            members_data = []

            for member in members:
                member_data = {
                    'id': member.id,
                    'membername': member.membername,
                    'books': []
                }
                for book_member in member.book_members:
                    book = Book.query.get(book_member.book_id)
                    book_data = {
                        'id': book.id,
                        'title': book.title,
                        'author': book.author,
                        'review': book_member.review
                    }
                    member_data['books'].append(book_data)
                members_data.append(member_data)

            return jsonify(members_data)
        else:
            member = Member.query.get(id)
            if member is None:
                return {"error": "Member not found"}, 404

            member_data = {
                'id': member.id,
                'membername': member.membername,
                'books': []
            }
            for book_member in member.book_members:
                book = Book.query.get(book_member.book_id)
                book_data = {
                    'id': book.id,
                    'title': book.title,
                    'author': book.author,
                    'review': book_member.review
                }
                member_data['books'].append(book_data)

            return jsonify(member_data)

    def post(self):
        data = request.get_json()  # Get JSON data from request
        if not data:
            return {'message': 'No input data provided'}, 400
        
        member_data = {
            'membername': data.get('name'),
            
        }
        
        return jsonify(member_data)  # Properly serialize data to JSON

class BookMemberResource(Resource):
    def get(self, id=None):
        if id is None:
            book_members = BookMember.query.all()
            if not book_members:
                return {"error": "No BookMembers found"}, 404

            book_members_data = []
            for book_member in book_members:
                book = Book.query.get(book_member.book_id)
                member = Member.query.get(book_member.member_id)
                if not book or not member:
                    continue

                book_member_data = {
                    "id": book_member.id,
                    "Book": {
                        "id": book.id,
                        "title": book.title,
                        "author": book.author
                    },
                    "member": {
                        "id": member.id,
                        "membername": member.membername
                    },
                    "review": book_member.review,
                    "book_id": book_member.book_id,
                    "member_id": book_member.member_id
                }
                book_members_data.append(book_member_data)

            return book_members_data, 200
        else:
            book_member = BookMember.query.get(id)
            if book_member is None:
                return {"error": "BookMember not found"}, 404

            book = Book.query.get(book_member.book_id)
            member = Member.query.get(book_member.member_id)

            if not book or not member:
                return {"error": "Associated book or member not found"}, 404

            response = {
                "id": book_member.id,
                "Book": {
                    "id": book.id,
                    "title": book.title,
                    "author": book.author
                },
                "member": {
                    "id": member.id,
                    "membername": member.membername
                },
                "review": book_member.review,
                "book_id": book_member.book_id,
                "member_id": book_member.member_id
            }
            return response, 200

    def post(self):
        try:
            data = request.get_json()
            required_fields = ["review", "book_id", "member_id"]
            
            # Check for missing fields
            if not all(field in data for field in required_fields):
                return {"errors": ["Missing required fields"]}, 400
            
            review = data.get("review")

            book = Book.query.get(data.get("book_id"))
            if not book:
                return {"errors": ["Book not found"]}, 404

            member = Member.query.get(data.get("member_id"))
            if not member:
                return {"errors": ["Member not found"]}, 404

            book_member = BookMember(
                member_id=data["member_id"],
                book_id=data["book_id"],
                review=review
            )
            db.session.add(book_member)
            db.session.commit()
            
            response = {
                "id": book_member.id,
                "Book": {
                    "id": book.id,
                    "title": book.title,
                    "author": book.author
                },
                "member": {
                    "id": member.id,
                    "membername": member.membername
                },
                "review": book_member.review,
                "book_id": book_member.book_id,
                "member_id": book_member.member_id
            }
            return response, 201
        
        except SQLAlchemyError as e:
            app.logger.error(f"Error creating book member: {e}")
            db.session.rollback()
            return {"errors": ["An error occurred while creating the book member"]}, 500
        except Exception as e:
            app.logger.error(f"Error creating book member: {e}")
            return {"error": str(e)}, 500

@app.route('/books', methods=['GET'])
def get_books():
    try:
        books = Book.query.all()
        return jsonify([book.to_dict() for book in books])
    except Exception as e:
        app.logger.error(f"Error fetching books: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

api.add_resource(BookListResource, '/books')
api.add_resource(BookMemberResource, '/book_members', '/book_members/<int:id>')
api.add_resource(MemberResource, '/members', '/members/<int:id>')
api.add_resource(BookResource, '/books/<int:id>')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

