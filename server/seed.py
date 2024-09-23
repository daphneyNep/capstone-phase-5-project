from random import randint, choice as rc
from config import db
from app import app
from models import db, Book, Author, User, Comment, UserList





def create_artists():
    with app.app_context():
        author1 = Author(
             name= "Nalan Lingling",
             genre= "Romance",
             bio= "Nalan Lingling is a prominent web author known for her captivating romance novels.",
             image_url= "https://images.gr-assets.com/authors/1687554817p8/22274107.jpg"
        )
        author2 = Author(
             name= "Love at the Reunion",
             genre= "Drama, Romance",
             bio= "Love at the Reunion is a beloved web novelist whose works often revolve around the themes of love and reconciliation.",
             image_url= "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?cs=srgb&dl=book-education-knowledge-2099691.jpg&fm=jpg"
        )
        author3 = Author(
             name= "JQK",
             genre= "Fantasy, Adventure",
             bio= "JQK is known for writing thrilling adventure and fantasy novels that captivate readers with intricate world-building.",
             image_url= "https://th.bing.com/th/id/OIP.fo-2L-K5ogoIbz84PH3ksQHaJ4?rs=1&pid=ImgDetMain"
        )           
        author4 = Author(
             name= "Knocking Brush",
             genre= "Historical Romance",
             bio= "Knocking Brush specializes in historical romance, weaving tales of love and intrigue set in ancient times.",
             image_url= "https://th.bing.com/th/id/OIP.fOCI522pHfS78nCG4PBi3gHaJ4?rs=1&pid=ImgDetMain"
        )            
        author5 = Author(
             name= "Master An",
             genre= "Mystery, Thriller",
             bio= "Master An is a master of suspense, creating gripping thrillers and mysteries that keep readers on the edge of their seats.",
             image_url= "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?cs=srgb&dl=book-education-knowledge-2099691.jpg&fm=jpg"
        )            
        author6 = Author(
             name= "NovelCamon",
             genre= "Science Fiction",
             bio= "NovelCamon is known for writing innovative science fiction stories that explore futuristic worlds and technology.",
             image_url= "https://th.bing.com/th/id/OIP.HJG_pKn-59So6oTRZsJ5ngHaJ4?rs=1&pid=ImgDetMain"
        )           
        author7 = Author(
             name= "Purple Fantasy Enchantment",
             genre= "Fantasy, Romance",
             bio= "Purple Fantasy Enchantment writes beautifully crafted fantasy romance novels that transport readers to magical realms.",
             image_url= "https://i.pinimg.com/originals/96/0c/10/960c10e241b48ea0b317d264803a33ac.jpg"
        )            
        author8 = Author(
             name= "Little Lucky Fire",
             genre= "Young Adult, Fantasy",
             bio= "Little Lucky Fire is a popular young adult fantasy author, known for creating inspiring stories filled with adventure and self-discovery.",
             image_url= "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?cs=srgb&dl=book-education-knowledge-2099691.jpg&fm=jpg"
        )            
                
        db.session.bulk_save_objects([author1, author2, author3, author4, author5, author6, author7, author8])

                # Commit the authors to the database
        db.session.commit()

        author_ids = {author.name: author.id for author in Author.query.all()}
        
        return author_ids

