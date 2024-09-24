from sqlalchemy import ForeignKey, Nullable
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin
from config import db  # Use the db from your config

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
    author = db.relationship('Author', back_populates='books')
    comments = db.relationship('Comment', back_populates='book', cascade="all, delete-orphan")
    userlists = db.relationship('UserList', secondary=userlist_books, back_populates='books')

    # Association proxy to access user names through userlists
    user_names = association_proxy('userlists', 'user.username')

    # Fields to serialize
    serialize_rules = ('-author.books', '-comments.book', '-userlists.books')  # Avoid recursion

    def __repr__(self):
        return f'<Book {self.id}, {self.title}, {self.author_id}, {self.summary} >'


class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)  # Ensuring name is not null
    genre = db.Column(db.String)
    bio = db.Column(db.Text)
    image_url = db.Column(db.String)  # Field for image URL

    # One-to-Many relationship: An author has many books
    books = db.relationship('Book', back_populates='author')

    # Fields to serialize
    serialize_rules = ('-books.author',)  # Exclude recursive serialization of book

    def __repr__(self):
        return f'<Author {self.id}, {self.name}, {self.genre}, {self.bio} >'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)  # Ensuring username is not null
    password = db.Column(db.String, nullable=False)  # Ensuring password is not null

    # One-to-Many: A user can have many comments and userlists
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    userlists = db.relationship('UserList', back_populates='user', cascade="all, delete-orphan")

    # Fields to serialize
    serialize_rules = ('-comments.user', '-userlists.user')

    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.password}>'


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)

    # Relationships
    book = db.relationship('Book', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    # Fields to serialize
    serialize_rules = ('-book.comments', '-user.comments')  # Avoid recursion in book and user

    def __repr__(self):
        return f'<Comment {self.id}, {self.content}, {self.book_id}, {self.user_id}>'


class UserList(db.Model, SerializerMixin):
    __tablename__ = 'userlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    books = db.relationship('Book', secondary=userlist_books, back_populates='userlists')

    # Relationship with User (the user that owns this list)
    user = db.relationship('User', back_populates='userlists')

    # Association proxy to access book titles through userlists
    book_titles = association_proxy('books', 'title')

    # Fields to serialize
    serialize_rules = ('-books.userLists', '-user.userlists')  # Avoid recursion

    @validates('rating')
    def validate_rating(self, key, value):
        if value < 1 or value > 5:
            raise ValueError('Rating must be between 1 and 5')
        return value

    def __repr__(self):
        return f'<UserList user_id={self.user_id}, rating={self.rating}>'




    