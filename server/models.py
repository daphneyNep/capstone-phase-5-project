from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin


from config import db



class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)

    # Relationship to BookMember
    book_members = relationship('BookMember', back_populates='book', cascade="all, delete-orphan")

    # Association proxy to easily access members through book_members
    members = association_proxy('book_members', 'member')

    def __repr__(self):
        return f'<Book {self.id}, {self.title}, {self.author}>'

class Member(db.Model, SerializerMixin):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    membername = db.Column(db.String, nullable=False)

    # Relationship to BookMember
    book_members = relationship('BookMember', back_populates='member')

    # Association proxy to easily access books through book_members
    books = association_proxy('book_members', 'book')

    def __repr__(self):
        return f'<Member {self.id}, {self.membername}>'

class BookMember(db.Model):
    __tablename__ = 'member_books'

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    review = db.Column(db.String)

    # Relationships to Book and Member
    member = relationship('Member', back_populates='book_members')
    book = relationship('Book', back_populates='book_members')

    # @validates('member_id', 'book_id')
    # def validate_ids(self, key, value):
    #     if value and not (1 <= len(value) <= 999):
    #         raise ValueError('Review must be between 1 and 30 characters')
    #     return value

    # @validates('review')
    # def validate_review(self, key, value):
    #     if value and not (1 <= len(value) <= 30):
    #         raise ValueError('Review must be between 1 and 30 characters')
    #     return value

    def __repr__(self):
        return f'<BookMember id={self.id}, member_id={self.member_id}, book_id={self.book_id}, review={self.review}>'




    