def create_books():
    with app.app_context():
        authors = {
            "Nalan Lingling": Author.query.filter_by(name="Nalan Lingling").first(),
            "Love at the Reunion": Author.query.filter_by(name="Love at the Reunion").first(),
            "JQK": Author.query.filter_by(name="JQK").first(),
            "Knocking Brush": Author.query.filter_by(name="Knocking Brush").first(),
            "Master An": Author.query.filter_by(name="Master An").first(),
            "NovelCamon": Author.query.filter_by(name="NovelCamon").first(),
            "Purple Fantasy Enchantment": Author.query.filter_by(name="Purple Fantasy Enchantment").first(),
            "Little Lucky Fire": Author.query.filter_by(name="Little Lucky Fire").first(),
        }
        books = [
            Book(id=1, author=authors["Nalan Lingling"], title="A Prince's Endless Indulgence", summary="In her previous life, ...", image_url="https://th.bing.com/th/id/OIP.5QFMUWxvMdJFjr85wIw4egAAAA?rs=1&pid=ImgDetMain"),
            Book(id=2, author=authors["Love at the Reunion"], title="The Tycoon's Fierce Pampering of His Wife", summary="He is Huangfu Zheng...", image_url="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568095430l/53030953.jpg"),
            Book(id=3, author=authors["JQK"], title="Back to the Past: The Rise of the False Heiress...", summary="Guzi transmigrated into a novel...", image_url="https://th.bing.com/th/id/OIP.IhL3tZhzCwy7lpoiX6fTcAHaJ4?rs=1&pid=ImgDetMain"),
            Book(id=4, author=authors["Knocking Brush"], title="The Humble Family’s Daughter Has A Spatial Pocket!", summary="With a tiger-like energy...", image_url="https://oregairu.b-cdn.net/wp-content/uploads/2024/09/the-humble-familys-daughter-has-a-spatial-pocket-193x278.jpg"),
            Book(id=5, author=authors["Master An"], title="Pampered Poisonous Royal Wife", summary="She, breathtaking and indifferently gentle...", image_url="https://img.wtr-lab.com/cdn/series/LNlzcLIp_GSAFMbWzT_XTg.jpg"),
            Book(id=6, author=authors["NovelCamon"], title="She Became The Boss's Lady After Divorce", summary="Tessa ran away from home...", image_url="https://th.bing.com/th/id/OIP.PJ0PyRXOXD-2gqlfs4RG-wHaHa?rs=1&pid=ImgDetMain"),
            Book(id=7, author=authors["Purple Fantasy Enchantment"], title="Reborn in the Seventies: Pampered Wife...", summary="The new book is out!...", image_url="https://th.bing.com/th/id/OIP.GUXcERCo2_MQ_SnLrkvz7AAAAA?rs=1&pid=ImgDetMain"),
            Book(id=8, author=authors["Little Lucky Fire"], title="The wealthy stepmom became wildly popular...", summary="Li Xingwan had transmigrated into a book...", image_url="https://ik.imagekit.io/storybird/images/e2307839-0815-49f5-b883-10b480005981/0_985319130.png")
        ]
        db.session.bulk_save_objects(books)

        # Commit the books to the database
        db.session.commit()

        book_ids = {book.title: book.id for book in Book.query.all()}

        return book_ids

def create_users():
    with app.app_context():
        delete_users()  # Call the function to delete existing users

        users = [
            User(username="Nicole", password="password123"),
            User(username="James", password="password124"),
            User(username="Tammy", password="password125"),
            User(username="Nayla", password="password126"),
            User(username="Jones", password="password127"),
            User(username="Funnyface", password="password128"),
            User(username="Luvreading04", password="password129"),
            User(username="benji", password="password130"),
            User(username="Grace", password="password131"),
            User(username="Dora", password="password132")
        ]

        # Add the users to the session
        db.session.bulk_save_objects(users)

        # Commit the changes
        db.session.commit()

        user_ids = {user.username: user.id for user in User.query.all()}  # Fixing key retrieval
        return user_ids

def create_comments():
    with app.app_context():
        books = {
            "A Prince's Endless Indulgence": Book.query.filter_by(title="A Prince's Endless Indulgence").first(),
            "The Tycoon's Fierce Pampering of His Wife": Book.query.filter_by(title="The Tycoon's Fierce Pampering of His Wife").first(),
            "The Humble Family's Daughter Has A Spatial Pocket!": Book.query.filter_by(title="The Humble Family's Daughter Has A Spatial Pocket!").first(),
            "Pampered Poisonous Royal Wife": Book.query.filter_by(title="Pampered Poisonous Royal Wife").first(),
            "She Became The Boss's Lady After Divorce": Book.query.filter_by(title="She Became The Boss's Lady After Divorce").first(),
            "Reborn in the Seventies: Pampered Wife...": Book.query.filter_by(title="Reborn in the Seventies: Pampered Wife, Owning some Farmland").first(),
            "The wealthy stepmom became wildly popular...": Book.query.filter_by(title="The wealthy stepmom became wildly popular in the parenting show").first()
        }
        comments = []
        if books["A Prince's Endless Indulgence"]:
            comments.append(Comment(id=1, book_id=books["A Prince's Endless Indulgence"].id, content="This story line maybe typical but the romance is amazing, pure and funny."))
        
        if books["The Tycoon's Fierce Pampering of His Wife"]:
            comments.append(Comment(id=2, book_id=books["The Tycoon's Fierce Pampering of His Wife"].id, content="I love this novel."))
            comments.append(Comment(id=3, book_id=books["The Tycoon's Fierce Pampering of His Wife"].id, content="I am hooked on this storyline..."))
        
        if books["Pampered Poisonous Royal Wife"]:
            comments.append(Comment(id=5, book_id=books["Pampered Poisonous Royal Wife"].id, content="This story is too funny..."))
        
        if books["She Became The Boss's Lady After Divorce"]:
            comments.append(Comment(id=6, book_id=books["She Became The Boss's Lady After Divorce"].id, content="Strong FL. Strong ML. Keep it coming."))
        
        if books["Reborn in the Seventies: Pampered Wife..."]:
            comments.append(Comment(id=7, book_id=books["Reborn in the Seventies: Pampered Wife..."].id, content="I really like that the FL stayed the same..."))
        
        if books["The wealthy stepmom became wildly popular..."]:
            comments.append(Comment(id=8, book_id=books["The wealthy stepmom became wildly popular..."].id, content="I really love the Male lead..."))
        
        db.session.add_all(comments)
        db.session.commit()

        print(books)

