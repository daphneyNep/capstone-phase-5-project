from sqlalchemy import ForeignKey
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin


from config import db

# Association table for the many-to-many relationship between UserLists and Books
userlist_books = db.Table('userlist_books',
    db.Column('userlist_id', db.Integer, db.ForeignKey('userlists.id'), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)


class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, ForeignKey('authors.id'))
    title = db.Column(db.String, nullable=False)
    summary = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=True)

    # Relationships
    author = relationship('Author', back_populates='books')
    comments = relationship('Comment', back_populates='book', cascade="all, delete-orphan")
    userlists = relationship('UserList', secondary=userlist_books, back_populates='books')

    # Fields to serialize
    serialize_rules = ('-author.books', '-comments.book', '-userlists.books')  # Avoid recursion

    def __repr__(self):
        return f'<Book {self.id}, {self.title}, {self.author_id}, {self.summary} >'


class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    bio = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String, nullable=True)  # Field for image URL


    # One-to-Many relationship: An author has many books
    books = relationship('Book', back_populates='author')

    # Fields to serialize
    serialize_rules = ('-books.author',)  # Exclude recursive serialization of book

    def to_dict(self, only=None):
        if only:
            return {key: getattr(self, key) for key in only}
        else:
            return {
                'id': self.id,
                'name': self.name,
                'genre': self.genre,
                'bio': self.bio,
                'image_url': self.image_url
            }


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    # One-to-Many: A user can have many comments
    
    
    comments = relationship('Comment', back_populates='user', cascade="all, delete-orphan")

    # Fields to serialize
    serialize_rules = ('-comments.user',)  # Avoid recursion in comments

    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.password}>'


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)

    # Relationships
    book = relationship('Book', back_populates='comments')
    user = relationship('User', back_populates='comments')

    # Fields to serialize
    serialize_rules = ('-book.comments', '-user.comments')  # Avoid recursion in book and user

    def __repr__(self):
        return f'<Comment {self.id}, {self.content}, {self.book_id}, {self.user_id}>'


class UserList(db.Model, SerializerMixin):
    __tablename__ = 'userlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    user_name = db.Column(db.String)
    book_id = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    # Many-to-Many: A user list can have many books, and a book can be part of many user lists
    books = relationship('Book', secondary=userlist_books, back_populates='userlists')

    # Fields to serialize
    serialize_rules = ('-books.userLists',)  # Avoid recursion in books

    @validates('rating')
    def validate_rating(self, key, value):
        if value < 1 or value > 5:
            raise ValueError('Rating must be between 1 and 5')
        return value

    def __repr__(self):
        return f'<UserList {self.user_id}, {self.book_id}, {self.user_name}, {self.rating}>'




    