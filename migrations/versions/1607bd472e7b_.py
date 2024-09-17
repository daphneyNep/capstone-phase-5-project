"""empty message

Revision ID: 1607bd472e7b
Revises: 
Create Date: 2024-07-31 19:52:00.870027

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1607bd472e7b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('author', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('membername', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('member_books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('member_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_member_books_book_id_books')),
    sa.ForeignKeyConstraint(['member_id'], ['members.id'], name=op.f('fk_member_books_member_id_members')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('member_books')
    op.drop_table('members')
    op.drop_table('books')
    # ### end Alembic commands ###