def create_user_lists():
    with app.app_context():
        # Assuming you already have users and books created
        users = {
            "Nicole": User.query.filter_by(username="Nicole").first(),
            "James": User.query.filter_by(username="James").first(),
            "Tammy": User.query.filter_by(username="Tammy").first(),
            "Nayla": User.query.filter_by(username="Nayla").first(),
            "Jones": User.query.filter_by(username="Jones").first(),
            "Funnyface": User.query.filter_by(username="Funnyface").first(),
            "Luvreading04": User.query.filter_by(username="Luvreading04").first(),
            "benji": User.query.filter_by(username="benji").first(),
            "Grace": User.query.filter_by(username="Grace").first(),
            "Dora": User.query.filter_by(username="Dora").first()
        }
        
        books = {
            "A Prince's Endless Indulgence": Book.query.filter_by(title="A Prince's Endless Indulgence").first(),
            "The Tycoon's Fierce Pampering of His Wife": Book.query.filter_by(title="The Tycoon's Fierce Pampering of His Wife").first(),
            "The Humble Family's Daughter Has A Spatial Pocket!": Book.query.filter_by(title="The Humble Family's Daughter Has A Spatial Pocket!").first(),
            "Pampered Poisonous Royal Wife": Book.query.filter_by(title="Pampered Poisonous Royal Wife").first(),
            "She Became The Boss's Lady After Divorce": Book.query.filter_by(title="She Became The Boss's Lady After Divorce").first(),
            "Reborn in the Seventies: Pampered Wife...": Book.query.filter_by(title="Reborn in the Seventies: Pampered Wife...").first(),
            "The wealthy stepmom became wildly popular...": Book.query.filter_by(title="The wealthy stepmom became wildly popular...").first()
        }
        
        # Creating UserList entries
        user_lists = [
            UserList(user=users["Nicole"], book=books["A Prince's Endless Indulgence"], rating=5),
            UserList(user=users["James"], book=books["The Tycoon's Fierce Pampering of His Wife"], rating=4),
            UserList(user=users["Tammy"], book=books["Pampered Poisonous Royal Wife"], rating=5),
            UserList(user=users["Nayla"], book=books["She Became The Boss's Lady After Divorce"], rating=4),
            UserList(user=users["Jones"], book=books["Reborn in the Seventies: Pampered Wife..."], rating=3),
            UserList(user=users["Funnyface"], book=books["The wealthy stepmom became wildly popular..."], rating=4),
            UserList(user=users["Luvreading04"], book=books["A Prince's Endless Indulgence"], rating=5),
            UserList(user=users["benji"], book=books["The Humble Family's Daughter Has A Spatial Pocket!"], rating=4),
            UserList(user=users["Grace"], book=books["Pampered Poisonous Royal Wife"], rating=5),
            UserList(user=users["Dora"], book=books["She Became The Boss's Lady After Divorce"], rating=4)
        ]
        
        # Adding user lists to the session
        db.session.bulk_save_objects(user_lists)
        db.session.commit()

        print("User lists have been created.")

def read_books():
    with app.app_context():
        return Book.query.all()

def read_authors():
    with app.app_context():
        return Author.query.all()

def delete_users():
    with app.app_context():
        User.query.delete()
        db.session.commit()

def delete_books():
    with app.app_context():
        Book.query.delete()
        db.session.commit()

def delete_authors():
    with app.app_context():
        Author.query.delete()
        db.session.commit()

def delete_user_lists():
    with app.app_context():
        UserList.query.delete()
        db.session.commit()

if __name__ == '__main__':# Clear the books table
    create_users()
    create_books()
    create_comments()
    create_user_lists()